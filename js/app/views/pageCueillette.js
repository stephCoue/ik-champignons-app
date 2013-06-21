define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin",
	"views/champignons",
	"text!templates/pageCueillette.html"
], function($, _, Backbone, PageMixin, ChampignonsListView, pageCueilletteTemplate){

	var PageCueillette = Backbone.View.extend({

		el: $("#cueillette"),
		template: _.template(pageCueilletteTemplate),

		initialize: function(options){
			// Liste de tous les champignons
			this.dataProvider = options.champignonsProvider;

			// liste des champignons de la cueillette
			this.collection = options.cueilletteSubset;
			this.collection.set(this.dataProvider.where({"cueillette": true}));

			// sous-vue de la liste
			this.listView = new ChampignonsListView({collection:this.collection});

			// Ecouteur sur les événements d'ajout ou de suppression de la cueillette
			Backbone.on("settings:change", this.onSettings, this);

			// La page est masquée par défaut
			this.$el.hide();

			this.render();
		},

		onSettings: function(settings){
			this.collection.set(this.dataProvider.where({"cueillette": true}));
			this.render();
		},

		render: function(){

			this.$el.empty().html(this.template());

			if(this.collection.models.length > 0) {
				this.$el.find("#cueillette-message").hide();
				this.listView.collection.reset(this.collection.models);
				this.$el.find("#cueillette-list-view").append(this.listView.$el);
			} else {
				this.$el.find("#cueillette-message").show();
			}

			return this;
		}

	});

	_.extend(PageCueillette.prototype, PageMixin);

	return PageCueillette;

});