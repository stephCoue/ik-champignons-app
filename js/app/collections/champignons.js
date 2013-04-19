define([
	"backbone",
	"models/champignon",
	"json!data/champignons.json"
], function(Backbone, Champignon, data){

	var ChampignonsCollection = Backbone.Collection.extend({

		model: Champignon,

		initialize: function() {
			this.set(data);
		},

		getOne: function(id) {
			this.current = this.get(id);
			return this.current;
		},

		getNext: function(){
			if( (_.indexOf(this.models, this.current) + 1) < this.models.length) {
				this.current = this.at(_.indexOf(this.models, this.current) + 1);
				return this.current;
			} else {
				return null;
			}
		},

		getPrev: function(){
			if( (_.indexOf(this.models, this.current) - 1) > -1) {
				this.current = this.at(_.indexOf(this.models, this.current) - 1);
				return this.current;
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
		}

	});

	return ChampignonsCollection;

});