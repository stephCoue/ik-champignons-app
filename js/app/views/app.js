define([
	"jquery",
	"underscore",
	"backbone",
	"jqmtouch",
	"fastclick",
	"transit",
	"views/pageHome",
	"views/pageTous",
	"views/pageChampignon"
],
function($, _, Backbone, touch, fastclick, transit, PageHome, PageTous, PageChampignon){

	var AppView = Backbone.View.extend({

		el: $("#app-container"),

		initialize: function(options){
			// référence vers l'application
			this.app = options.app;

			// références vers les blocs de vue
			this.$content = this.$el.find("#content");
			this.$header = this.$el.find("#header");
			this.$footer = this.$el.find("#footer");

			// écouteurs sur les transitions
			this.$footer.on("transitionend", this.onTransitionEnd);

			// on masque le div au début
			this.$el.css("opacity", "0");

			// gestion des vues
			this.currentView = null;
			this.nextView = null,

			// La vue par défaut
			this.homeView = new PageHome();

			// état des barres de nav
			this.showNav = false;

			// touchevents
			this.click = new FastClick(document.body);

			// On affiche
			this.render();

		},

		events: {
			"swipeleft .page": "onPageNext",
			"swiperight .page": "onPagePrev"
		},

		onPageNext: function(event){
			this.nextView = new PageChampignon({model: this.app.champignons.getNext()});
			this.showNext(true);
		},

		onPagePrev: function(event){
			this.nextView = new PageChampignon({model: this.app.champignons.getPrev()});
			this.showNext(false);
		},

		showNext: function(toleft){
			this.currentView.$el.one("transitionend", {self:this}, this.clearView);
			if(toleft) {
				this.currentView.$el.addClass("toright");
				this.nextView.$el.addClass("toleft").appendTo(this.$content);
			} else {
				this.currentView.$el.addClass("toleft");
				this.nextView.$el.addClass("toright").appendTo(this.$content);
			}

			//this.nextView.$el.removeClass("toleft toright");
		},

		clearView: function(event){

			var self = event.data.self;
			self.nextView.$el.removeClass("toleft toright");

			self.currentView.remove();
			self.currentView = self.nextView;
			self.nextView = null;
			if(self.showNav)
				self.$footer.addClass("footer-on");
			else
				self.$footer.removeClass("footer-on");
		},

		swapView: function(options) {

			switch(options.id){
				case "home":
				this.nextView = new PageHome();
				this.showNav = false;
				break;
				case "tous":
				this.nextView = new PageTous({collection:options.collection});
				this.showNav = true;
				break;
				case "champignon":
				this.nextView = new PageChampignon({model: options.model});
				this.showNav = true;
				break;
			}

			if(this.currentView.id === this.nextView.id) {
				return;
			}

			var self = this;

			if(this.nextView.level >= this.currentView.level){
				this.showNext(true);
			} else {
				this.showNext(false);
			}

		},

		onTransitionEnd: function(event) {
			console.log(event.currentTarget.id + " a fini la transition");
		},

		render: function() {

			this.$el.height( $(window).height() );
			//this.$header.css("top", "-" + this.$header.height() + "px");
			//this.$footer.css("bottom", "-" + this.$footer.height() + "px");

			this.$content.append(this.homeView.$el);
			this.currentView = this.homeView;

			this.$el.transition({opacity: 100});

			return this;
		}

	});

	return AppView;

});