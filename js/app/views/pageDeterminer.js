define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin",
	"text!templates/pageDeterminer.html",
	"views/criteres",
	"views/critereBox",
	"collections/champignons",
	"views/champignons"
], function($, _, Backbone, PageMixin, pageDeterminerTemplate, CriteresListView, CritereBox, ChampignonsCollection, ChampignonsListView){

	var PageDeterminer = Backbone.View.extend({

		el: $("#determiner"),
		template: _.template(pageDeterminerTemplate),

		initialize: function(){
			this.$el.hide();

			this.resultatCollection = new ChampignonsCollection();
			this.resultatView = new ChampignonsListView();

			this.critereBox = new CritereBox();
			this.critereBox.parent = this;

			this.criteresListView = new CriteresListView();
			this.criteresListView.parent = this;

			this.render();
		},

		setSelection: function(critere){
			if(critere) {
				this.critereBox.show(critere.get('label'));
				if(critere.get('enfants').length === 0) {
					this.criteresListView.$el.hide();
					this.resultatCollection.createSubset(critere.get("champignons"));
					this.resultatView.collection = this.resultatCollection;
					this.resultatView.render();
					this.resultatView.$el.show();
				} else {
					this.criteresListView.$el.show();
					this.resultatView.$el.hide();
				}
			} else {
				this.criteresListView.$el.show();
				this.critereBox.hide();
			}
		},

		render: function(){
			this.$el.html(this.template());
			this.criteresListView.render();
			this.$el.find(".page-inner")
			.append(this.critereBox.$el)
			.append(this.criteresListView.$el)
			.append(this.resultatView.$el.hide());

			return this;
		}
	});

	_.extend(PageDeterminer.prototype, PageMixin);

	return PageDeterminer;

});