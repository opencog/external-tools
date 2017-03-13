# Jazzy: Java Spell Checker

## What is it?

Jazzy is a 100% pure Java library implementing a spell checking algorithm
similar to aspell. It may be used to spell check a variety of sources.

## The Latest Version

The latest version is available from the Jazzy [project web site]
(http://sourceforge.net/projects/jazzy).

## Requirements

The following requirements exist for installing Jazzy:

 - Java Interpreter:
  *A fully compliant Java 1.1 Runtime environment is needed for the core engine of Jazzy 
to operate. (For example: for use in a servlet)

  *A fully compliant Java 1.3 Runtime environment is needed for the swing components of Jazzy to operate.

 - Java JFC (Swing components):

  *These GUI extentions are required for proper GUI functionality. 
   However, core spell check functionality can work without Swing Components. 


## Usage

Use `ant`, to build jazzy, the ant build specifications are in `build.xml`. 

- Open terminal 
- cd the jazzy-spell-checker directory and run
	- ant

- You should see BUILD SUCCESSFUL message. if so, do the following to run the test
	- java -cp bin/ spellcorect

- It accepts sentence and do a word level spell check.


## Installation Instructions and Documentation

There are two ways to install Jazzy. One from a pre packaged version and 
the other is to compile the sources from GitHub.

##Licensing and legal issues

Jazzy is licensed under the LGPL. See LICENSE.txt for license restrictions.
