define(["jquery",
	"underscore",
	"backbone",
	"transit",
	"text!templates/pageHome.html"
], function($, _, Backbone, transit, pageHomeTemplate){

	var PageHome = Backbone.View.extend({

		id: "home",
		className: "page page-home",
		template: _.template(pageHomeTemplate),

		initialize: function() {
			this.level = 0; // pour la gestion du sens des transitions
			this.render();
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return PageHome;

});