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

			this.collection = new ChampignonsCollection();
			this.collection.on("sync", this.render, this);
			this.collection.fetch();
		},

		renderGrig: function() {
			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon, tagName:"div"});
				this.$el.append(champignonItem.el);
			}, this);
		},

		renderList: function() {
			var ul = $("<ul>");
			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon, tagName:"li"});
				ul.append(champignonItem.render().el);
			}, this);
			this.$el.append(ul);
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
				this.$el.append(champignonItem.el);
			}, this);

			this.$el.listview();

		}

	});

	return ChampignonsListView;

});