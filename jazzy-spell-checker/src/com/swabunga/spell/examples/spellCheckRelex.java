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
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
/** This class shows an example of how to use the spell checking capability.
 *
 * @author Jason Height (jheight@chariot.net.au)
 */
public class spellCheckRelex implements SpellCheckListener {

  private static String dictFile = "dict/en-words-linux.0";
  private static String phonetFile = "dict/phonet.en";
  private static String[] correctsent;
  private static int flag;

  private SpellChecker spellCheck = null;


  public void spellcorrect(String sent) {
    try {
      SpellDictionary dictionary = new SpellDictionaryHashMap(new File(dictFile), new File(phonetFile));

      spellCheck = new SpellChecker(dictionary);
      spellCheck.addSpellCheckListener(this);
      BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

      correctsent = sent.split(" ");
      flag = 0;

        for (int i=0; i < correctsent.length; i++)
          {
            spellCheck.checkSpelling(new StringWordTokenizer(correctsent[i]));
          }

        if (flag == 1)
            {
              System.out.println("Corrected as: " + (Arrays.toString(correctsent)));
            }
      
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  public void spellingError(SpellCheckEvent event) {
    List suggestions = event.getSuggestions();
   
    if (suggestions.size() > 0) {
      flag = 1;
      String misspell = event.getInvalidWord();
      replace(correctsent, misspell, (suggestions.get(0)).toString());

      System.out.println("MisSpelled Word: " + misspell);
      System.out.println("Suggestions: ");

      for (int i=0; i < suggestions.size(); i++)
      {
              System.out.println((suggestions.get(i)).toString());
              if(i == 5)
                break;
      }
      
    } 
    else {
      System.out.println("MISSPELT WORD: " + event.getInvalidWord());
      System.out.println("\tNo suggestions");
    } 
    }

    static void replace(String[] arr, String find, String replace) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == find) {
            arr[i] = replace;
            return;
        }
    }
  }

}
