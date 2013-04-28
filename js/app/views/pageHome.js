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

		pageClose: function(){
			this.$el.fadeOut();
		},

		pageOpen: function(){
			this.$el.fadeIn();
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}
	});

	return PageHome;

});