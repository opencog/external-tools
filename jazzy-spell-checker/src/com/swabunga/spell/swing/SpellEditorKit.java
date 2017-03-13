/*
Jazzy - a Java library for Spell Checking
Copyright (C) 2001 Mindaugas Idzelis
Full text of license can be found in LICENSE.txt

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/
package com.swabunga.spell.swing;

import com.swabunga.spell.engine.SpellDictionary;
import com.swabunga.spell.engine.SpellDictionaryHashMap;
import com.swabunga.spell.engine.Word;

import javax.swing.*;
import javax.swing.plaf.TextUI;
import javax.swing.text.*;
import java.awt.*;
import java.awt.event.*;
import java.io.File;
import java.util.List;

/**
 *
 * use:
 * JTextPane pane = new JTextPane();
 * pane.setEditorKit(new SpellEditorKit());
 *
 *
 *
 *
 *
 * @author     Stig Tanggaard
 * April 14, 2002
 */
public class SpellEditorKit extends StyledEditorKit {

  // private static Color replyColor = null;
  // private static Cursor linkCursor;

  // private Cursor newCursor;
  protected static final Cursor linkCursor = Cursor.getPredefinedCursor(Cursor.HAND_CURSOR);
  protected Cursor defaultCursor = Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR);

  static SpellDictionary dictionary;

  public SpellEditorKit(File file) {
    super();
    Object o;
    try {
      o = new SpellDictionaryHashMap(file);
    } catch (Exception f) {
      o = null;
    }
    dictionary = (SpellDictionary) o;
  }

  public void install(JEditorPane c) {
    LinkController adapt = new LinkController();
    c.addMouseMotionListener(adapt);
    c.addMouseListener(adapt);
    super.install(c);
    //System.out.println("install stylededitorkit on editorpane");
    defaultCursor = c.getCursor();
  }

  public Document createDefaultDocument() {
    return new SpellCheckedDocument(dictionary);
  }

  public class LinkController extends MouseAdapter implements MouseMotionListener {
    private Element curElem = null;
    /**
     * If true, the current element (curElem) represents an image.
     */
    private boolean curElemImage = false;
    private String href = null;
    /** This is used by viewToModel to avoid allocing a new array each
     * time. */
    private Position.Bias[] bias = new Position.Bias[1];
    /**
     * Current offset.
     */
    private int curOffset;

    private int linkoffset = 0;

    /**
     * Called for a mouse click event.
     * If the component is read-only (ie a browser) then
     * the clicked event is used to drive an attempt to
     * follow the reference specified by a link.
     *
     * @param e the mouse event
     * @see MouseListener#mouseClicked
     */
    public void mouseClicked(MouseEvent e) {
      if (e.isPopupTrigger())
        return;

      JEditorPane editor = (JEditorPane) e.getSource();
      if (editor.isEditable()) {
        Point pt = new Point(e.getX(), e.getY());
        int pos = editor.viewToModel(pt);
        if (pos >= 0 && href != null) {
          //JPopupMenu menu = new JPopupMenu();
          SpellCheckedDocument hdoc = (SpellCheckedDocument) editor.getDocument();
          Element elem = hdoc.getCharacterElement(pos);
          try {
            final String word = hdoc.getText(elem.getStartOffset(), elem.getEndOffset() - elem.getStartOffset());

            List list = dictionary.getSuggestions(word, 5);
            JPopupMenu popup = new JPopupMenu();
            int index = 0;
            ReplaceListener listener = new ReplaceListener(elem.getStartOffset(), elem.getEndOffset() - elem.getStartOffset(), hdoc);
            while (index < list.size() && index < 5) {
              Word w = (Word) list.get(index);
              JMenuItem item = new JMenuItem(w.getWord());
              item.setActionCommand(w.getWord());
              item.addActionListener(listener);
              popup.add(item);
              index++;
            }
            JMenuItem item = new JMenuItem("Add word to wordlist");
            item.addActionListener(new ActionListener() {
              public void actionPerformed(ActionEvent e) {
                dictionary.addWord(word);
              }

            });
            popup.add(item);
            popup.show(editor, e.getX(), e.getY());

            //System.out.println("" + elem.getStartOffset() + " count " + elem.getEndOffset());
          } catch (BadLocationException f) {
            System.out.println("" + elem.getStartOffset() + " count " + elem.getElementCount());
          }
        }
      }
      href = null;
    }


    // ignore the drags
    public void mouseDragged(MouseEvent e) {
    }

    // track the moving of the mouse.
    public void mouseMoved(MouseEvent e) {
      int pos = -1;
//      int offset = 0;
      JEditorPane editor = (JEditorPane) e.getSource();
      //MailEditorKit kit = (MailEditorKit)editor.getEditorKit();
      boolean adjustCursor = true;
      Cursor newCursor = defaultCursor;
      if (editor.isEditable()) {
        Point pt = new Point(e.getX(), e.getY());
        pos = editor.getUI().viewToModel(editor, pt, bias);
        if (bias[0] == Position.Bias.Backward && pos > 0) {
          pos--;
        }
        if (pos >= 0 && (editor.getDocument() instanceof SpellCheckedDocument)) {
          SpellCheckedDocument hdoc = (SpellCheckedDocument) editor.getDocument();
          Element elem = hdoc.getCharacterElement(pos);
          if (!doesElementContainLocation(editor, elem, pos, e.getX(), e.getY())) {
            elem = null;
          }
          if (curElem != elem || curElemImage) {
//            Element lastElem = curElem;
            curElem = elem;
            //String href = null;
            curElemImage = false;
            if (elem != null) {
              AttributeSet a = elem.getAttributes();
              //System.out.println(
              //  a.getAttribute(StyleConstants.NameAttribute));

              if (a.getAttribute(StyleConstants.NameAttribute) == SpellCheckedDocument.ERROR_STYLE) {
                newCursor = linkCursor;
                linkoffset = elem.getStartOffset();
                //System.out.println("test + " + pos);
                try {
                  href = editor.getDocument().getText(elem.getStartOffset(), elem.getEndOffset() - elem.getStartOffset());
                } catch (BadLocationException f) {
                }
//                offset = elem.getStartOffset();

              } else {
                href = null;
              }
            }
          } else {
            adjustCursor = false;
          }
          curOffset = pos;
        }
      }
      //adjustCursor &&
      if (adjustCursor && editor.getCursor() != newCursor) {
        editor.setCursor(newCursor);
      }
    }

    /**
     * Returns true if the View representing <code>e</code> contains
     * the location <code>x</code>, <code>y</code>. <code>offset</code>
     * gives the offset into the Document to check for.
     */
    private boolean doesElementContainLocation(JEditorPane editor, Element e, int offset, int x, int y) {
      if (e != null && offset > 0 && e.getStartOffset() == offset) {
        try {
          TextUI ui = editor.getUI();
          Shape s1 = ui.modelToView(editor, offset, Position.Bias.Forward);
          Rectangle r1 = (s1 instanceof Rectangle) ? (Rectangle) s1 : s1.getBounds();
          Shape s2 = ui.modelToView(editor, e.getEndOffset(), Position.Bias.Backward);
          Rectangle r2 = (s2 instanceof Rectangle) ? (Rectangle) s2 : s2.getBounds();
          r1.add(r2);
          return r1.contains(x, y);
        } catch (BadLocationException ble) {
        }
      }
      return true;
    }

  }


  class ReplaceListener implements ActionListener {
    int offset;
    int length;
    Document doc;

    public ReplaceListener(int offset, int length, Document doc) {
      this.offset = offset;
      this.length = length;
      this.doc = doc;
    }

    public void actionPerformed(ActionEvent e) {
      try {
        doc.remove(offset, length);
        doc.insertString(offset, e.getActionCommand(), null);
      } catch (BadLocationException f) {
      }
    }
  }
}
