define([
	"jquery",
	"underscore",
	"backbone"
	], function($, _, Backbone){

		var AppRouter = Backbone.Router.extend({

			routes: {
				"":"home",
				"home":"home",
				"tous": "tous",
				"tous/:id":"getChampignon",
				"determiner": "determiner",
				"mycologie": "mycologie",
				"infos": "infos",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			}

		});

		var initialize = function() {
			var app_router = new AppRouter();
			Backbone.history.start();
		};

		return {
			initialize: initialize
		};

});