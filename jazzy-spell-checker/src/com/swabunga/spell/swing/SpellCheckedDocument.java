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

import javax.swing.text.*;
import java.awt.*;
import java.util.StringTokenizer;

/**
 * @author Stig Tanggaard
 *
 *
 */
public class SpellCheckedDocument extends DefaultStyledDocument {

  public static final String ERROR_STYLE = "errorstyle";
  Style errorstyle;
  Style normalstyle;
  static AttributeSet normal;
  int checkoffset, checkend;
  String checkingline;
  static SpellDictionary dictionary;

  boolean checkspelling = false;

  public SpellCheckedDocument(SpellDictionary dictionary) {
    super();
    SpellCheckedDocument.dictionary = dictionary;

//    StyleContext context = StyleContext.getDefaultStyleContext();
    Style def = StyleContext.getDefaultStyleContext().getStyle(StyleContext.DEFAULT_STYLE);
    normal = addStyle("normal", def);
    errorstyle = addStyle(ERROR_STYLE, def);
    StyleConstants.setForeground(errorstyle, Color.red);
    StyleConstants.setUnderline(errorstyle, true);
  }

  public void checkSpelling() {
    if (dictionary != null) {
      int start = 0;
      int end = getLength();
      try {
        String text = getText(start, end - start);
        //System.out.println(text);
        checkoffset = text.indexOf(" ");
        if (checkoffset == -1) return;
        checkend = text.lastIndexOf(" ");
        if (checkend == -1) return;
        if (checkoffset == checkend) return;
        checkoffset += 1;
        checkingline = text.substring(checkoffset, checkend);
        if (checkingline == null) return;
        //System.out.println(":" + checkingline + ":");
        checkoffset += start;
        checkend += start;
        setCharacterAttributes(checkoffset, checkend - checkoffset, normal, true);
        //System.out.println("" + checkoffset + ":" + (checkend - checkoffset));
        StringTokenizer token = new StringTokenizer(checkingline, " ");
        //errors = new Vector();
        while (token.hasMoreTokens()) {
          String tok = token.nextToken();
          tok = clean(tok);
          if (tok.indexOf("\n") != -1) {
            String t1 = tok.substring(0, tok.indexOf("\n"));
            String t2 = tok.substring(tok.indexOf("\n") + 1);
            if (!dictionary.isCorrect(t1)) {
              setCharacterAttributes(checkingline.indexOf(t1) + checkoffset, t1.length(), errorstyle, false);
            }
            if (!dictionary.isCorrect(t2)) {
              setCharacterAttributes(checkingline.indexOf(t2) + checkoffset, t2.length(), errorstyle, false);
            }
          } else if (tok.indexOf("/") != -1) {
            String t1 = tok.substring(0, tok.indexOf("/"));
            String t2 = tok.substring(tok.indexOf("/") + 1);
            if (!dictionary.isCorrect(t1)) {
              setCharacterAttributes(checkingline.indexOf(t1) + checkoffset, t1.length(), errorstyle, false);
            }
            if (!dictionary.isCorrect(t2)) {
              setCharacterAttributes(checkingline.indexOf(t2) + checkoffset, t2.length(), errorstyle, false);
            }
          } else if (!dictionary.isCorrect(tok)) {
            //System.out.println(tok + tok.length());
            setCharacterAttributes(checkingline.indexOf(tok) + checkoffset, tok.length(), errorstyle, false);
          }
        }
        //setAttributes(a, errorstyle);
      } catch (BadLocationException f) {
      }
    }
  }

  public void setCheckSpelling(boolean check) {
    if (!checkspelling) {
      checkSpelling();
    }
    checkspelling = check;
  }

  public void insertString(int offset, String string, AttributeSet a) throws BadLocationException {
    //if(normal == null) normal = a;
    super.insertString(offset, string, normal);
    if (!checkspelling) return;
    if (dictionary != null) {
      int start = offset - 30;
      int end = offset + 30;
      if (start < 0) start = 0;
      if (end > getLength()) end = getLength();
      try {
        String text = getText(start, end - start);
        //System.out.println(text);
        checkoffset = text.indexOf(" ");
        if (checkoffset == -1) return;
        checkend = text.lastIndexOf(" ");
        if (checkend == -1) return;
        if (checkoffset == checkend) return;
        checkoffset += 1;
        checkingline = text.substring(checkoffset, checkend);
        if (checkingline == null) return;
        //System.out.println(":" + checkingline + ":");
        checkoffset += start;
        checkend += start;
        setCharacterAttributes(checkoffset, checkend - checkoffset, normal, true);
        //System.out.println("" + checkoffset + ":" + (checkend - checkoffset));
        StringTokenizer token = new StringTokenizer(checkingline, " ");
        //errors = new Vector();
        while (token.hasMoreTokens()) {
          String tok = token.nextToken();
          tok = clean(tok);
          if (tok.indexOf("\n") != -1) {
            String t1 = tok.substring(0, tok.indexOf("\n"));
            String t2 = tok.substring(tok.indexOf("\n") + 1);
            if (!dictionary.isCorrect(t1)) {
              setCharacterAttributes(checkingline.indexOf(t1) + checkoffset, t1.length(), errorstyle, false);
            }
            if (!dictionary.isCorrect(t2)) {
              setCharacterAttributes(checkingline.indexOf(t2) + checkoffset, t2.length(), errorstyle, false);
            }

          } else if (tok.indexOf("/") != -1) {
            String t1 = tok.substring(0, tok.indexOf("/"));
            String t2 = tok.substring(tok.indexOf("/") + 1);
            if (!dictionary.isCorrect(t1)) {
              setCharacterAttributes(checkingline.indexOf(t1) + checkoffset, t1.length(), errorstyle, false);
            }
            if (!dictionary.isCorrect(t2)) {
              setCharacterAttributes(checkingline.indexOf(t2) + checkoffset, t2.length(), errorstyle, false);
            }

          } else if (!dictionary.isCorrect(tok)) {
            System.out.println(tok + tok.length());
            setCharacterAttributes(checkingline.indexOf(tok) + checkoffset, tok.length(), errorstyle, false);
          }

        }

        //setAttributes(a, errorstyle);
      } catch (BadLocationException f) {
      }
    }
  }


  public void remove(int offset, int len) throws BadLocationException {
    super.remove(offset, len);
    if (!checkspelling) return;
    if (dictionary != null) {
      int start = offset - 30;
      int end = offset + 30;
      if (start < 0) start = 0;
      if (end > getLength()) end = getLength();
      try {
        String text = getText(start, end - start);
        //System.out.println(text);
        checkoffset = text.indexOf(" ");
        if (checkoffset == -1) return;
        checkend = text.lastIndexOf(" ");
        if (checkend == -1) return;
        if (checkoffset == checkend) return;
        checkoffset += 1;
        checkingline = text.substring(checkoffset, checkend);
        if (checkingline == null) return;
        //System.out.println(":" + checkingline + ":");
        checkoffset += start;
        checkend += start;
        setCharacterAttributes(checkoffset, checkend - checkoffset, normal, true);
        //System.out.println("" + checkoffset + ":" + (checkend - checkoffset));
        StringTokenizer token = new StringTokenizer(checkingline, " ");
        //errors = new Vector();

        while (token.hasMoreTokens()) {
          String tok = token.nextToken();
          tok = clean(tok);
          if (tok.indexOf("\n") != -1) {
            String t1 = tok.substring(0, tok.indexOf("\n"));
            String t2 = tok.substring(tok.indexOf("\n") + 1);
            if (!dictionary.isCorrect(t1)) {
              setCharacterAttributes(checkingline.indexOf(t1) + checkoffset, t1.length(), errorstyle, false);
            }
            if (!dictionary.isCorrect(t2)) {
              setCharacterAttributes(checkingline.indexOf(t2) + checkoffset, t2.length(), errorstyle, false);
            }
          } else if (!dictionary.isCorrect(tok)) {
            //System.out.println(tok + tok.length());
            setCharacterAttributes(checkingline.indexOf(tok) + checkoffset, tok.length(), errorstyle, false);
          }
        }
        //setAttributes(a, errorstyle);
      } catch (BadLocationException f) {
      }
    }
  }


  public String clean(String word) {

    char[] chars = word.toCharArray();
    //String wordd = "";

    //if(chars.length > 0)
    int index = chars.length - 1;
    while (!Character.isLetterOrDigit(chars[index]) && index > 0) {
      //System.out.println("isocontrol " + word);
      index--;
    }
    word = word.substring(0, index + 1);
    if (word.endsWith(",") || word.endsWith(";") || word.endsWith(".") || word.endsWith("\n") || word.endsWith("?") || word.endsWith("!")) {
      return word.substring(0, word.length() - 1);
    }
    index = 0;
    chars = word.toCharArray();
    while (!Character.isLetterOrDigit(chars[index]) && index < chars.length - 1) {
      //System.out.println("isocontrol " + word);
      index++;
    }
    word = word.substring(index);

    return word;
  }


  public void checkSplittedWords(String divider, String line) {
  }

}
