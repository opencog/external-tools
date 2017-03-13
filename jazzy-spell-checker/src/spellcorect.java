import com.swabunga.spell.examples.spellCheckRelex;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.Iterator;
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

public class spellcorect {

  public spellcorect() {
    try {

    BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

      while (true) {
        System.out.print("Enter sentence to spell correction: ");
        String line = in.readLine();
        spellCheckRelex s= new spellCheckRelex();
        s.spellcorrect(line);
        
        if (line.length() <= 0)
          break;
       }
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

 public static void main(String[] args) {
    new spellcorect();
  }
}
