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


package com.swabunga.spell.examples;

import com.swabunga.spell.engine.*;
import com.swabunga.spell.swing.JTextComponentSpellChecker;

import javax.swing.*;
import javax.swing.text.JTextComponent;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.io.File;


/** This class shows an example of how to use the spell checking capability
 *  on a JTextComponent.
 *
 * @author Robert Gustavsson (robert@lindesign.se)
 */
public class JTextComponentSpellCheckExample extends JFrame {
  private static final String englishDictionary = "dict/english.0";
  private static final String englishPhonetic = "dict/phonet.en";
  protected SpellDictionary dictionary;
  JTextComponent text = null;
  JButton spell = null;

  public JTextComponentSpellCheckExample(String dictPath, String phonetPath) {
    File dictFile=null,
         phonetFile=null;  

    // INIT DICTIONARY
    if(dictPath==null)
        dictFile=new File(englishDictionary);
    else
        dictFile=new File(dictPath);
    if(phonetPath!=null)
        phonetFile=new File(phonetPath);    
    try {
      dictionary = new SpellDictionaryHashMap(dictFile, phonetFile);
      //dictionary = new SpellDictionaryDisk(dictFile, phonetFile, true);
      //dictionary = new GenericSpellDictionary(dictFile, phonetFile);
    } catch (Exception ex) {
      ex.printStackTrace();
    }

    // INIT GUI
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    addWindowListener(new WindowAdapter() {

      public void windowClosed(WindowEvent e) {
        System.exit(0);
      }
    });
    initGUI();
    pack();
  }

  private void initGUI() {
    Container frame = getContentPane();
    GridBagLayout gridbag = new GridBagLayout();
    GridBagConstraints c = new GridBagConstraints();
    frame.setLayout(gridbag);
    c.anchor = GridBagConstraints.CENTER;
    c.fill = GridBagConstraints.BOTH;
    c.insets = new Insets(5, 5, 5, 5);
    c.weightx = 1.0;
    c.weighty = 1.0;
    text = new JTextArea(10, 40);
    addToFrame(frame, text, gridbag, c, 0, 0, 1, 1);
    spell = new JButton("spell");
    spell.addActionListener(new ButtonListener());
    addToFrame(frame, spell, gridbag, c, 0, 1, 1, 1);
  }

  // Helps build gridbaglayout.
  private void addToFrame(Container f, Component c, GridBagLayout gbl, GridBagConstraints gbc, int x, int y, int w, int h) {
    gbc.gridx = x;
    gbc.gridy = y;
    gbc.gridwidth = w;
    gbc.gridheight = h;
    gbl.setConstraints(c, gbc);
    f.add(c);
  }

  public static void main(String[] args) {
    String  dictPath=null,
            phonetPath=null;
    if(args.length>0)
        dictPath=args[0];
    if(args.length>1)
        phonetPath=args[1];
    JTextComponentSpellCheckExample d = new JTextComponentSpellCheckExample(dictPath,phonetPath);
    d.show();
  }

  // INNER CLASSES
  private class ButtonListener implements ActionListener {

    public void actionPerformed(ActionEvent e) {
      Thread t = new SpellThread();
      t.start();
    }
  }

  private class SpellThread extends Thread {

    public void run() {
      try {
        JTextComponentSpellChecker sc = new JTextComponentSpellChecker(dictionary);
        sc.spellCheck(text);
      } catch (Exception ex) {
        ex.printStackTrace();
      }
    }
  }
}



