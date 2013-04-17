define([
	"jquery",
	"underscore",
	"backbone"
],
function($, _, Backbone){

	var AppView = Backbone.View.extend({

		el: $("#app-container"),

		initialize: function(){
			this.render();
		},

		render: function() {
			this.$el.height( $(window).height() );
			return this;
		}

	});

	return AppView;

});