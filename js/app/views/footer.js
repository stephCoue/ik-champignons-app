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

		show: function(contexte){
			this.$el.find("." + contexte).addClass("on").siblings().removeClass("on");
			this.$el.css("-webkit-transform","translate3d(0,-" + this.$el.outerHeight() + "px,0)");
		},

		hide: function(){
			this.$el.find("li.on").removeClass("on");
			this.$el.css("-webkit-transform","translate3d(0,0,0)");
		},

		render: function(){
			return this;
		}

	});

	return FooterView;

});