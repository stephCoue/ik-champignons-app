define([
	"jquery",
	"underscore",
	"backbone",
	"models/champignon",
	"text!templates/champignonItem.html"
], function($, _, Backbone, Champignon, champignonTemplate){

	var ChampignonItem = Backbone.View.extend({

		tagName: "li",
		className: "champignon-item",
		template: _.template( champignonTemplate ),

		initialize: function(){
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return ChampignonItem;

});