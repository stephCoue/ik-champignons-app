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

		initialize: function(options){
			this.$el.hide();

			this.champignonsProvider = options.champignonsProvider;

			this.resultatView = new ChampignonsListView();

			this.critereBox = new CritereBox();
			this.critereBox.parent = this;

			this.criteresListView = new CriteresListView();
			this.criteresListView.parent = this;

			this.currentCritere = null;
			Backbone.on("critere:show", this.showResultatView, this);

			this.render();
		},

		setSelection: function(critere){
			if(critere) {
				this.currentCritere = critere;
				this.critereBox.show(critere.get('label'));
				if(critere.get('enfants').length === 0) {
					this.showResultatView();
				} else {
					this.criteresListView.$el.show();
					this.resultatView.$el.hide();
				}
				Backbone.trigger("critere:change", {display:true, count:this.currentCritere.get("count")});
			} else {
				this.currentCritere = null;
				this.criteresListView.$el.show();
				this.resultatView.$el.hide();
				this.critereBox.hide();
				Backbone.trigger("critere:change", {display:false});
			}
		},

		showResultatView: function(){
			this.criteresListView.$el.hide();
			this.resultatView.collection.reset(this.champignonsProvider.getSubset(this.currentCritere.get("champignons")));
			this.resultatView.$el.show();
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