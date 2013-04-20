define([
	"jquery",
	"underscore",
	"backbone"
], function($, _, Backbone){

	var Header = Backbone.View.extend({

		el: $("#header"),

		initialize: function(options){
			this.app = options.app;
			this.listenTo(this.app, "listModeChange", this.render);
			this.render();
		},

		render: function() {
			this.$el.find("." + this.app.settings.get("liststyle"))
			.parent().addClass("on").siblings().removeClass("on");

			return this;
		}

	});

	return Header;

});