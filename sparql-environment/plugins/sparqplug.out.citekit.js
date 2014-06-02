sparqplug.out.citekit = {type:"out","title":"CiteKit","description":"Resolve resulting CiteKit URNs to Images and Texts.","icon":"&#xf040;","css":"sparqplug.out.citekit.css"};

sparqplug.out.citekit.load = function () {
	$.getScript('js/jquery.citekit.js');
}

sparqplug.out.citekit.updateUI = function () {
	$("#sparqplug-out-citekit").children().remove();
	$.each(environment.latestResults, function (index, value) {
		if (value.o.type == "uri") {
			//$(this).append('<blockquote class="' + csvData[0][0] + '" cite="' + csvData[0][1] + '">' + csvData[0][1] + '</blockquote>');
			blockquote = $('<blockquote/>',{cite:value.o.value,class:'cite-image'});
			$(blockquote).ckLoadBlockquote();
			$("#sparqplug-out-citekit").append(blockquote);
			
		}
	});
}

plugins['sparqplug-out-citekit'] = sparqplug.out.citekit;