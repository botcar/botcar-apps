(function( $ ) {
	 
    $.fn.query = function(query ,options) {
		if (options) {
	 	   	var opts = $.extend( {}, $.fn.defaults, options);
	        $.fn.defaults = opts;
		}
		query = $.fn.defaults.prefix + query;
		var json_string = $.ajax(
		        {
		           url: $.fn.defaults.source+"query", 
				   data: {"query":query},
				   type: "GET",
		           async: false, 
		           dataType: 'json'
		        }
		    ).responseText;
		if (json_string.indexOf('ERROR') == -1) {
			var json = $.parseJSON(json_string);
			return json.results.bindings;
		}
		//ERROR
		
		return {"error":true,"response":json_string}; //evenutally parse code and other data
		
	}
	
	$.fn.verbsForObject = function (object) {
		var results = $(this).query('SELECT distinct ?v where {'+object+' ?v ?o.}');
		var verbs = new Array();
		
		for (i = 0; i < results.length; i++) {
			verbs.push(results[i].v);
		}
		return verbs;
	}
	
	$.fn.resolvePrefix = function (str) {
		for (i = 0; i < $.fn.defaults.prefixes.length; i++) {
			var prefix = $.fn.defaults.prefixes[i];
			if (str.indexOf(prefix.value) == 0) {
				return prefix.prefix+str.substr(prefix.value.length);
			}
		}
		return str;
	}
	
//	$.fn.query.prefixString = function() {
		
//	}
	
	// Plugin defaults
	$.fn.defaults = {
		"source":"http://localhost:3030/ds/", //Defualt source to use out of the sources
		"prefix":"prefix cts: <http://www.homermultitext.org/cts/rdf/> prefix cite: <http://www.homermultitext.org/cite/rdf/> prefix hmt: <http://www.homermultitext.org/hmt/rdf/> prefix citedata: <http://www.homermultitext.org/hmt/citedata/> prefix dcterms: <http://purl.org/dc/terms/> prefix rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> prefix  xsd: <http://www.w3.org/2001/XMLSchema#> prefix olo: <http://purl.org/ontology/olo/core#>",
		"prefixes":[
		{'prefix':'cts:',
		'value':'http://www.homermultitext.org/cts/rdf/'},
		{'prefix':'cite:',
		'value':'http://www.homermultitext.org/cite/rdf/'},
		{'prefix':'hmt:',
		'value':'http://www.homermultitext.org/hmt/rdf/'},
		{'prefix':'citedata:',
		'value':'http://www.homermultitext.org/hmt/citedata/'},
		{'prefix':'dcterms:',
		'value':'http://purl.org/dc/terms/'},
		{'prefix':'rdf:',
		'value':'http://www.w3.org/1999/02/22-rdf-syntax-ns#'},
		{'prefix':'olo:',
		'value':'http://purl.org/ontology/olo/core#'}
		]
	};
	
	
}( jQuery ));

