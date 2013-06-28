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
			this.lien = "#home";
			Backbone.on("settings:change", this.onSettings, this);
			Backbone.on("critere:change", this.onCritere, this);
			Backbone.on("onChampignon", this.onChampignon, this);
			this.$el.css("top", "0");
			this.hide();
		},

		events: {
			"click .grille": "onGrille",
			"click .liste": "onListe",
			"click .diapo": "onDiapo",
			"click .back": "onBackButton",
			"click .show": "onShowButton",
			"click .cueillette": "onCueillette"
		},

		onSettings: function(settings){
			if(settings.liststyle === "grille")
				this.$el.find(".grille").parent().addClass("on").siblings().removeClass("on");
			else if(settings.liststyle === "liste")
				this.$el.find(".liste").parent().addClass("on").siblings().removeClass("on");
		},

		onCritere: function(options){
			if(options.display){
				this.$el.find(".show").parent().show();
				this.$el.find(".show > .count").text(options.count);
			} else {
				this.$el.find(".show").parent().hide();
				this.$el.find(".show > .count").text("");
			}
		},

		onChampignon: function(champignon){
			if( champignon.get("cueillette") )
				this.$el.find(".champignons .cueillette").parent().addClass("on");
			else
				this.$el.find(".champignons .cueillette").parent().removeClass("on");
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

		onShowButton: function(event){
			event.preventDefault();
			Backbone.trigger("critere:show");
			this.$el.find(".show").parent().hide();
			this.$el.find(".show > .count").text("");
		},

		onCueillette: function(event){
			event.preventDefault();
			Backbone.trigger("setCueillette");
			if(this.$el.find(".champignons .cueillette").parent().hasClass("on"))
				this.$el.find(".champignons .cueillette").parent().removeClass("on");
			else
				this.$el.find(".champignons .cueillette").parent().addClass("on");
		},

		show: function(contexte){
			if(contexte !== "champignon"){
				this.contexte = contexte;
				this.lien = "#home";
			} else {
				this.lien = "#" + this.contexte;
			}

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
				case "cueillette":
					this.titre = "Cueillette";
					this.soustitre = "mes champignons";
					break;
				default:
					this.titre = "";
					this.soustitre = "";
					break;
			}

			this.$el.find(".show").parent().hide();
			this.$el.find("h1>i").removeClass().addClass("picto picto-"+ this.contexte +"-active" );

			this.$el.find(".titre").text(this.titre);
			this.$el.find(".sous-titre").text(this.soustitre);

			this.$el.find(".back-button").attr("href", this.lien);

			return this;
		}

	});

	return Header;

});