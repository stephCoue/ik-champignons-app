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
			this.on("change", this.onChange, this);
		},

		onChange: function(event){
			console.log("Changement !", event);
			if(this.get("cueillette").length > 0){
				console.log("yen a");
			} else {
				console.log("yen a pas");
			}
		}

	});

	return Preferences;

});