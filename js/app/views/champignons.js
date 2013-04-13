define([
	"jquery",
	"underscore",
	"backbone",
	"collections/champignons",
	"views/champignonItem"
], function($, _, Backbone, ChampignonsCollection, ChampignonItem){

	var ChampignonsListView = Backbone.View.extend({

		tagName: "ul",

		initialize: function(){
			this.gridMode = true;
			this.collection.on("sync", this.render, this);
			this.collection.fetch();
		},

		render: function(){

			if(this.gridMode) {
				this.$el.addClass("grid");
			} else {
				this.removeClass("grid");
			}

			this.$el.attr({
				"data-role":"listview",
				"data-filter":"true",
				"data-filter-placeholder":"Rechercher"
			});
			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon});
				champignonItem.parent = this;
				this.$el.append(champignonItem.render().el);
			}, this);

			return this;
		}

	});

	return ChampignonsListView;

});