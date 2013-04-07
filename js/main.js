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
	App.initialize();
});
