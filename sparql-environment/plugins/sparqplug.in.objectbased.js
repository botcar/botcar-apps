//Object pased plugin for the SPARQL Environment
sparqplug.in.objectbased = {type:"in","title":"Object-Based","description":"Create SPARQL Queries using objects","icon":"&#xf1b3;"};

sparqplug.in.objectbased.load = function () {
	var textarea = $('<div />',{
		id: 'sp-in-object-textarea'
	}).change(sparqplug.in.objectbased.queryChanged);
	
	$("#sparqplug-in-text").append(textarea);
}

sparqplug.in.objectbased.queryChanged = function () {
	var query = this.value;
	environment.performQuery(query);
}

plugins['sparqplug-in-objectbased'] = sparqplug.in.objectbased;