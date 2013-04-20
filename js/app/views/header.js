define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(options){
			this.app = options.app;
			this.render();
		},

		events: {
			"click .grille": "onGrille",
			"click .liste": "onListe",
			"click .diapo": "onBouton"
		},

		onGrille: function(event){
			event.preventDefault();
			this.app.settings.set("liststyle", "grille");
			this.app.settings.save();
			this.render();
			this.app.appView.currentView.updateListView({liststyle: this.app.settings.get("liststyle")});
		},

		onListe: function(event){
			event.preventDefault();
			this.app.settings.set("liststyle", "liste");
			this.app.settings.save();
			this.render();
			this.app.appView.currentView.updateListView({liststyle: this.app.settings.get("liststyle")});
		},

		onBouton: function(event){
			event.preventDefault();
		},

		render: function() {
			this.$el.find("." + this.app.settings.get("liststyle"))
			.parent().addClass("on").siblings().removeClass("on");


			return this;
		}

	});

	return Header;

});