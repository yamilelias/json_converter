# Node JSON Converter

This script converts a JSON translation file to a JSON Hierarchical translation file.

## How it works?
It takes a base JSON file and iterates all the strings inside. It will compare it with the other language provided and seek a match. If it finds one, it will assign that language to the same key as the original language. This way, you can transform a translation file into a hierarchical JSON without losing (or redoing) your translations.

## How to run?
Download the project and run the following for an example:
```
yarn start:example
```

TODO: It will accept two parameters, so you can define the input and the output directories. These are going to be the places where the new files will be taken from.

```
yarn start --input-dir=input --output-dir=output
```