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

		events: {
			"click a.glossaire": "onTerme"
		},

		onTerme: function(event){
			event.preventDefault();
			Backbone.trigger("terme:selection", {terme: $(event.currentTarget).find("span").text()});
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.width($(window).width());
			return this;
		}

	});

	return FicheChampignon;
});