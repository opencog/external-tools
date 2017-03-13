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
/*
 * put your module comment here
 * formatted with JxBeauty (c) johann.langhofer@nextra.at
 */

/*
 * Changes 11 Jan 2003 Anthony Roy:
 *
 * 1) Changed checkText from a JTextArea to a JTextField (lines 51 and 115)
 * 2) Altered the ADD_CMD action (Line 196). Now adds the misspelled word to the dictionary unless
 *    a new word is typed which does not match the current suggestion. A confirm dialog is shown.
 */
package com.swabunga.spell.swing;

import com.swabunga.spell.engine.Word;
import com.swabunga.spell.event.SpellCheckEvent;

import javax.swing.*;
import javax.swing.event.EventListenerList;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Locale;
import java.util.ResourceBundle;


/** Implementation of a spell check form.
 *  <p>This needs to layed out correctly but for the most part it works.</p>
 *
 * @author Jason Height (jheight@chariot.net.au)
 */
public class JSpellForm extends JPanel implements ActionListener, ListSelectionListener {
  /** The Ignore button click action command*/
  public static final String IGNORE_CMD = "IGNORE";
  /** The Ignore All button click action command*/
  public static final String IGNOREALL_CMD = "IGNOREALL";
  /** The Add button click action command*/
  public static final String ADD_CMD = "ADD";
  /** The Replace button click action command*/
  public static final String REPLACE_CMD = "REPLACE";
  /** The Replace All button click action command*/
  public static final String REPLACEALL_CMD = "REPLACEALL";
  /** The Cancel button click action command*/
  public static final String CANCEL_CMD = "CANCEL";
  /** The resource for the Suggestions label*/
  private static final String SUGGESTIONS_RES = "SUGGESTIONS";
  private static final String INVALIDWORD_RES = "INVALIDWORD";
  /** Add word confirm*/
  public static final String ADDWORD_1 = "ADDWORD_1";
  public static final String ADDWORD_2 = "ADDWORD_2";
  public static final String ADDWORD_3 = "ADDWORD_3";
  
  private JLabel wrongWordLabel;

  /* Accessible GUI Components */
  protected JList suggestList;
  protected JTextField checkText;
  /* The current spell check event */
  protected SpellCheckEvent spellEvent;
  /** The listener list (holds actionlisteners) */
  protected EventListenerList listenerList = new EventListenerList();
  protected ResourceBundle messages;

  /** Panel constructor */
  public JSpellForm() {
    messages = ResourceBundle.getBundle("com.swabunga.spell.swing.messages", Locale.getDefault());
    initialiseGUI();
  }

  /** Helper method to create a JButton with a command, a text label and a listener*/
  private static final JButton createButton(String command, String text, ActionListener listener) {
    JButton btn = new JButton(text);
    btn.setActionCommand(command);
    btn.addActionListener(listener);
    return btn;
  }

  /** Creates the buttons on the left hand side of the panel*/
  protected JPanel makeEastPanel() {
    JPanel jPanel1 = new JPanel();
    BoxLayout layout = new BoxLayout(jPanel1, BoxLayout.Y_AXIS);
    jPanel1.setLayout(layout);

    JButton ignoreBtn = createButton(IGNORE_CMD, messages.getString(IGNORE_CMD), this);
    ignoreBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(ignoreBtn);

    JButton ignoreAllBtn = createButton(IGNOREALL_CMD, messages.getString(IGNOREALL_CMD), this);
    ignoreAllBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(ignoreAllBtn);

    JButton addBtn = createButton(ADD_CMD, messages.getString(ADD_CMD), this);
    addBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(addBtn);

    JButton changeBtn = createButton(REPLACE_CMD, messages.getString(REPLACE_CMD), this);
    changeBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(changeBtn);

    JButton changeAllBtn = createButton(REPLACEALL_CMD, messages.getString(REPLACEALL_CMD), this);
    changeAllBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(changeAllBtn);

    JButton cancelBtn = createButton(CANCEL_CMD, messages.getString(CANCEL_CMD), this);
    cancelBtn.setMaximumSize(new Dimension(Short.MAX_VALUE, Short.MAX_VALUE));
    jPanel1.add(cancelBtn);

    return jPanel1;
  }

  protected JPanel makeCentrePanel() {
    JPanel jPanel2 = new JPanel();
    jPanel2.setLayout(new BoxLayout(jPanel2, BoxLayout.Y_AXIS));
    JPanel jPanel3 = new JPanel();
    JLabel lbl1 = new JLabel(messages.getString(INVALIDWORD_RES));
    wrongWordLabel = new JLabel("");
    wrongWordLabel.setForeground(Color.red); //Changed Color.RED to Color.red for 1.3 compatibility.
    jPanel3.add(lbl1);
    jPanel3.add(wrongWordLabel);
    jPanel2.add(jPanel3);
    checkText = new JTextField();
    jPanel2.add(checkText);
    JLabel lbl2 = new JLabel(messages.getString(SUGGESTIONS_RES));
    jPanel2.add(lbl2);
    suggestList = new JList();
    suggestList.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);
    jPanel2.add(new JScrollPane(suggestList));
    suggestList.addListSelectionListener(this);
    return jPanel2;
  }

  /** Called by the constructor to initialise the GUI*/
  protected void initialiseGUI() {
    setLayout(new BorderLayout());
    this.add(makeEastPanel(), BorderLayout.EAST);
    this.add(makeCentrePanel(), BorderLayout.CENTER);
  }

  /** Register an action listener */
  public void addActionListener(ActionListener l) {
    listenerList.add(ActionListener.class, l);
  }

  /** Deregister an action listener*/
  public void removeActionListener(ActionListener l) {
    listenerList.remove(ActionListener.class, l);
  }

  protected void fireActionEvent(ActionEvent e) {
    // Guaranteed to return a non-null array
    Object[] listeners = listenerList.getListenerList();
    // Process the listeners last to first, notifying
    // those that are interested in this event
    for (int i = listeners.length - 2; i >= 0; i -= 2) {
      if (listeners[i] == ActionListener.class) {
        ((ActionListener) listeners[i + 1]).actionPerformed(e);
      }
    }
  }

  /** Sets the current spell check event that is being shown to the user*/
  public void setSpellEvent(SpellCheckEvent event) {
    spellEvent = event;
    DefaultListModel m = new DefaultListModel();
    java.util.List suggestions = event.getSuggestions();
    for (int i = 0; i < suggestions.size(); i++) {
      m.addElement(suggestions.get(i));
    }
    suggestList.setModel(m);
    wrongWordLabel.setText(event.getInvalidWord());
    if (m.size() > 0) {
      suggestList.setSelectedIndex(0);
      checkText.setText(((Word) m.get(0)).getWord());
    } else {
      checkText.setText(event.getInvalidWord());
    }
  }

  /** Fired when a value in the list is selected*/
  public void valueChanged(ListSelectionEvent e) {
    if (!e.getValueIsAdjusting()) {
      Object selectedValue = suggestList.getSelectedValue();
      if (selectedValue != null)
        checkText.setText(selectedValue.toString());
    }
  }

  /** Fired when a button is selected */
  public void actionPerformed(ActionEvent e) {
    if (IGNORE_CMD.equals(e.getActionCommand())) {
      spellEvent.ignoreWord(false);
    } else if (IGNOREALL_CMD.equals(e.getActionCommand())) {
      spellEvent.ignoreWord(true);
    } else if (REPLACE_CMD.equals(e.getActionCommand())) {
      spellEvent.replaceWord(checkText.getText(), false);
    } else if (REPLACEALL_CMD.equals(e.getActionCommand())) {
      spellEvent.replaceWord(checkText.getText(), true);
    } else if (ADD_CMD.equals(e.getActionCommand())) {
      String inField = checkText.getText();
      Object selObj = suggestList.getSelectedValue();
      String selected = (selObj == null ? "" : selObj.toString());
      String addString = (inField.equals(selected) ? spellEvent.getInvalidWord() : inField);

      int n = JOptionPane.showConfirmDialog(this, messages.getString(ADDWORD_1) + " '" + addString + "' " +
	  	messages.getString(ADDWORD_2), messages.getString(ADDWORD_3), JOptionPane.YES_NO_OPTION);

      if (n == JOptionPane.YES_OPTION) {
        spellEvent.addToDictionary(addString);
      } else {
        return;
      }
    } else if (CANCEL_CMD.equals(e.getActionCommand())) {
      spellEvent.cancel();
    }
    fireActionEvent(e);
  }

  public static void main(String[] args) {
    try {
      JSpellForm pane = new JSpellForm();
      JFrame frm = new JFrame("Spelling");
      frm.getContentPane().add(pane);
      frm.setSize(300, 300);
      frm.setVisible(true);
      frm.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    } catch (Exception ex) {
      ex.printStackTrace();
    }
  }
}



