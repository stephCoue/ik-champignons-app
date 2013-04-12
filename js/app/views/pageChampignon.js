define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		id: "champignon",
		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.render();
		},

		render: function() {
			$(this.el).html(this.template());
			$(this.el).attr({
				'data-role':'page'
			});
			return this;
		}

	});

	return PageChampignon;

});