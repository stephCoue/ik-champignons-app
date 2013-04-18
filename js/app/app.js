define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"collections/champignons",
	"collections/criteres",
	"routers/appRouter",
	"controllers/appController",
	"views/app"
	], function($, _, Backbone, Marionette, ChampignonsCollection, CriteresCollection, AppRouter, AppController, AppView){

	var App = new Marionette.Application();

	App.addInitializer(function(){

		// Les collections
		this.champignons = new ChampignonsCollection();

		// Création du router et du controller associé
		this.controller = new AppController({app:this});
		this.router = new AppRouter({controller: this.controller});

		// La vue générale de l'application
		this.appView = new AppView();

	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});