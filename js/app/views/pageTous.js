define(["jquery",
	"underscore",
	"backbone",
	"text!templates/pageTous.html"
], function($, _, Backbone, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		initialize: function() {
			this.render();
		},

		id: "tous",
		template: _.template(pageTousTemplate),

		render: function(){
			$(this.el).html(this.template());
			$(this.el).attr({
				'data-role':'page',
				'data-url':'#tous'
			});
			return this;
		}
	});

	return PageTous;

});