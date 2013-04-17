define(["jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		id: "tous",
		className: "page-tous",
		template: _.template(pageTousTemplate),

		initialize: function() {
			this.level = 1;
			this.render();
		},

		render: function(){
			this.listView = new ChampignonsListView();
			$(this.el).html(this.template());

			this.$el.find("#list-view").append(this.listView.$el);

			return this;
		}
	});

	return PageTous;

});