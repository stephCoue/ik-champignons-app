define([
	"jquery",
	"underscore",
	"backbone"
],function($, _, Backbone){

	var FooterView = Backbone.View.extend({

		el: $("#footer"),

		initialize: function(){
			Backbone.on("settings:change", this.onSettings, this);
			this.render();
		},

		onSettings: function(settings){
			this.settings = settings;
			if(settings.cueillette.length > 0)
				this.$el.find(".cueillette .count").text( settings.cueillette.length ).css("display","block");
			else
				this.$el.find(".cueillette .count").css("display","none");
		},

		show: function(contexte){
			this.$el.find("." + contexte).addClass("on").siblings().removeClass("on");
			var _this = this;
			this.$el.transition({"y":"-" + _this.$el.outerHeight()}, function(){
				if(_this.settings && _this.settings.cueillette){
					_this.$el.find(".cueillette .count").hide();
					_this.$el.find(".cueillette .count").fadeIn(100);
				}
			});
			this.$el.addClass("open");
		},

		hide: function(){
			this.$el.find("li.on").removeClass("on");
			this.$el.css("-webkit-transform","translate3d(0,0,0)");
			this.$el.removeClass("open");
		},

		render: function(){
			return this;
		}

	});

	return FooterView;

});