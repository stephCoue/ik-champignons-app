define([
	"underscore",
	"backbone"
], function(_, Backbone){

	var Terme = Backbone.Model.extend({

		defaults: {
			libelle: null,
			description: null,
			image: null
		}

	});

	return Terme;

});