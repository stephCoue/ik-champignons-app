define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(options){
			this.liststyle = options.liststyle;
			this.render();
		},

		events: {
			"click .grille": "onGrille",
			"click .liste": "onListe",
			"click .diapo": "onDiapo",
			"click .back": "onBackButton",
			"click .cueillette": "onCueillette"
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

		render: function() {
			$("." + this.liststyle).parent().addClass("on").siblings().removeClass("on");
			return this;
		}

	});

	return Header;

});