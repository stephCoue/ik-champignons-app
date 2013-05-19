define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/ficheChampignon.html"
],function($, _, Backbone, ficheTemplate){

	var FicheChampignon = Backbone.View.extend({

		template: _.template(ficheTemplate),
		className: "slide",

		initialize: function(){
			this.render();
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.width($(window).width());
			return this;
		}

	});

	return FicheChampignon;
});