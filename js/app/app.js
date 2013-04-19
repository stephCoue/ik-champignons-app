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

		// Les collections
		this.champignons = new ChampignonsCollection();

		// Création du router et du controller associé
		this.controller = new AppController({app:this});
		this.router = new AppRouter({controller: this.controller});

		// Les préférences de l'utilisateur
		this.settings = new Settings({id:1});
		this.settings.fetch();
		console.log(this.settings.get("liststyle"));

		// La vue générale de l'application
		this.appView = new AppView({app:this});

		// La vue du header
		this.header = new Header({app:this});

	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});