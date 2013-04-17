define(["jquery",
	"underscore",
	"backbone",
	"text!templates/pageHome.html"
], function($, _, Backbone, pageHomeTemplate){

	var PageHome = Backbone.View.extend({

		id: "home",
		template: _.template(pageHomeTemplate),

		initialize: function() {
			this.render();
		},

		render: function(){
			$(this.el).html(this.template());
			return this;
		}
	});

	return PageHome;

});