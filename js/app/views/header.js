define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(){
			this.hide();
			Backbone.on("settings:change", this.onSettings, this);
			this.$el.css("top","auto");
		},

		events: {
			"click .grille": "onGrille",
			"click .liste": "onListe",
			"click .diapo": "onDiapo",
			"click .back": "onBackButton",
			"click .cueillette": "onCueillette"
		},

		onSettings: function(settings){
			if(settings.liststyle === "grille")
				this.$el.find(".grille").parent().addClass("on").siblings().removeClass("on");
			else if(settings.liststyle === "liste")
				this.$el.find(".liste").parent().addClass("on").siblings().removeClass("on");
		},

		onGrille: function(event){
			event.preventDefault();
			Backbone.trigger("onGrille");
			$(event.currentTarget).parent().addClass("on").siblings().removeClass("on");
		},

		onListe: function(event){
			event.preventDefault();
			Backbone.trigger("onListe");
			$(event.currentTarget).parent().addClass("on").siblings().removeClass("on");
		},

		onDiapo: function(event){
			event.preventDefault();
			Backbone.trigger("onDiapo");
		},

		onBackButton: function(event){
			event.preventDefault();
			window.history.go(-1);
		},

		onCueillette: function(event){
			event.preventDefault();
		},

		show: function(contexte){
			this.$el.removeClass("header-tous header-champignon");
			this.$el.addClass("header-" + contexte);
			this.$el.css("-webkit-transform","translate3d(0,0,0)");
		},

		hide: function(){
			this.$el.removeClass("header-tous header-champignon");
			this.$el.css("-webkit-transform","translate3d(0,-" + this.$el.outerHeight() + "px,0)");
		},

		render: function() {
			//$("." + this.liststyle).parent().addClass("on").siblings().removeClass("on");
			return this;
		}

	});

	return Header;

});