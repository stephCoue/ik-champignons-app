define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"views/criteres"
	], function($, _, Backbone, ChampignonsListView, CriteresListView){

		var AppRouter = Backbone.Router.extend({
			initialize: function(){
				this.champignonsListView = new ChampignonsListView();
				this.criteresListView = new CriteresListView();
				console.log("Router initialize");
			},

			routes: {
				"": "toHome",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			},

			toHome: function() {
				console.log("route toHome !");
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