define([
	"underscore",
	"backbone",
	"models/critere",
	"json!data/criteres.json"
], function(_, Backbone, Critere, data) {

	var CriteresCollection = Backbone.Collection.extend({

		model: Critere,

		initialize: function(){
			this.set(data);
		},

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