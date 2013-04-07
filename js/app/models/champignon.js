define([
	"underscore",
	"backbone"
], function(_, Backbone){

	var Champignon = Backbone.Model.extend({

		defaults: {
			nom: null,
			genre: null,
			espece: null,
			selected: true
		},

		initialize: function() {
			this.set("nomlatin", this.get('genre') + " " + this.get('espece').toLowerCase());
		}

	});

	return Champignon;

});