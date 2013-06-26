define([
	"jquery"
], function($){

	var PageMixin = {

		speed: 500,

		pageOpen: function(toleft){
			if(toleft) {
				this.$el.css({"-webkit-transform":"translate3d(100%,0,0)"}).show();
			} else {
				this.$el.css({"-webkit-transform":"translate3d(-100%,0,0)"}).show();
			}

			this.$el.transition({"-webkit-transform":"translate3d(0,0,0)"}, this.speed, 'ease');
			this.$el.css({"-webkit-overflow-scrolling":"touch"});
		},

		pageClose: function(toleft){
			var _this = this;
			if(toleft) {
				this.$el.transition({"-webkit-transform":"translate3d(-100%,0,0)"}, this.speed, 'ease', function(){
					_this.$el.hide().css({"-webkit-transform":"translate3d(100%,0,0)"});
				});
			} else {
				this.$el.transition({"-webkit-transform":"translate3d(100%,0,0)"}, this.speed, 'ease', function(){
					_this.$el.hide().find(".empty").children().remove();
				});
			}

			this.$el.css({"-webkit-overflow-scrolling":"none"});
		}

	};

	return PageMixin;

});