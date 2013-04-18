define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"views/pageHome",
	"views/pageTous"
], function($, _, Backbone, Marionette, PageHome, PageTous){

	var AppController = Marionette.Controller.extend({

		initialize: function(options){
			// référence sur l'application
			this.app = this.options.app;
		},

		// routes

		home: function(){
			console.log("AppController : route home");
			this.app.appView.swapView({id:"home"});
		},

		tous: function(){
			console.log("AppController : route tous");
			this.app.appView.swapView({id:"tous", collection: this.app.champignons});
		},

		champignon: function(id){
			console.log("AppController : route champignon ", id);
			this.app.appView.swapView({id:"champignon", model: this.app.champignons.getOne(id)});
		}

	});

	return AppController;

});