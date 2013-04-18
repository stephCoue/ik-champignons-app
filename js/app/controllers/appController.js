define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collections/champignons",
	"views/pageHome",
	"views/pageTous"
], function($, _, Backbone, Marionette, ChampignonsCollection, PageHome, PageTous){

	var AppController = Marionette.Controller.extend({

		initialize: function(options){

			// référence sur l'application
			this.app = this.options.app;

			// Collections
			this.champignons = new ChampignonsCollection();

		},

		// routes

		home: function(){
			console.log("AppController : route home");
			this.app.appView.swapView({id:"home"});
		},

		tous: function(){
			console.log("AppController : route tous");
			this.app.appView.swapView({id:"tous", collection: this.champignons});
		},

		champignon: function(id){
			console.log("AppController : route champignon ", id);
			this.app.appView.swapView({id:"champignon", model: this.champignons.get(id)});
		}

	});

	return AppController;

});