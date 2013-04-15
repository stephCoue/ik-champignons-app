define([
	"jquery",
	"underscore",
	"backbone",
	"marionette"
], function($, _, Backbone, Marionette){

	var AppController = Marionette.Controller.extend({

		// routes

		home: function(){
			console.log("AppController : route home");
		},

		tous: function(){
			console.log("AppController : route tous");
		},

		champignon: function(id){
			console.log("AppController : route champignon ", id);
		}
		
	});

	return AppController;

});