define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collections/champignons",
	"collections/criteres",
	"collections/termes"
], function($, _, Backbone, Marionette, ChampignonsCollection, CriteresCollection, TermesCollection){

	var AppController = Marionette.Controller.extend({

		initialize: function(options){

			// référence sur l'application
			this.app = options.app;

			// La store des champignons
			this.champignonsStore = options.champignons;

			// Lecture des préférences
			Backbone.trigger("settings:change", this.app.settings.toJSON());

			// écouteurs sur préférences
			Backbone.on("filter", this.filterSave, this);
			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);
			Backbone.on("cueillette", this.onCueillette, this);
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

		champignon: function(id){
			console.log("AppController : route champignon id : " + id);
			this.app.appView.pageChampignon.onChampignon(this.champignonsStore.get(id));
			this.app.appView.showPage({page:"champignon"});
		},

		determiner: function(){
			console.log("AppController : route determiner");
			this.app.appView.showPage({page:"determiner"});
		},

		cueillette: function(){
			console.log("AppController : route cueillette");
			this.app.appView.showPage({page:"cueillette"});
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
		},

		onCueillette: function(){
			var currentChampignonId = this.app.champignonsProvider.current.id;
			var savedCueillette = this.app.settings.get("cueillette");

			if( _.indexOf(savedCueillette, currentChampignonId) > -1 ){
				savedCueillette = _.without( savedCueillette, currentChampignonId);
			} else {
				savedCueillette.push(currentChampignonId);
			}

			this.app.settings.set("cueillette", savedCueillette);
			this.app.settings.save();

			// Mise à jour de la collection
			this.app.champignonsProvider.setCueillette(savedCueillette);

			// Evenemnt envoyé pour la mise à jour du bouton cueillette
			Backbone.trigger("settings:change", this.app.settings.toJSON());
		}

	});

	return AppController;

});