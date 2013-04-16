define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"routers/appRouter",
	"controllers/appController",
	"json!data/champignons.json",
	"json!data/criteres.json"
	], function($, _, Backbone, Marionette, AppRouter, AppController, ChampignonsData, CriteresData){

	var App = new Backbone.Marionette.Application();

	App.addInitializer(function(){

		// Chargement des données
		this.dataChampignons = ChampignonsData;
		this.dataCriteres = CriteresData;

		// Création du router et du controller associé
		this.controller = new AppController();
		this.router = new AppRouter({controller: this.controller});

	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});