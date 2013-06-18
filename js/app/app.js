define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collections/champignons",
	"json!data/champignons.json",
	"models/settings",
	"routers/appRouter",
	"controllers/appController",
	"views/appview"
], function($, _, Backbone, Marionette, ChampignonsCollection, ChampignonsData, Settings, AppRouter, AppController, AppView){

	var App = new Marionette.Application();

	App.addInitializer(function(){

		// Les préférences de l'utilisateur
		this.settings = new Settings({id:1});
		this.settings.fetch();

		// Chargement des champignons
		this.champignonsProvider = new ChampignonsCollection();
		this.champignonsProvider.name = "tous";
		this.champignonsProvider.set(ChampignonsData);
		this.champignonsProvider.setCueillette(this.settings.get("cueillette"));

		// Un proxy pour les sélectiosn de champignons
		this.champignonsSubset = new ChampignonsCollection();
		this.champignonsSubset.name = "subset";

		// La vue générale de l'application
		this.appView = new AppView({
			champignonsAll: this.champignonsProvider,
			champignonsSubset: this.champignonsSubset
		});

		// Création du router et du controller associé
		this.controller = new AppController({app:this});
		this.router = new AppRouter({controller: this.controller});


	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});