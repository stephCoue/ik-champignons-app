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

require(['app'], function(App){

	$(document).on("mobileinit", function(){
		// Empêche toute manipulation de clic sur les ancres
		$.mobile.linkBindingEnabled = false;
		// Empêche jQuery Mobile de traiter des changements de hash
		$.mobile.hashListeningEnabled = false;
	});

	document.addEventListener("deviceready", function(event){
		require( [ "mobile" ], function() {
			console.log("jquery mobile chargé");
			App.initialize();
		});
	}, false);
});
