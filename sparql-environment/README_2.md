# SPARQL Environment

*A javascript based visual query environment developed to improve on the default SPARQL query box and make it easier to query a SPARQL database.*

## The Environment

*The window is divided into many panels to allow for a high level of modulation*

**Datasets** ~ This contains the list of known datasets imported through config files.

**Data Area In and Out** ~ The center panel is divided veriticaly into the input and output panels.

**Detail** ~ A side panel is available for additional information to be presented.

## SparqPlugs

### In

Plugin for taking user-input and generating a query string.

### Out

Plugin for displaying results from a query string.

## Config Files

Setup up files for datasets.

## SparqPlugs List

### Agnostic

**Text Query**

Default input plugin displays a default query string and assists in creating queries.

**JSON Viewer**

Displays the results in a collapsible JSON view using a jQuery plugin JSONView.

### CTS Specific

**CiteKit**

Resolves urns using the CTS CiteKit jQuery plugin.

**CTS Browser**

Browse collections and properties from a CTS dataset. Search the collections and properies using filters.

### Data Set Specific

**BotCar Taxonomy**

Browse the taxonomy tree in the botcar dataset.
 

