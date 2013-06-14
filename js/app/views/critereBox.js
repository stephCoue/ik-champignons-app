define([
	"jquery",
	"underscore",
	"backbone",
	"text!templates/critereSelectionBox.html"
], function($, _, Backbone, selectionBoxTemplate){

	var CritereBox = Backbone.View.extend({

		id: "critere-selection-box",
		className: "critere-off",
		template: _.template(selectionBoxTemplate),

		initialize: function(){
			this.render();
		},

		events: {
			"click .back-btn": "onBackBtn"
		},

		onBackBtn: function(event){
			event.preventDefault();
			Backbone.trigger("CRITERE_BACK");
		},

		show: function(titre){
			this.$el.find("p").text(titre);
			if( this.$el.hasClass("critere-off") )
				this.$el.removeClass("critere-off").addClass("critere-on");
		},

		hide: function(){
			this.$el.find("p").text("&nbsp;");
			this.$el.removeClass("critere-on").addClass("critere-off");
		},

		render: function(){
			this.$el.html(this.template());
			return this;
		}

	});

	return CritereBox;
});