define([
	"underscore",
	"backbone",
	"marionette"
], function(_, Backbone, Marionette){

	var AppRouter = Backbone.Marionette.AppRouter.extend({

		appRoutes: {
			"":"home",
			"home":"home",
			"tous":"tous",
			"champignon":"champignon",
			"determiner":"determiner",
			"*action":"home"
		}

	});

	return AppRouter;

});