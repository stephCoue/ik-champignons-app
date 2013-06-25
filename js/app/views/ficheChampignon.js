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
			Backbone.on("settings:change", this.setCueillette, this);
			this.model.on("change", this.render, this);
			this.render();
		},

		events: {
			"click a.glossaire": "onTerme",
			"click .cueillette": "onCueillette"
		},

		onCueillette: function(event){
			event.preventDefault();
			Backbone.trigger("setCueillette");
		},

		setCueillette: function(settings){
			if(_.indexOf(settings.cueillette, this.model.id) > -1){
				this.$el.find(".cueillette").addClass("cueillette-on");
			} else {
				this.$el.find(".cueillette").removeClass("cueillette-on");
			}
		},

		onTerme: function(event){
			event.preventDefault();
			Backbone.trigger("terme:selection", {terme: $(event.currentTarget).find("span").text()});
		},

		renderImage: function(){
			this.$el.find(".diaporama img").eq(0).attr({"src": this.model.get("fullimage")});
		},

		removeImage: function(){
			this.$el.find(".diaporama img").eq(0).attr({"src": "img/fullscreen/fake-champignon.png"});
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.width($(window).width());
			return this;
		}

	});

	return FicheChampignon;
});