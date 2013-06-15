define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(){
			this.hide();
			this.contexte = "";
			this.titre = "";
			this.soustitre = "";
			Backbone.on("settings:change", this.onSettings, this);
			Backbone.on("critere:change", this.onCritere, this);
			this.$el.css("top","auto");
		},

		events: {
			"click .grille": "onGrille",
			"click .liste": "onListe",
			"click .diapo": "onDiapo",
			"click .back": "onBackButton",
			"click .cueillette": "onCueillette",
			"click .show": "onShowButton"
		},

		onSettings: function(settings){
			if(settings.liststyle === "grille")
				this.$el.find(".grille").parent().addClass("on").siblings().removeClass("on");
			else if(settings.liststyle === "liste")
				this.$el.find(".liste").parent().addClass("on").siblings().removeClass("on");
		},

		onCritere: function(options){
			if(options.display)
				this.$el.find(".show").parent().show();
			else
				this.$el.find(".show").parent().hide();
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

		onShowButton: function(event){
			event.preventDefault();
			Backbone.trigger("critere:show");
		},

		show: function(contexte){
			if(contexte !== "champignon")
				this.contexte = contexte;

			this.$el.attr("class", "content-header")
			.addClass("header-" + contexte)
			.css("-webkit-transform","translate3d(0,0,0)")
			.addClass("open");
			this.render();
		},

		hide: function(){
			this.$el.attr("class", "content-header")
			.css("-webkit-transform","translate3d(0,-" + this.$el.outerHeight() + "px,0)")
			.removeClass("open");
		},

		render: function() {
			switch(this.contexte){
				case "tous":
					this.titre = "Tous";
					this.soustitre = "les champignons";
					break;
				case "determiner":
					this.titre = "Aide";
					this.soustitre = "à la détermination";
					break;
				default:
					this.titre = "";
					this.soustitre = "";
					break;
			}

			this.$el.find(".show").parent().hide();

			this.$el.find(".titre").text(this.titre);
			this.$el.find(".sous-titre").text(this.soustitre);

			return this;
		}

	});

	return Header;

});