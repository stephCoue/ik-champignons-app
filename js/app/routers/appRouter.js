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
			"champignon/:id":"champignon",
			"determiner":"determiner",
			"cueillette":"cueillette",
			"*action":"home"
		}

	});

	return AppRouter;

});