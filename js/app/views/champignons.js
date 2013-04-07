define([
"jquery",
"underscore",
"backbone",
"collections/champignons",
"views/champignonItem"
], function($, _, Backbone, ChampignonsCollection, ChampignonItem){

	var ChampignonsListView = Backbone.View.extend({

		el: $("#listeChampignons"),

		tagName: "ul",

		initialize: function() {
			this.collection = new ChampignonsCollection();
			this.collection.on("sync", this.render, this);
			this.collection.fetch();
		},

		add: function(champignon) {
			console.log("ChampignonsListView champignon added : ", champignon.get('nom'));
		},

		remove: function(champignon){
			console.log("ChampignonsListView champignon removed : ", champignon.get('nom'));
		},

		render: function() {
			_.each(this.collection.models, function(champignon){
				var champignonItem = new ChampignonItem({model:champignon});
				this.$el.append(champignonItem.render().el);
			}, this);
		}

	});

	return ChampignonsListView;

});