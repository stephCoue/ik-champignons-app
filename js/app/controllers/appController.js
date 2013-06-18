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

			// Chargement des données champignons
			this.champignonsDataProvider = new ChampignonsCollection();
			this.champignonsSubset = new ChampignonsCollection();

			// référence sur l'application
			this.app = options.app;

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

		champignon: function(){
			console.log("AppController : route champignon");
			this.app.appView.showPage({page:"champignon"});
		},

		determiner: function(){
			console.log("AppController : route determiner");
			this.app.appView.showPage({page:"determiner"});
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
			console.log("onCueillette !");
			// Trouver l'id du champignon qui est affiché
			console.log(this.app.appView.pageChampignon.champignons[this.app.appView.pageChampignon.currentFiche]);
			// Vérifier si ce champignon fait déjà parti de la cueillette
			// Si oui, on l'enlève de la cueillette
			// si non, on l'ajoute à la cueillette
			// On met à jour la vue du champignon avec l'état de la cueillette
			// On met à jour le bouton cueillette pour afficher le bon nombre de champignons cueillis
		}

	});

	return AppController;

});