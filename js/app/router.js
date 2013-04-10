define([
	"jquery",
	"underscore",
	"backbone",
	"views/pageHome",
	"views/champignons",
	"views/criteres"
	], function($, _, Backbone, pageHomeView, ChampignonsListView, CriteresListView){

		var AppRouter = Backbone.Router.extend({
			initialize: function(){
				this.champignonsListView = new ChampignonsListView();
				this.criteresListView = new CriteresListView();
				console.log("Router initialize");
			},

			routes: {
				"":"home",
				"tous": "tous",
				"determiner": "determiner",
				"mycologie": "mycologie",
				"infos": "infos",
				"critere/:cid": "filterList",
				"champignon/:id": "getChampignon",
				"*actions": "toDefault"
			},

			home: function() {
				console.log("Router: Home");
				this.changePage(new pageHomeView(), "#home", "fade");
			},

			tous: function(){
				console.log("Router : Tous les champignons");
				$.mobile.changePage( "#tous" , { changeHash: false } );
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

			getChampignon: function(id) {
				console.log("route champignon id = ", id);
			},

			toDefault: function(){
				console.log("route inconnue ! retour au splashscreen");
				$.mobile.changePage( "#splash" , { transition:"fade", reverse: true, changeHash: false } );
			},

			changePage: function(page, id, transition) {
				$('#app').append($(page.el));
				$.mobile.initializePage();
				$.mobile.changePage(id, {changeHash:false, transition: transition});
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