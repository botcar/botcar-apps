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

Setup up files for datasets includes source url which is the SPARQL end node for the dataset. 

## SparqPlugs List

### Agnostic

**Text Query** *(in.text)*

Default input plugin displays a default query string and assists in creating queries.

**JSON Viewer** *(out.json)*

Displays the results in a collapsible JSON view using a jQuery plugin JSONView.

### CTS Specific

**CiteKit** *(out.citekit)*

Resolves urns using the CTS CiteKit jQuery plugin.

**CTS Browser** *(in.cts.browser)*

Browse collections and properties from a CTS dataset. Search the collections and properies using filters.

### Data Set Specific

**BotCar Taxonomy** *(in.botcar.taxonomy)*

Browse the taxonomy tree in the botcar dataset.


## Getting Started

The important thing to remember when using the SPARQL Environment is that everything is running client side with certain scripts being loaded from various online resources.

1. Clone the repository.

2. Define a config file or choose an existing one.

Give your dataset a name, description and source. Include any prefixes that are helpful for querying your data. Define the plugins that you want to be included. There are several example config files included in the repository. *fufolio.json* should work on any system.

3. Open the *index.html* file from the sparql-environment root directory in a browser.

*Note for using Chrome:*
Chrome does not allow ajax calls to access local file system files. You can very easily run a http server using python on your local machine. Change directory to your current location and run this command.

````
	 python -m SimpleHTTPServer
````

Then open Chrome and point to localhost:8000/

4. Click import configuration from the right datasets panel and drag the configuration file onto the file dropzone area.

Note: At this time once a configuration file is loaded it can't be removed without editing the local storage for the browser. Future updates should allow for deleting and editing configurations after they've been loaded.

5. Click on the new dataset and start querying.

Example query for the fufolio dataset. Open the CTS Browser plugin and click on the very first edition (Berlioz, Les Troyens). In the RegEx Search field type "oui" ("yes" in french) and click submit. In the JSON viewer are your results: every line in Les Troyens where someone said "Oui"! It's that simple. Try a different out plugin by opening the Table Viewer plugin.
