define(["jquery",
	"underscore",
	"backbone",
	"transit",
	"text!templates/pageHome.html"
], function($, _, Backbone, transit, pageHomeTemplate){

	var PageHome = Backbone.View.extend({

		el: $("#home"),
		template: _.template(pageHomeTemplate),

		initialize: function() {
			this.render();
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return PageHome;

});