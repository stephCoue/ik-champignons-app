define([
	"jquery",
	"underscore",
	"backbone",
	"fastclick",
	"transit",
	"views/pageHome",
	"views/pageTous"
],
function($, _, Backbone, fastclick, transit, PageHome, PageTous){

	var AppView = Backbone.View.extend({

		el: $("#app-container"),

		initialize: function(){
			// on masque le div au début
			this.$el.css("opacity", "0");

			// gestion des vues
			this.currentView = null;
			this.prevView = null;
			this.nextView = null,

			// Les vues
			this.homeView = new PageHome();

			// touchevents
			this.click = new FastClick(document.body);

			// On affiche
			this.render();
		},

		swapView: function(next) {

			switch(next){
				case "home":
				this.nextView = new PageHome();
				break;
				case "tous":
				this.nextView = new PageTous();
				break;
			}

			if(this.currentView.id === this.nextView.id) {
				return;
			}

			var self = this;

			if(this.nextView.level > this.currentView.level){
				this.$el.find("#content").append(this.nextView.$el.css("left", "100%"));
				this.currentView.$el.transition({left:"-100%"});
			} else {
				this.$el.find("#content").append(this.nextView.$el.css("left", "-100%"));
				this.currentView.$el.transition({left:"100%"});
			}

			this.nextView.$el.transition({left:0}, function(){
				self.currentView.remove();
				self.currentView = self.nextView;
				self.nextView = null;
			});
		},

		render: function() {

			this.$el.height( $(window).height() );
			this.$el.find("#content").append(this.homeView.$el);
			this.currentView = this.homeView;

			this.$el.transition({opacity: 100});

			return this;
		}

	});

	return AppView;

});