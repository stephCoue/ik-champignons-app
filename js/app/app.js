define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"routers/appRouter",
	"controllers/appController"
	], function($, _, Backbone, Marionette, AppRouter, AppController){

	var App = new Backbone.Marionette.Application();

	App.addInitializer(function(){
		this.controller = new AppController();
		this.router = new AppRouter({controller: this.controller});
	});

	App.on("start", function(options){
		Backbone.history.start();
	});

	return App;

});