/*
 * $Date: 2003/09/05 15:02:48 $
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

import com.swabunga.spell.engine.Configuration;
import com.swabunga.spell.engine.SpellDictionary;
import com.swabunga.spell.engine.SpellDictionaryDisk;
import com.swabunga.spell.engine.SpellDictionaryHashMap;
import com.swabunga.spell.event.*;
import com.swabunga.spell.swing.JSpellDialog;
import org.gjt.sp.jedit.Macros;
import org.gjt.sp.jedit.View;
import org.gjt.sp.jedit.jEdit;
import org.gjt.sp.jedit.textarea.JEditTextArea;
import org.gjt.sp.jedit.textarea.Selection;
import org.gjt.sp.util.Log;

import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;


public class JazzySpellCheck implements SpellCheckListener {

  //~ Instance/static variables .............................................

  public static final int LOAD_DICTIONARY = 1;
  public static final int RESET_SPELLCHECKER = 2;
  private boolean LOADED = false;
  private JEditTextArea area;
  private int caretPosn;
  private SpellDictionary dictionary;
  private JSpellDialog dlg;
  private int flags;
  private boolean noerrors = true;
  private int offset;
  private SpellChecker spellChecker;
  private Configuration config = Configuration.getConfiguration();

  //~ Constructors ..........................................................

  /**
   * Creates a new JazzySpellCheck object.
   *
   * @param flags
   */
  public JazzySpellCheck(int flags) {
    this.flags = flags;

    boolean loadNow = ((flags & LOAD_DICTIONARY) == LOAD_DICTIONARY);

    if (loadNow) {

      Thread t = new Thread() {
        public void run() {
          loadDictionary();
        }
      };
      t.start();
    }


    config.setBoolean(Configuration.SPELL_IGNOREDIGITWORDS, jEdit.getBooleanProperty("options.jazzy.SPELL_IGNOREDIGITWORDS", false));

    Log.log(Log.MESSAGE, this, "Ignore Digits? " + config.getBoolean(Configuration.SPELL_IGNOREDIGITWORDS));

    setupDialog();
  }

  //~ Methods ...............................................................

  /**
   *
   *
   * @return
   */
  public boolean isLoaded() {

    return LOADED;
  }

  /**
   *
   *
   * @param input
   * @param mode
   * @param offset
   * @param caret
   * @return
   */
  public String checkText(String input, String mode, int offset, int caret) {

    if (!LOADED) {

      return null;
    }

    this.offset = offset;
    this.caretPosn = caret;
    WordFinder wf;
    View view = jEdit.getActiveView();
    area = view.getTextArea();
    boolean defaultChecker = jEdit.getBooleanProperty("options.jazzy.default-checker", false);

    if (!defaultChecker) {

      if (mode.equals("java")) {
        wf = new JavaWordFinder(input);
      } else if (mode.equals("tex")) {
        wf = new TeXWordFinder(input);
      } else if ((mode.equals("html")) || (mode.equals("xml"))) {
        wf = new XMLWordFinder(input);
      } else {
        wf = new DefaultWordFinder(input);
      }
    } else {
      wf = new DefaultWordFinder(input);
    }

    Log.log(Log.MESSAGE, this, "WordFinder Type: " + wf.getClass().toString());
    
    StringWordTokenizer toks = new StringWordTokenizer(wf);
    spellChecker.checkSpelling(toks);

    if (noerrors) {
      Macros.message(view, "No Spelling Errors Found");
    } else {
      noerrors = true;
    }

    area.setCaretPosition(caretPosn);
    String output = toks.getContext();

    if ((flags & RESET_SPELLCHECKER) == RESET_SPELLCHECKER) {
      resetSpellChecker();
    }

    return output;
  }

  /**
   *
   *
   * @return
   */
  public synchronized boolean loadDictionary() {

    if (LOADED) return true;

    File dictionaryFile = new File(jEdit.getProperty("options.jazzy.dictionary", ""));

    if (dictionaryFile.exists()) {

      try {

        if (jEdit.getBooleanProperty("options.jazzy.disk-based", false)) {
          dictionary = new SpellDictionaryDisk(dictionaryFile.getParentFile(), null, true);
          Log.log(Log.MESSAGE, this, "Disk-based SpellChecker Loaded.");
        } else {
          dictionary = new SpellDictionaryHashMap(dictionaryFile);
          Log.log(Log.MESSAGE, this, "Memory-based SpellChecker Loaded with custom dictionary.");
        }
        LOADED = true;
      } catch (Exception e) {
        Log.log(Log.MESSAGE, this, "TextSpellCheck: error loading dictionary: " + e);
        LOADED = false;
      }

    } else {

      try {
        InputStream in = this.getClass().getResourceAsStream("/english.0");
        InputStreamReader reader = new InputStreamReader(in);
        dictionary = new SpellDictionaryHashMap(reader);
        Log.log(Log.MESSAGE, this, "Memory-based SpellChecker Loaded with default dictionary.");
        LOADED = true;
      } catch (Exception e) {
        Log.log(Log.MESSAGE, this, "TextSpellCheck: error loading default dictionary: " + e);
        LOADED = false;
      }
    }

    if (LOADED) {
      spellChecker = new SpellChecker(dictionary);
      spellChecker.addSpellCheckListener(this);
    }


    return LOADED;
  }

  /**
   * Resets list of ignored words.
   */
  public void resetSpellChecker() {
    spellChecker.reset();
  }

  /**
   * 
   *
   * @param event
   */
  public void spellingError(SpellCheckEvent event) {
    noerrors = false;
    String oldWord = event.getInvalidWord();
    int oldLength = oldWord.length();
    int start = event.getWordContextPosition() + offset;
    int end = start + oldLength;
    Selection s = new Selection.Range(start, end);
    area.setCaretPosition(start);
    area.scrollToCaret(true);
    area.setSelection(s);
    dlg.show(event);
    String replace = event.getReplaceWord();

    if (replace != null && !replace.equals(oldWord)) {
      area.setSelectedText(replace);

      if (caretPosn > start) {
        int diff = replace.length() - oldLength;
        caretPosn += diff;
      }
    }
  }

  /**
   * 
   */
  public void unloadDictionary() {

    if (LOADED) {
      spellChecker.removeSpellCheckListener(this);
      spellChecker = null;
      dictionary = null;
      LOADED = false;
      System.gc();
    }
  }

  private void setupDialog() {
    dlg = new JSpellDialog(jEdit.getActiveView(), "Spell", true);
  }
}
