define([
	"jquery",
	"underscore",
	"backbone"
],function($, _, Backbone){

	var FooterView = Backbone.View.extend({

		el: $("#footer"),
		
		initialize: function(){
			this.render();
		},

		render: function(){
			return this;
		}

	});

	return FooterView;

});