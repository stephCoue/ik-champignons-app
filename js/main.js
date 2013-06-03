require.config({
	baseUrl: "js/app/",
	paths: {
		jquery: "../libs/jquery-1.9.1.min",
		underscore: "../libs/underscore-min",
		backbone: "../libs/backbone-min",
		touchswipe: "../libs/jquery.touchSwipe.min",
		localstorage: "../libs/backbone.localStorage",
		marionette: "../libs/backbone.marionette.min",
		fastclick: "../libs/fastclick",
		transit: "../libs/jquery.transit.min",
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
