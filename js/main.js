require.config({
	baseUrl: "js/app/",
	paths: {
		jquery: "../libs/jquery-1.9.1.min",
		mobile: "../libs/jquery.mobile-1.3.0.min",
		underscore: "../libs/underscore-min",
		backbone: "../libs/backbone-min",
		fastclick: "../libs/fastclick",
		text: "../libs/text"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(['app', 'fastclick'], function(App){

	$(document).on("mobileinit", function(){
		// Empêche toute manipulation de clic sur les ancres
		$.mobile.linkBindingEnabled = false;
		// Empêche jQuery Mobile de traiter des changements de hash
		$.mobile.hashListeningEnabled = false;
		// Configuration splashscreen
		//$( "#splash" ).fixedtoolbar({ tapToggle: false });
	});

	document.addEventListener("deviceready", function(event){
		require( [ "mobile" ], function() {
			console.log("jquery mobile chargé");
			App.initialize();
		});
	}, false);

	if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
		console.log("On est sur ", navigator.userAgent);
	} else {
		console.log("On est sur ", navigator.userAgent);
		require( [ "mobile" ], function() {
			App.initialize();
		});
	}
});
