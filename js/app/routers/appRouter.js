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
			"champignon/:id":"champignon",
			"*action":"home"
		}

	});

	return AppRouter;

});