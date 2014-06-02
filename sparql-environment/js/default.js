$(document).ready(function (){
	environment.load();
	environment.displayConfigs();
	if (environment.currentDataset != null && environment.currentDataset != "") {
		environment.loadDataset(environment.currentDataset);
	}	
	
	$('#import-config-button').click(function (){
	    // Setup the dnd listeners.
		// Check for the various File API support.
		if (window.File && window.FileReader && window.FileList && window.Blob) {
			//New Way
			$("#import-config-file").show();
			//$('#datasets .panel-list').prepend("");
		    var dropZone = document.getElementById('import-config-file');
		    dropZone.addEventListener('dragover', handleDragOver, false);
		    dropZone.addEventListener('drop', handleFileSelect, false);
		  //do your stuff!
		} else {
			//Old Way
			$('#datasets .panel-list ul').append("<li id='import-config'><input id='import-config-url' type='text' placeholder='URL to Config File' /><input id='import-config-btn' type='submit' value='Add'></li>");
			$('#import-config-btn').click(function () {
				environment.importConfigFromURL($('#import-config-url').val());
				$("#import-config").remove();
			});
		}
	});
	
});

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

    // files is a FileList of File objects.
    var output = [];
    for (var i = 0, f; f = files[i]; i++) {
		environment.importConfig(f);
    }
	
	$("#import-config-file").hide();
}
  
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}

var environment = {};

var sparqplug = {};
sparqplug.in = {};
sparqplug.out = {};

var plugins = {};

var localStorage = window.localStorage;

environment.load = function () {
	if (localStorage['sparql.config'] != null) {
		this.config = JSON.parse(localStorage['sparql.config']);
	} else {
		this.config = {};
	}
	if (localStorage['sparql.currentDataset'] != null) {
		this.currentDataset = localStorage['sparql.currentDataset'];
	} else {
		this.currendDataset = "";
	}
	
	environment.latestQuery = "";
	environment.latestResults = {};
}

environment.save = function () {
	localStorage.setItem('sparql.config', JSON.stringify(this.config));
	localStorage.setItem('sparql.currentDataset', this.currentDataset);
}

environment.importConfig = function (file) {
	var reader = new FileReader();

	// Closure to capture the file information.
	reader.onload = (function(e) {
		var contents = e.target.result;
		environment.importConfigJSON(contents);
	});
	
	reader.readAsText(file);
}

environment.importConfigJSON = function (json) {
	console.log('JSON: '+json);
	new_config = JSON.parse(json);
	new_config.history = [];
	this.config[new_config.name] = new_config;
	this.currentDataset = new_config.name;
	this.save();
	
	this.displayConfigs();
}

environment.importConfigFromURL = function (url) {
	console.log('importing config from URL: '+url)
	json = $.getJSON( url ,function( data ) {
		environment.importConfigJSON(data);
		console.log('recieved data from config URL');
		$('#datasets .panel-list li').append("<li>"+data.name+"</li>");
	});
}



environment.displayConfigs = function () {
	console.log('load configs: '+this.config);
	$("#datasets .panel-list ul").empty();
	$.each(this.config,function(index,value) {
		console.log('config: '+value.name);
		li = $('<li/>',{
			text:value.name,
			title:value.description
		}).click(function () {
			dataset = this.innerHTML;
			console.log("load dataset: "+dataset);
			environment.currentDataset = dataset;
			$('#datasets .panel-list li').removeClass('selected');
			$(this).addClass('selected');
			environment.save();
			
			environment.loadDataset(dataset);
		});
		if (environment.currentDataset == value.name) {
			li.addClass('selected');
		}
		$("#datasets .panel-list ul").append(li);
	});
	
	$("#import-config-file").hide();
	$("#import-config-file-hide").click(function(){
		$("#import-config-file").hide();
	});
}

environment.loadDataset = function (dataset) {
	
	environment.currentInPlugin = null;
	environment.currentOutPlugin = null;
	
	$('#inputs').children().remove();
	$('#data-input .panel-menu-tabs').children().remove();
	
	$('#outputs').children().remove();
	$('#data-output-results .panel-menu-tabs').children().remove();
	
	$.each(environment.config[dataset].plugins,function (index,value) {
		environment.loadPlugin(value);
	});	

	this.loadHistory();
	
}

environment.loadPlugin = function (plugin) { // sparqplug.in.objectbased
	console.log('Loading SparqPlug: '+plugin);
	
	$.getScript('plugins/'+plugin.replace(/\-/g,'.')+'.js', function( data, textStatus, jqxhr ) {
		console.log('Loaded JS for Plugin: '+plugin);
		new_plugin = $("<div/>",{
			id: plugin,
			class: 'plugin-'+plugins[plugin].type
		});
		new_tab = $("<a/>",{
			id: plugin+'-tab',
			title: plugins[plugin].description,
			href:"javascript:environment.viewPlugin('"+plugin+"')"
		});
		new_tab.append('<span class="icons">'+plugins[plugin].icon+'</span> '+plugins[plugin].title);
		
		if (plugins[plugin].type == "in") {
			$('#inputs').append(new_plugin);			
			$('#data-input .panel-menu-tabs').append(new_tab);
			if (environment.currentInPlugin == null) {
				environment.viewPlugin(plugin);
			}
		} else if (plugins[plugin].type == "out") {
			$('#outputs').append(new_plugin);			
			$('#data-output-results .panel-menu-tabs').append(new_tab);
			if (environment.currentOutPlugin == null) {
				environment.viewPlugin(plugin);
			}
		}
		plugins[plugin].load();
		
		if (plugins[plugin].css) {
			$('<link/>', {
			   rel: 'stylesheet',
			   type: 'text/css',
			   href: 'plugins/'+plugins[plugin].css
			}).appendTo('head');
		}
	});
}

environment.viewPlugin = function (plugin) {
	//Switch views
	$('#'+plugin).parent().prepend($('#'+plugin));
	
	$('#'+plugin+"-tab").parent().children().removeClass('selected');
	$('#'+plugin+"-tab").addClass('selected');
	
	plugins[plugin].updateUI();
	
	if (plugins[plugin].type == "in") {
		this.currentInPlugin = plugin;
	} else if (plugins[plugin].type == "out") {
		this.currentOutPlugin = plugin;
	}
}

environment.performQuery = function (query) {
	console.log('Query: '+query);
	var results = $(document).query(query,this.config[environment.currentDataset]);
	if (results.error) {
		plugins[this.currentInPlugin].error(results.response);
		return;
	}
	this.latestQuery = query;
	this.latestResults = results;
	
	this.addToHistory(query);
	
	plugins[this.currentOutPlugin].updateUI();
}

//History

environment.addToHistory = function (query) {
	$("#data-output-history ul").prepend(environment.createHistoryli(query,this.config[this.currentDataset].history.length));
	
	this.config[this.currentDataset].history.push(query);
	this.save();
}

environment.loadHistory = function () {
	$("#data-output-history ul").children().remove();
	
	$.each(this.config[this.currentDataset].history, function (index, value) {
		$("#data-output-history ul").prepend(environment.createHistoryli(value,index));
	});
}

environment.createHistoryli = function (query, index) {
	li = $("<li/>",{
				text: query
			}).data('history-index',index).click(function(){
				query = this.innerHTML;
				environment.loadFromHistory($(this).data('history-index'));
			});
			return li;
}

environment.loadFromHistory = function (index) {
	query = this.config[this.currentDataset].history[index];
	this.latestQuery = query;
	var results = $(document).query(query,this.config[environment.currentDataset]);
	if (results.error) {
		alert('History Item had Error!');
		return;
	}
	this.latestResults = results;
	
	plugins[this.currentInPlugin].updateUI();
	plugins[this.currentOutPlugin].updateUI();
}

environment.clearHistory = function () {
	this.config[this.currentDataset].history = [];
	this.save();
	
	this.loadHistory();
}

