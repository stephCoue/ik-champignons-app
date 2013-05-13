define([
	"jquery",
	"underscore",
	"backbone",
	"swipe",
	"mixins/pageMixin",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, Swipe, PageMixin, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		el: $("#champignon"),
		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.$el.hide();
			Backbone.on("onChampignon", this.initSwiper, this);
		},

		initSwiper: function(champignon){
			console.log("champignon = ", champignon.get("nom"), champignon.collection.getPrev().get("nom"), champignon.collection.getNext().get("nom") );
		},

		render: function() {
			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});