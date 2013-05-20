define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var PageDeterminer = Backbone.View.extend({

		el: $("#determiner"),

		initialize: function(){
			this.$el.hide();
		}
	});

	return PageDeterminer;

});