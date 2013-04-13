define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		class: "champignon",
		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.id = "champignon" + this.model.id;
			this.render();
		},

		events: {
			//"click #backbutton" : "onBackButton"
		},

		onBackButton: function(event) {
			history.go(-1);
			return false;
		},

		render: function() {

			$(this.el).html(this.template(this.model.toJSON()));
			$(this.el).attr({
				"id":this.id,
				"class":"fiche-champignon",
				'data-role':'page'
			});
			return this;
		}

	});

	return PageChampignon;

});