define(["jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		id: "tous",
		template: _.template(pageTousTemplate),

		initialize: function() {
			this.listView = new ChampignonsListView();
			this.render();
		},

		render: function(){

			$(this.el).html(this.template());

			$(this.el).attr({
				'data-role':'page'
			});

			this.$el.find("div:jqmData(role='content')").append(this.listView.$el);
			return this;
		}
	});

	return PageTous;

});