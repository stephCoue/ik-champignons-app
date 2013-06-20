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
			var margintop = (( $(window).height() - ( $("header").height() + $("footer").height() ) ) - this.$el.find(".nav-main").height()) / 2;
			this.$el.find(".nav-main").css("margin-top", margintop + "px");

			return this;
		}
	});

	return PageHome;

});