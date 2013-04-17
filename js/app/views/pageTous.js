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
			this.render();
		},

		render: function(){
			this.listView = new ChampignonsListView({collection:this.collection});
			this.listView.parent = this;
			//this.listView.render();

			$(this.el).html(this.template());

			this.$el.find("#list-view").append(this.listView.$el);

			return this;
		}
	});

	return PageTous;

});