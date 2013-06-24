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
			this.model.on("change", this.render, this);
			this.render();
		},

		events: {
			"click a.glossaire": "onTerme",
			"click .cueillette": "onCueillette"
		},

		onCueillette: function(event){
			event.preventDefault();
			Backbone.trigger("cueillette");
			this.setCueillette();
		},

		setCueillette: function(){
			if(this.model.get("cueillette")){
				this.model.set("cueillette", false);
				this.$el.find(".cueillette").removeClass("cueillette-on");
			} else {
				this.model.set("cueillette", true);
				this.$el.find(".cueillette").addClass("cueillette-on");
			}
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