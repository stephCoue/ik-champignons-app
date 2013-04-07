define([
"jquery",
"underscore",
"backbone",
"models/critere",
"text!templates/critereItem.html"
], function($, _, Backbone, Critere, critereTemplate){

	var CritereItem = Backbone.View.extend({

		tagName: "li",

		template: _.template( critereTemplate ),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return CritereItem;

});
