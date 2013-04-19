define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(options){
			this.app = options.app;
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
		},

		onListe: function(event){
			event.preventDefault();
			this.app.settings.set("liststyle", "liste");
			this.app.settings.save();
		},

		onBouton: function(event){
			event.preventDefault();
		}

	});

	return Header;

});