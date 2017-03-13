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

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.zip.ZipInputStream;

/**
 * @author aim4min
 *
 * To change this generated comment edit the template variable "typecomment":
 * Window>Preferences>Java>Templates.
 * To enable and disable the creation of type comments go to
 * Window>Preferences>Java>Code Generation.
 */
public class JSpellApplet extends JApplet {

  private static final String dictionaryFile = "dict/english.0.zip";
  private SpellDictionary dictionary;
  JTextArea text = null;
  JButton spell = null;

  /**
   * @see java.awt.Component#paint(Graphics)
   */
  public void paint(Graphics arg0) {
    super.paint(arg0);

  }

  /**
   * @see java.applet.Applet#init()
   */
  public void init() {
    super.init();

    try {
      URL resource = null;
      ZipInputStream zip = null;
      try {
        resource = new URL(getCodeBase().toExternalForm() + dictionaryFile);
        zip = new ZipInputStream(resource.openStream());
        /* getCodeBase() throws a NullPointerException when run
         * outside the context of a browser
         */
      } catch (NullPointerException e) {
        FileInputStream fin = new FileInputStream(dictionaryFile);
        zip = new ZipInputStream(fin);
      }
      zip.getNextEntry();
      dictionary = new SpellDictionaryHashMap(new BufferedReader(new InputStreamReader(zip)));

      initGUI();
    } catch (MalformedURLException e) {
      e.printStackTrace();
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    }

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
    text = new JTextArea("The quck brwn dog jmped over the fnce.");
    text.setLineWrap(true);
    text.setWrapStyleWord(true);
    addToFrame(frame, text, gridbag, c, 0, 0, 1, 1);

    GridBagConstraints spellcon = new GridBagConstraints();
    spellcon.anchor = GridBagConstraints.NORTH;
    spellcon.insets = new Insets(5, 5, 5, 5);

    spell = new JButton("spell check");
    final JTextComponentSpellChecker sc = new JTextComponentSpellChecker(dictionary);
    spell.addActionListener(new ActionListener() {
      public void actionPerformed(ActionEvent arg0) {
        Thread t = new Thread() {
          public void run() {
            try {
              sc.spellCheck(text);
            } catch (Exception ex) {
              ex.printStackTrace();

            }
          }
        };
        t.start();
      }
    });
    addToFrame(frame, spell, gridbag, spellcon, 1, 0, 1, 1);
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
}
