define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"routers/appRouter",
	"controllers/appController",
	"collections/champignons",
	"views/app",
	"regions/transitionregion",
	"json!data/champignons.json",
	"json!data/criteres.json"
	], function($, _, Backbone, Marionette, AppRouter, AppController, ChampignonsCollection, AppView, TransitionRegion, ChampignonsData, CriteresData){

	var App = new Marionette.Application();

	App.addInitializer(function(){

		// Chargement des données
		this.dataChampignons = ChampignonsData;
		this.dataCriteres = CriteresData;

		// Collections
		this.champignonsCollection = new ChampignonsCollection();
		this.champignonsCollection.set(this.dataChampignons);

		// Création du router et du controller associé
		this.controller = new AppController({app:this});
		this.router = new AppRouter({controller: this.controller});

		// La vue générale de l'application
		this.appView = new AppView();

		// Les regions
		this.addRegions({
			appContent: new TransitionRegion({el:"#content"}),
			appHeader: new TransitionRegion({el:"#header"}),
			appFooter: new TransitionRegion({el:"#footer"})
		});

	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});