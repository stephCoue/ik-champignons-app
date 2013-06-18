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
			// liste des champignons de la cueillette
			this.collection = new Backbone.Collection();
			this.collection.set(options.champignonsAll.where({"cueillette": true}));

			// sous-vue de la liste
			this.listView = new ChampignonsListView(options);

			this.$el.hide();

			this.render();
		},

		render: function(){
			this.listView.collection.reset(this.collection.models);
			this.$el.empty().html(this.template());

			this.$el.find("#list-view")
			.removeClass("grille liste")
			.addClass(this.liststyle)
			.append(this.listView.$el);
		}

	});

	_.extend(PageCueillette.prototype, PageMixin);

	return PageCueillette;

});