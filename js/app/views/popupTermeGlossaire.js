define([
	"jquery",
	"underscore",
	"backbone",
	"collections/termes",
	"text!templates/termeGlossaire.html"
], function($, _, Backbone, TermesCollection, termeTemplate){

	var PopupTermeGlossaire = Backbone.View.extend({

		el: $("#terme-glossaire"),
		template: _.template(termeTemplate),

		initialize: function(){
			this.$el.hide();
			this.collection = new TermesCollection();
			Backbone.on("terme:selection", this.showDefinition, this);
		},

		events: {
			"click a.close": "closePopup"
		},

		closePopup: function(event){
			event.preventDefault();
			this.close();
		},

		showDefinition: function(options){
			this.model = this.collection.findWhere({terme: options.terme});
			this.render();
		},

		close: function(){
			this.$el.fadeOut(100);
		},

		render: function(){
			this.$el.html( this.template(this.model.toJSON()) );

			this.$el.show();

			return this;
		}

	});

	return PopupTermeGlossaire;

});