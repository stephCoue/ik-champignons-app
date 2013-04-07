define([
	"jquery",
	"mobile",
	"underscore",
	"backbone",
	"router"
	], function($, mobile, _, Backbone, Router){

	var initialize = function() {
		Router.initialize();
	};

	return {
		initialize: initialize
	};

});