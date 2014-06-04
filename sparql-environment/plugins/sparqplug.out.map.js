sparqplug.in.text = {type:"in","title":"Text Query","description":"Standard SPARQL query environment.","icon":"&#xf040;","css":"sparqplug.in.text.css"};

sparqplug.in.text.load = function () {
	var textarea = $('<textarea />',{
		id: 'sp-in-text-textarea'
	}).change(sparqplug.in.text.queryChanged);
	
	$("#sparqplug-in-text").append(textarea);
}

sparqplug.in.text.error = function (error) {
	alert('There was an Error!');
}

sparqplug.in.text.updateUI = function () {
	console.log("updateUI in.text");
	$('#sp-in-text-textarea').val(environment.latestQuery);
}

//Plugin Specific

sparqplug.in.text.queryChanged = function () {
	var query = this.value;
	environment.performQuery(query);
}

plugins['sparqplug-in-text'] = sparqplug.in.text;