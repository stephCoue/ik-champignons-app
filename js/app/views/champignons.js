define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignonItem",
	"collections/champignons"
], function($, _, Backbone, ChampignonItem, ChampignonsCollection){

	var ChampignonsListView = Backbone.View.extend({

		tagName: "ul",
		className: "liste-champignons",

		initialize: function(options) {
			this.collection = options.collection;

			this.collection.on("reset", this.render, this);

			Backbone.on("settings:change", this.onSettings, this);
			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);

			this.render();

		},

		onSettings: function(settings){
			if(settings.liststyle === "grille"){
				this.onGrille();
			} else {
				this.onListe();
			}

			this.sortCollection(settings.sortkey);
		},

		onGrille: function(){
			this.$el.removeClass("grille liste").addClass("grille");
		},

		onListe: function(){
			this.$el.removeClass("grille liste").addClass("liste");
		},

		sortCollection: function(sortkey){
			this.collection.sort_key = sortkey;
			this.collection.sort();
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