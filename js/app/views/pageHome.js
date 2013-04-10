define(["jquery",
	"underscore",
	"backbone",
	"text!templates/pageHome.html"
], function($, _, Backbone, pageHomeTemplate){

	var PageHome = Backbone.View.extend({

		initialize: function() {
			this.render();
		},

		id: "home",
		template: _.template(pageHomeTemplate),

		render: function(){
			$(this.el).html(this.template());
			$(this.el).attr({
				'data-role':'page'
			});
			return this;
		}
	});

	return PageHome;

});