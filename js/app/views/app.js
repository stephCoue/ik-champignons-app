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

		changePage: function(page) {

			// cleanage si élément déjà créé
			if( $("#" + page.id).length >= 0 )
				$("#" + page.id).detach();

			// Ajout de la page dans le DOM
			$(this.el).append($(page.el));

			if(!this.firstPageAdded) {
				$.mobile.initializePage();
				this.firstPageAdded = true;
			} else {
				$("#" + page.id).page();
				$.mobile.changePage("#" + page.id, {
					changeHash: false,
					role: "page"
				});
			}
		}
	});

	return AppView;

});