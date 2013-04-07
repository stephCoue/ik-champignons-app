define([
	"underscore",
	"backbone",
	"models/critere"
], function(_, Backbone, Critere) {

	var CriteresCollection = Backbone.Collection.extend({

		model: Critere,
		url: "js/app/data/criteres.js",

		getEnfants: function(id){
			var enfants = this.where({parent:id});
			if(enfants.length > 0) {
				this.trigger("selection", id);
				return enfants;
			}
		},

		getParent: function(id){
			var current = this.get(id);
			if(id > 0)
				return current.get('parent');
		},

		getChampignons: function(id){
			if(id !== "0")
				return this.get(id).get('champignons');
		}

	});

	return CriteresCollection;
});