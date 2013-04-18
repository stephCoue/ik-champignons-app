define([
	"jquery",
	"underscore",
	"backbone",
	"jqmtouch",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, touch, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		className: "page page-champignon",

		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.level = 10;
			this.id = "champignon" + this.model.id;
			this.render();
		},

		events: {
			"swipeleft": "onSwipeLeft",
			"swiperight": "onSwipeRight"
		},

		onSwipeLeft: function(event){
			console.log("Swipe vers la gauche", this.model.collection.getNext().id);
		},

		onSwipeRight: function(event){
			console.log("Swipe vers la droite");
		},

		render: function() {

			$(this.el).html(this.template(this.model.toJSON()));

			if(window.location.hash.indexOf("tous") > 0)
				this.$el.find("#tous-button").addClass("class=ui-btn-active ui-state-persist");

			return this;
		}

	});

	return PageChampignon;

});