define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collections/criteres",
	"collections/termes"
], function($, _, Backbone, Marionette, CriteresCollection, TermesCollection){

	var AppController = Marionette.Controller.extend({

		initialize: function(options){

			// référence sur l'application
			this.app = options.app;

			// La store des champignons
			this.champignonsStore = this.app.champignonsProvider;

			// Lecture des préférences
			Backbone.trigger("settings:change", this.app.settings.toJSON());

			// écouteurs sur préférences
			Backbone.on("filter", this.filterSave, this);
			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);
			Backbone.on("setCueillette", this.onCueillette, this);
		},

		// routes

		home: function(){
			console.log("AppController : route home");
			this.app.appView.showPage({page:"home"});
		},

		tous: function(){
			console.log("AppController : route tous");
			this.app.currentSubset = this.app.tousSubset;
			this.app.appView.showPage({page:"tous"});
		},

		champignon: function(id){
			console.log("AppController : route champignon id : " + id);
			this.app.appView.pageChampignon.collection = this.app.currentSubset;
			this.app.appView.pageChampignon.onChampignon(this.champignonsStore.get(id));
			this.app.appView.showPage({page:"champignon"});
		},

		determiner: function(){
			console.log("AppController : route determiner");
			this.app.currentSubset = this.app.determinerSubset;
			this.app.appView.showPage({page:"determiner"});
		},

		cueillette: function(){
			console.log("AppController : route cueillette");
			this.app.currentSubset = this.app.cueilletteSubset;
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
			var currentChampignonId = this.app.currentSubset.current.id;
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