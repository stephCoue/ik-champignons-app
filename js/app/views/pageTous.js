define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		id: "tous",
		className: "page page-tous",
		template: _.template(pageTousTemplate),

		initialize: function(options) {
			this.level = 1;
			this.liststyle = options.settings.get('liststyle');
			this.render();
		},

		updateListView: function(options){
			this.$el.find("#list-view").removeClass("grille liste").addClass(options.liststyle);
		},

		render: function(){
			this.listView = new ChampignonsListView({collection:this.collection});
			$(this.el).html(this.template());

			this.$el.find("#list-view")
			.removeClass("grille liste")
			.addClass(this.liststyle)
			.append(this.listView.$el);

			return this;
		}
	});

	return PageTous;

});