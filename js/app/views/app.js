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
			"click a": "onAction",
			"click #backbutton": "onBackButton"
		},

		onAction: function(event) {
			this.sens = $(event.currentTarget).attr("data-transition");

			if( $(event.currentTarget).attr("data-direction") !== undefined )
				this.reverse = true;
			else
				this.reverse = false;
		},

		onBackButton: function(event) {
			history.go(-1);
			return false;
		},

		changePage: function(page) {

			// Suppression d'un éventuel doublon
			if($("#" + page.id).length > 0)
				$("#" + page.id).detach();

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