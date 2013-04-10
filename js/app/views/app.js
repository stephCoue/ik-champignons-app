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

		changePage: function(type, id) {

			if( $(id).length > 0 ) {
				this.transition(id);
			} else {
				this.createPage(type);
			}

		},

		transition: function(id) {
			$.mobile.changePage(id, {
				changeHash: false,
				role: "page",
				transition: this.sens,
				reverse: this.reverse
			});
		},

		createPage: function(type) {

			var self = this;

			require(["views/" + type], function(Page){

				var page = new Page();
				$(self.el).append($(page.el));

				if(!self.firstPageAdded) {
					$.mobile.initializePage();
					self.firstPageAdded = true;
				}

				self.transition( $("#" + page.id) );
			});
		}
	});

	return AppView;

});