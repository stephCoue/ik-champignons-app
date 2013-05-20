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

			// Lecture des préférences
			Backbone.trigger("settings:change", this.app.settings.toJSON());

			// écouteurs sur préférences
			Backbone.on("filter", this.filterSave, this);
			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);
		},

		// routes

		home: function(){
			console.log("AppController : route home");
			this.app.appView.showPage({page:"home"});
		},

		tous: function(){
			console.log("AppController : route tous");
			this.app.appView.showPage({page:"tous"});
		},

		champignon: function(){
			console.log("AppController : route champignon");
			this.app.appView.showPage({page:"champignon"});
		},

		determiner: function(){
			console.log("AppController : route determiner");
			//this.app.appView.showPage({page:"determiner"});
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