define([
	"jquery",
	"underscore",
	"backbone"
],
function($, _, Backbone){

	var AppView = Backbone.View.extend({

		el: $("#app-container"),

		initialize: function(){
			this.firstPageAdded = false;
		},

		events: {
			"click a": "onAction"
		},

		onAction: function(event) {
			this.sens = $(event.currentTarget).attr("data-transition");

			if( $(event.currentTarget).attr("data-direction") !== undefined )
				this.reverse = true;
			else
				this.reverse = false;
		},

		changePage: function(page) {
console.log("#" + page.id);
			this.$el.append(page.$el);

			if(!this.firstPageAdded) {
				$.mobile.initializePage();
				this.firstPageAdded = true;
			}

			$.mobile.changePage("#" + page.id, {
				changeHash: false,
				role: "page",
				transition: this.sens,
				reverse: this.reverse
			});

		}
	});

	return AppView;

});