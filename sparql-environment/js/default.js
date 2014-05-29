var environment = {};
var localStorage = window.localStorage;

environment.load = function () {
	this.config = JSON.parse(localStorage['sparql.config']);
}

environment.save = function () {
	localStorage.setItem('sparql.config', JSON.stringify(this.config));
}

environment.importConfig = function () {
	this.config
}

environment.displayConfigs = function () {
	$.each(this.config,function(index,value) {
		$("#datasets panel-list ul").append('<li>'+value.name+'</li>');
	});
}