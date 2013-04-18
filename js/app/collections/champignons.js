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
			var currentIndex = _.indexOf(this.models, this.current);
			console.log("currentIndex = ", currentIndex);
			var next = this.at(currentIndex + 1);
			this.current = next;
			console.log(this.current.id);
			return this.current;
		},

		getPrev: function(){
			var prev = this.at(_.indexOf(this.current) - 1);
			this.current = prev;
			return this.current;
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