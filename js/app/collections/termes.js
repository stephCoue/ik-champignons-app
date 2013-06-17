define([
	"backbone",
	"models/terme",
	"json!data/glossaire.json"
], function(Backbone, Terme, data){

	var TermesCollection = Backbone.Collection.extend({

		model: Terme,

		initialize: function(){
			this.set(data);
		}

	});

	return TermesCollection;

});