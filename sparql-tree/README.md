# SPARQL Tree

*A javascript based visual tree used to navigate a SPARQL database. Good for navigating data and getting a feel for the relationships.*

## Overview

**tree.html?base=**

Explore your SPARQL dataset by opening tree.html in a browser and adding the base get variabe. Set base to a valid object in the SPARQL database and a single node will appear. If you click on an object the tree will display all of the distinct verbs that can be called on that object. If you click on a verb it applies that verb to the object and displays the resulting objects.

### Problems

**Scrolling**

Currently there is no way to determine the size of the graph and set the size based on how big in needs to be. Therefor in order to allow for displaying large datasets the graph is expected to be very large. On most screen sizes you will have to scroll down to view the first node. 

