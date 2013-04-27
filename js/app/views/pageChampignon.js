define([
	"jquery",
	"underscore",
	"backbone",
	"jqmtouch",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, touch, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		el: $("#champignons"),
		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.level = 10;
			this.id = "champignon" + this.model.id;
			this.render();
		},

		render: function() {

			$(this.el).html(this.template(this.model.toJSON()));

			return this;
		}

	});

	return PageChampignon;

});