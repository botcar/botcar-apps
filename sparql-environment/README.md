# SPARQL Environment

*A javascript based visual query environment developed to improve on the default SPARQL query box and make it easier to query a SPARQL database.*

## Features

**Autocompletion**

After typing a subject in a *Where* query the environment looks up all the distinct verbs that can be acted on that object and displays them for you.

**History**

The history tab keeps the results of all your past queries.

**Persistant Query Box**

While crafting a complex SPARQL query don't worry about losing parts of your query when you click the back button. In the SPARQL Environment the query box stays and uses ajax to fetch your results.

## Desired Features

**Advanced Autocompletion**

- Autocomplete prefixes.
- Define objects and quicly search for an object from a collection of objects.
Example: In Botony one can define "species" as "urn:cite:botcar:species cite:possesses ?specie" and you could search those objects for a quick lookup.

**Preset Queries**

Define preset query strings for frequent queries. 

**Object/Verb Drag and Drop**

Drag and drop objects from the results panel to query box.

**Grammer Checker**

Determine syntax errors before the query is sent.

**Other**

Save History, Color-coding Syntax
