define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin",
	"text!templates/pageDeterminer.html",
	"views/criteres"
], function($, _, Backbone, PageMixin, pageDeterminerTemplate, CriteresListView){

	var PageDeterminer = Backbone.View.extend({

		el: $("#determiner"),
		template: _.template(pageDeterminerTemplate),

		initialize: function(){
			this.$el.hide();
			this.criteresListView = new CriteresListView();
			this.render();
		},

		render: function(){
			this.$el.html(this.template());
			this.criteresListView.render();
			this.$el.find(".page-inner").append(this.criteresListView.$el);

			return this;
		}
	});

	_.extend(PageDeterminer.prototype, PageMixin);

	return PageDeterminer;

});