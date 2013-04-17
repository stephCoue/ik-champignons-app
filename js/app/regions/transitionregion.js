define([
	"jquery",
	"transit",
	"underscore",
	"backbone",
	"marionette"
], function($, transit, _, Backbone, Marionette){

	var TransitionRegion = Backbone.Marionette.Region.extend({

		show: function(view){

			this.ensureEl();

			this.close(function(){

				if (this.currentView && this.currentView !== view) { return; }
				this.currentView = view;

				this.open(view, function(){
					if(view.onShow){ view.onShow(); }
					view.trigger("show");

					if (this.onShow) { this.onShow(view); }
					this.trigger("view:show", view);
				});

			});
		},

		close: function(callback){
			var view = this.currentView;
			delete this.currentView;

			if (!view){
				if (callback){ callback.call(this); }
				return;
			}

			var that = this;

			view.$el.transition({ left: "-100%" }, function(){
				if (view.close) { view.close(); }
				that.trigger("view:closed", view);
				if (callback){ callback.call(that); }
			});

			// view.$el.fadeOut("fast", function(){
			// 	if (view.close) { view.close(); }
			// 	that.trigger("view:closed", view);
			// 	if (callback){ callback.call(that); }
			// });
		},

		open: function(view, callback){
			var that = this;
			this.$el.html(view.$el.hide());

			view.$el.show().transition({ left: 0 }, function(){
				callback.call(that);
			});

			// view.$el.fadeIn("fast", function(){
			// 	callback.call(that);
			// });
		}

	});

	return TransitionRegion;

});