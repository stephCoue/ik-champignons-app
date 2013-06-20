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
			this.listenTo(this.model, "change:cueillette", this.setCueillette);
		},

		events: {
			"click a.glossaire": "onTerme",
			"click .cueillette": "onCueillette"
		},

		onCueillette: function(event){
			event.preventDefault();
			Backbone.trigger("cueillette");
		},

		setCueillette: function(){
			if(this.model.get("cueillette"))
				this.$el.find(".cueillette").addClass("cueillette-on");
			else
				this.$el.find(".cueillette").removeClass("cueillette-on");
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