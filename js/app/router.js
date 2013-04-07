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
				"":"splash",
				"home": "home",
				"tous": "tous",
				"determiner": "determiner",
				"mycologie": "mycologie",
				"infos": "infos",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			},

			splash: function(){
				console.log("Router : Splashscreen !");
			},

			home: function() {
				console.log("Router: Home");
				$.mobile.changePage( "#home" , { transition:"slidedown", reverse: false, changeHash: false } );
			},

			tous: function(){
				console.log("Router : Tous les champignons");
				$.mobile.changePage( "#tous" , { transition:"slide", reverse: false, changeHash: false } );
			},

			determiner: function(){
				console.log("Router : Déterminer");
				$.mobile.changePage( "#determiner" , { transition:"slide", reverse: false, changeHash: false } );
			},

			mycologie: function(){
				console.log("Router : Mycologie");
				$.mobile.changePage( "#mycologie" , { transition:"slide", reverse: false, changeHash: false } );
			},

			infos: function(){
				console.log("Router : Infos");
				$.mobile.changePage( "#infos" , { transition:"slide", reverse: false, changeHash: false } );
			},

			cueillette: function() {
				console.log("Router : Cueillette");
				$.mobile.changePage( "#cueillette" , { transition:"slide", reverse: false, changeHash: false } );
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