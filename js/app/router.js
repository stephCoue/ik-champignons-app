define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"views/criteres"
	], function($, _, Backbone, ChampignonsListView, CriteresListView){

		var AppRouter = Backbone.Router.extend({
			initialize: function(){

				// Configuration de jquery mobile
				$( "#splash" ).fixedtoolbar({ tapToggle: false });

				this.champignonsListView = new ChampignonsListView();
				this.criteresListView = new CriteresListView();
				console.log("Router initialize");
			},

			routes: {
				"":"splash",
				"home": "home",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			},

			splash: function(){
				console.log("Splashscreen !");
			},

			home: function() {
				console.log("route toHome !");
				$.mobile.changePage( "#home" , { reverse: false, changeHash: false } );
			},

			filterList: function(id) {
				this.criteresListView.update(id);

				if(id === '0') {
					this.champignonsListView.collection.selection(0);
				} else {
					var champignons = this.criteresListView.collection.getChampignons(id);
					this.champignonsListView.collection.selection(champignons);
				}
			},

			getChampignon: function(id) {
				console.log("route champignon id = ", id);
			},

			toDefault: function(){
				console.log("route inconnue !");
			}
		});

		var initialize = function() {
			var app_router = new AppRouter();
			Backbone.history.start();
		};

		return {
			initialize: initialize
		};

});