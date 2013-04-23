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

			// écouteurs sur préférences
			Backbone.on("filter", this.filterSave, this);
			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);
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
		},

		// Préférences

		filterSave: function(sortkey){
			this.app.settings.set("sortkey", sortkey);
			this.app.settings.save();
		},

		onGrille: function(){
			this.app.settings.set("liststyle", "grille");
			this.app.settings.save();
		},

		onListe: function(){
			this.app.settings.set("liststyle", "liste");
			this.app.settings.save();
		}

	});

	return AppController;

});