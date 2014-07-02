sparqplug.in.hmtnames = {type:"in","title":"Names","description":"Browse and search names.","icon":"&#xf002;","css":"sparqplug.in.hmt.names.css"};

sparqplug.in.hmtnames.load = function () {
	console.log("Load HMT Names");
	var names_list = $("<div/>",{
		id:'hmt-names-list',
		'class':'hmt-names-column'
	});

	var names = $(document).query('SELECT ?pers ?label WHERE { <urn:cite:hmt:pers> cts:possesses ?pers . ?pers rdf:label ?label .}', {"source":"http://localhost:3030/names/"});
	console.log(names);

	$.each(names,function (index,value) {
		urn = value.pers.value;
		urn_components = urn.split('.');
		persNum = urn_components[urn_components.length-1];
		label = value.label.value;
		li = $('<li/>',{
			id: 'name-'+persNum,
			text: label
		}).data('urn',urn).click(function () {
			sparqplug.in.hmtnames.selectedName($(this).data('urn'));
		});
			
		$(names_list).append(li);
		
	});
}

sparqplug.in.hmtnames.error = function (error) { alert('There was an Error!'); }

sparqplug.in.hmtnames.updateUI = function () { console.log("updateUI in.hmt.names"); }

sparqplug.in.hmtnames.selectedName = function (name) {
	console.log('Selected Name: '+name);

	name = value.pers.value;
	urn_components = name.split('.');
	persNum = urn_components[urn_components.length-1];
	
	$('#hmt-names-list').children().removeClass('selected');
	$('#name-'+persNum).addClass('selected');
}

plugins['sparqplug-in-hmt-names'] = sparqplug.in.hmtnames;