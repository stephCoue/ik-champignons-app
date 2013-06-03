define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin"
], function($, _, Backbone, PageMixin){

	var PageDeterminer = Backbone.View.extend({

		el: $("#determiner"),

		initialize: function(){
			this.$el.hide();
		}
	});

	_.extend(PageDeterminer.prototype, PageMixin);

	return PageDeterminer;

});