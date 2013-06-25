define([
	"localstorage"
], function(localstorage){

	var Preferences = Backbone.Model.extend({

		localStorage: new Backbone.LocalStorage('champignons-settings'),

		defaults: {
			"liststyle":"liste",
			"sortkey":"nom",
			"cueillette":[]
		},

		initialize: function(){
			this.fetch();
		}

	});

	return Preferences;

});