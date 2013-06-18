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

		// Chargement des données
		this.champignonsProvider = new ChampignonsCollection();
		this.champignonsProvider.set(ChampignonsData);
		this.champignonsSubset = new ChampignonsCollection();

		// Les préférences de l'utilisateur
		this.settings = new Settings({id:1});
		this.settings.fetch();

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