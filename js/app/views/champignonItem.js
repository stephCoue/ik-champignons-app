define([
	"jquery",
	"underscore",
	"backbone",
	"models/champignon",
	"text!templates/champignonItem.html"
], function($, _, Backbone, Champignon, champignonTemplate){

	var ChampignonItem = Backbone.View.extend({

		tagName: "li",
		template: _.template( champignonTemplate ),

		initialize: function(){
			this.render();
		},

		events: {
			"click a": "onClick"
		},

		onClick: function(){
			this.collection.current = this.model;
			Backbone.trigger("onChampignon", this.model);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return ChampignonItem;

});