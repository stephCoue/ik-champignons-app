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
			this.app = options.app;
			this.liststyle = this.app.settings.get('liststyle');
			this.listenTo(this.options.app, "listModeChange", this.onListModeChange);
			this.render();
		},

		onListModeChange: function(){
			this.$el.find("#list-view").removeClass("grille liste").addClass(this.app.settings.get('liststyle'));
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