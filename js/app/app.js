define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"models/settings",
	"collections/champignons",
	"collections/criteres",
	"routers/appRouter",
	"controllers/appController",
	"views/app",
	"views/header"
], function($, _, Backbone, Marionette, Settings, ChampignonsCollection, CriteresCollection, AppRouter, AppController, AppView, Header){

	var App = new Marionette.Application();

	App.addInitializer(function(){

		// Les préférences de l'utilisateur
		this.settings = new Settings({id:1});
		this.settings.fetch();

		// Les collections
		this.champignons = new ChampignonsCollection();
		this.champignons.filtrerPar(this.settings.get("sortkey"));

		// La vue générale de l'application
		this.appView = new AppView({app:this});

		// La vue du header
		this.header = new Header({liststyle: this.settings.get("liststyle")});

		// Création du router et du controller associé
		this.controller = new AppController({app:this});
		this.router = new AppRouter({controller: this.controller});

	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});