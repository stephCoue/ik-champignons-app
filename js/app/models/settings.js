define([
	"localstorage"
], function(localstorage){

	var Preferences = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('champignons-settings'),

		defaults: {
			"liststyle":"grille",
			"cueillette":[]
		}

	});

	return Preferences;

});