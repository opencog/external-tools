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
package com.swabunga.spell.examples;

import com.swabunga.spell.swing.JSpellApplet;

import javax.swing.*;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

/** This class shows an example of how to use the spell checking capability
 *  for a text area on a swing form.
 *
 * @author Jason Height (jheight@chariot.net.au)
 */
public class SwingFormExample extends JFrame {

  public SwingFormExample() {
    setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
    addWindowListener(new WindowAdapter() {
      public void windowClosed(WindowEvent e) {
        System.exit(0);
      }
    });

    JSpellApplet spellapplet = new JSpellApplet();
    spellapplet.init();
    getContentPane().add(spellapplet);

  }


  public static void main(String[] args) {
    SwingFormExample ex = new SwingFormExample();
    System.out.println("Showing form");
    ex.setSize(400, 200);
    ex.setVisible(true);
  }
}
