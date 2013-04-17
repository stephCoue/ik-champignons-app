define([
	"jquery",
	"underscore",
	"backbone",
	"marionette",
	"views/pageHome",
	"views/pageTous"
], function($, _, Backbone, Marionette, PageHome, PageTous){

	var AppController = Marionette.Controller.extend({

		initialize: function(options){

			// référence sur l'application
			this.app = this.options.app;

			// Les vues
			this.pageHome = new PageHome();
			this.pageTous = new PageTous({collection:this.app.champignonsCollection});

		},

		// routes

		home: function(){
			console.log("AppController : route home");
			this.app.appContent.show(this.pageHome);
		},

		tous: function(){
			console.log("AppController : route tous");
			this.app.appContent.show(this.pageTous);
		},

		champignon: function(id){
			console.log("AppController : route champignon ", id);
		}

	});

	return AppController;

});