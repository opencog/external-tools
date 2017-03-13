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

import com.swabunga.spell.engine.SpellDictionary;
import com.swabunga.spell.engine.SpellDictionaryHashMap;
import com.swabunga.spell.event.SpellCheckEvent;
import com.swabunga.spell.event.SpellCheckListener;
import com.swabunga.spell.event.SpellChecker;
import com.swabunga.spell.event.StringWordTokenizer;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.Iterator;
import java.util.List;

/** This class shows an example of how to use the spell checking capability.
 *
 * @author Jason Height (jheight@chariot.net.au)
 */
public class SpellCheckExample2 implements SpellCheckListener {

  private static String dictFile = "dict/english.0";
  private SpellChecker spellCheck = null;


  public SpellCheckExample2(String phoneticFileName) {
    try {

      BufferedReader in = new BufferedReader(new FileReader("example2.txt"));
      File phonetic = null;
      if (phoneticFileName != null)
        phonetic = new File(phoneticFileName);

      SpellDictionary dictionary = new SpellDictionaryHashMap(new File(dictFile), phonetic);
      spellCheck = new SpellChecker(dictionary);
      spellCheck.addSpellCheckListener(this);

      while (true) {
        String line = in.readLine();

        if (line == null || line.length() == -1)
          break;

        spellCheck.checkSpelling(new StringWordTokenizer(line));
      }

    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void spellingError(SpellCheckEvent event) {
    List suggestions = event.getSuggestions();
    if (suggestions.size() > 0) {
      System.out.println("MISSPELT WORD: " + event.getInvalidWord());
      for (Iterator suggestedWord = suggestions.iterator(); suggestedWord.hasNext();) {
        System.out.println("\tSuggested Word: " + suggestedWord.next());
      }
    } else {
      System.out.println("MISSPELT WORD: " + event.getInvalidWord());
      System.out.println("\tNo suggestions");
    }

  }

  public static void main(String[] args) {

    System.out.println("Running spell check against DoubleMeta");
    new SpellCheckExample2(null);

    System.out.println("\n\nRunning spell check against GenericTransformator");
    new SpellCheckExample2("dict/phonet.en");
  }
}
