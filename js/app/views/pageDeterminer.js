define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin",
	"text!templates/pageDeterminer.html",
	"views/criteres",
	"views/critereBox"
], function($, _, Backbone, PageMixin, pageDeterminerTemplate, CriteresListView, CritereBox){

	var PageDeterminer = Backbone.View.extend({

		el: $("#determiner"),
		template: _.template(pageDeterminerTemplate),

		initialize: function(){
			this.$el.hide();

			this.critereBox = new CritereBox();
			this.critereBox.parent = this;

			this.criteresListView = new CriteresListView();
			this.criteresListView.parent = this;

			this.render();
		},

		setSelection: function(critere){
			if(critere !== undefined)
				this.critereBox.show(critere.get('label'));
			else
				this.critereBox.hide();
		},

		render: function(){
			this.$el.html(this.template());
			this.criteresListView.render();
			this.$el.find(".page-inner").append(this.critereBox.$el).append(this.criteresListView.$el);

			return this;
		}
	});

	_.extend(PageDeterminer.prototype, PageMixin);

	return PageDeterminer;

});