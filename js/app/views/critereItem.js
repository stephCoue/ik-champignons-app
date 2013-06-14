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

		events: {
			"click a": "onCritere"
		},

		onCritere: function(event){
			event.preventDefault();
			Backbone.trigger("CRITERE", this.model.id);
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}

	});

	return CritereItem;

});
