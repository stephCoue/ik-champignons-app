define(["jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		initialize: function() {
			this.listView = new ChampignonsListView();
			this.render();
		},

		id: "tous",
		template: _.template(pageTousTemplate),

		render: function(){
			$(this.el).html(this.template());

			$(this.el).attr({
				'data-role':'page'
			});

			console.log(this.listView);
			this.$el.find("div:jqmData(role='content')").append(this.listView.$el);
			return this;
		}
	});

	return PageTous;

});