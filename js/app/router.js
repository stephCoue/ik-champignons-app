define([
	"jquery",
	"underscore",
	"backbone",
	"collections/champignons",
	"views/app",
	"views/pageHome",
	"views/pageTous",
	"views/pageChampignon"
	], function($, _, Backbone, ChampignonsCollection, AppView, PageHomeView, PageTousView, PageChampignonView){

		var AppRouter = Backbone.Router.extend({
			initialize: function(){
				this.champignons = new ChampignonsCollection();
				this.appView = new AppView();
				this.homeView = new PageHomeView();
				this.tousView = new PageTousView({collection:this.champignons});
				console.log("Router initialize");
			},

			routes: {
				"":"home",
				"home":"home",
				"tous": "tous",
				"tous/:id":"getChampignon",
				"determiner": "determiner",
				"mycologie": "mycologie",
				"infos": "infos",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			},

			home: function() {
				console.log("Router: Home");
				this.appView.changePage(this.homeView);
			},

			tous: function(){
				console.log("Router : Tous les champignons");
				this.appView.changePage(this.tousView);
			},

			getChampignon: function(id) {
				console.log("route champignon id = ", id);
				var pageChampignon = new PageChampignonView({model:this.champignons.getOne(id)});
				this.appView.changePage(pageChampignon);
			},

			determiner: function(){
				console.log("Router : Déterminer");
				$.mobile.changePage( "#determiner" , { changeHash: false } );
			},

			mycologie: function(){
				console.log("Router : Mycologie");
				$.mobile.changePage( "#mycologie" , { changeHash: false } );
			},

			infos: function(){
				console.log("Router : Infos");
				$.mobile.changePage( "#infos" , { changeHash: false } );
			},

			cueillette: function() {
				console.log("Router : Cueillette");
				$.mobile.changePage( "#cueillette" , { changeHash: false } );
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

			toDefault: function(){
				console.log("route inconnue ! retour au splashscreen");
				$.mobile.changePage( "#home" , { transition:"fade", reverse: true, changeHash: false } );
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