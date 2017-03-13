/*
 * $Date: 2004/02/09 15:04:11 $
 * $Author: ant-roy $
 *
 * Copyright (C) 2002 Anthony Roy
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
 */
package com.swabunga.spell.jedit;

import org.gjt.sp.jedit.EditPlugin;
import org.gjt.sp.jedit.GUIUtilities;
import org.gjt.sp.jedit.View;
import org.gjt.sp.jedit.gui.OptionsDialog;
import org.gjt.sp.jedit.jEdit;
import org.gjt.sp.jedit.textarea.JEditTextArea;

import java.util.Vector;


public class JazzyPlugin extends EditPlugin {

  //~ Instance/static variables .............................................

  public static final String PLUGIN_NAME = "Jazzy";
  public static final String SPELL_CHECK_ACTIONS = "jazzy.menu";
  private static boolean LOAD_DICTIONARY;
  private static boolean RESET_SPELLCHECKER;
  private static JazzySpellCheck jazzyChecker;

  //~ Methods ...............................................................


  /**
   * Displays the spell checker dialog box.
   * This method is called by the spell-check action,
   * defined in actions.xml.
   *
   * @param view the current view.
   */
  public static void showJazzyDialog(View view) {
    JEditTextArea jta = view.getTextArea();

    if (jazzyChecker == null) {
      jazzyChecker = newSpellChecker();
    }

    if (!jazzyChecker.isLoaded()) {

      if (!jazzyChecker.loadDictionary()) {

        return;
      }
    }

    String text = jta.getSelectedText();
    int caretPosn = 0;
    int offset = 0;
//        boolean wholeDocument = false;

    if (text == null) {
//            wholeDocument = true;
      caretPosn = jta.getCaretPosition();
      text = jta.getText();
      jta.selectAll();
    } else {
      offset = jta.getSelection()[0].getStart();
      caretPosn = offset;
    }

    String mode = view.getBuffer().getMode().toString();
    jazzyChecker.checkText(text, mode, offset, caretPosn);
  }

  /**
   * Method called by jEdit to finalize the plugin.
   */
  public void stop() {
      unloadDictionary();
  }

  public static void unloadDictionary() {
    jazzyChecker.unloadDictionary();
  }

  public static void resetSpellChecker() {
    jazzyChecker.resetSpellChecker();
  }

  public static JazzySpellCheck newSpellChecker() {
    System.setProperty("jazzy.config", "com.swabunga.spell.engine.JeditConfiguration");

    RESET_SPELLCHECKER = jEdit.getBooleanProperty("options.jazzy.reset-spellchecker", false);
    int flags = 0;

//        if (LOAD_DICTIONARY) {
    flags += JazzySpellCheck.LOAD_DICTIONARY;
//        }

    if (RESET_SPELLCHECKER) {
      flags += JazzySpellCheck.RESET_SPELLCHECKER;
    }

    return new JazzySpellCheck(flags);

  }
}