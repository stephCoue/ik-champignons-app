define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignonItem",
	"collections/champignons",
	"json!data/champignons.json"
], function($, _, Backbone, ChampignonItem, ChampignonsCollection, data){

	var ChampignonsListView = Backbone.View.extend({

		tagName: "ul",
		className: "liste-champignons",

		initialize: function() {
			this.render();
		},

		render: function(){

			this.$el.empty();

			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon});
				this.$el.append(champignonItem.$el);
			}, this);

			return this;
		}

	});

	return ChampignonsListView;

});