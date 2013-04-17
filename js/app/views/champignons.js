define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignonItem"
], function($, _, Backbone, ChampignonItem){

	var ChampignonsListView = Backbone.View.extend({

		tagName: "ul",

		initialize: function() {
			this.render();
		},

		render: function(){

			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon});
				this.$el.append(champignonItem.$el);
			}, this);

			return this;
		}

	});

	return ChampignonsListView;

});