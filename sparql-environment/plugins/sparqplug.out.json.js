sparqplug.out.json = {type:"out","title":"JSON Viewer","description":"View results in a JSON tree.","icon":"&#xf040;"};

sparqplug.out.json.load = function () {

}

sparqplug.out.json.viewResults = function (results) {
	
}

sparqplug.out.json.updateUI = function () {
	$('#sparqplug-out-json').html(JSON.stringify(environment.latestResults));
}

plugins['sparqplug-out-json'] = sparqplug.out.json;