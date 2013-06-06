define([
	"underscore",
	"backbone",
	"marionette",
	"controllers/appController"
], function(_, Backbone, Marionette, AppController){

	var AppRouter = Backbone.Marionette.AppRouter.extend({

		appRoutes: {
			"":"home",
			"home":"home",
			"tous":"tous",
			"champignon":"champignon",
			"determiner":"determiner",
			"determiner/:id":"critere",
			"*action":"home"
		}

	});

	return AppRouter;

});