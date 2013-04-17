require.config({
	baseUrl: "js/app/",
	paths: {
		jquery: "../libs/jquery-1.9.1.min",
		underscore: "../libs/underscore-min",
		backbone: "../libs/backbone-min",
		marionette: "../libs/backbone.marionette.min",
		transit: "../libs/jquery.transit.min",
		fastclick: "../libs/fastclick",
		text: "../libs/text",
		json: "../libs/json"
	},
	shim: {
		underscore: {
			exports: "_"
		},
		backbone: {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		},
		marionette: {
			deps: ["jquery", "underscore", "backbone"],
			exports: "Marionette"
		}
	}
});

require(["app"], function(App){

	App.start();

});
