define([
	"backbone",
	"models/champignon",
	"json!data/champignons.json"
], function(Backbone, Champignon, data){

	var ChampignonsCollection = Backbone.Collection.extend({

		model: Champignon,
		sort_key: "nom",

		comparator: function(item){
			return item.get(this.sort_key);
		},

		filtrerPar: function(filtre){
			this.sort_key = filtre;
			this.sort();
		},

		rechercher: function(exp){
			var result = this.filter(function(item){
				return item.get('nom').toLowerCase().search(exp) != -1 || item.get('nomlatin').toLowerCase().search(exp) != -1;
			});
			return result;
		},

		getNext: function(){
			if( (_.indexOf(this.models, this.current) + 1) < this.models.length) {
				return this.at(_.indexOf(this.models, this.current) + 1);
			} else {
				return null;
			}
		},

		getPrev: function(){
			if( (_.indexOf(this.models, this.current) - 1) > -1) {
				return this.at(_.indexOf(this.models, this.current) - 1);
			} else {
				return null;
			}
		},

		selection: function(ids){
			if(ids === 0)
				ids = this.getModelsIds();

			_.each(this.models, function(model){
				if( _.indexOf(ids, parseInt(model.get("id"), 10)) > -1 ) {
					model.set("selected", true);
				} else {
					model.set("selected", false);
				}
			});
		},

		getModelsIds: function() {
			var t = [];
			_.each(this.models, function(model){
				t.push( parseInt(model.id, 10) );
			});
			return t;
		},

		getSubset: function(ids){
			var t = [];
			_.each(this.models, function(model){
				if (_.contains(ids, parseInt(model.id, 10) ))
					t.push(model);
			});
			return t;
		},

		setCueillette: function(ids){
			_.each(this.models, function(model){
				if(_.contains(ids, model.id))
					model.set("cueillette", true);
				else
					model.set("cueillette", false);
			});
		}

	});

	return ChampignonsCollection;

});