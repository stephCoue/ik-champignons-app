define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"models/settings",
	"routers/appRouter",
	"controllers/appController",
	"views/app",
	"views/header"
], function($, _, Backbone, Marionette, Settings, AppRouter, AppController, AppView, Header){

	var App = new Marionette.Application();

	App.addInitializer(function(){

		// Les préférences de l'utilisateur
		this.settings = new Settings({id:1});
		this.settings.on("change", function(){
			console.log("Settings chargés ! ", this.settings);
		}, this);
		this.settings.on("error", function(event){
			console.log("settings erreur ! ", event);
		});
		this.settings.fetch();

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