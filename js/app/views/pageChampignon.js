define([
	"jquery",
	"underscore",
	"backbone",
	"swiper",
	"mixins/pageMixin",
	"text!templates/pageChampignon.html"
], function($, _, Backbone, Swiper, PageMixin, PageChampignonTemplate){

	var PageChampignon = Backbone.View.extend({

		el: $("#champignon"),
		template: _.template(PageChampignonTemplate),

		initialize: function() {
			this.$el.hide();
			Backbone.on("onChampignon", this.initSwiper, this);
		},

		initSwiper: function(champignon){
			console.log("champignon = ", champignon.get("nom"), new Swiper(this.$el));
		},

		render: function() {
			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});