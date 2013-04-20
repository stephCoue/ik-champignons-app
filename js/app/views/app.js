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
			this.showHeader = false;

			// touchevents
			this.click = new FastClick(document.body);

			// On affiche
			this.render();

		},

		events: {
			"swipeleft .page-champignon": "onPageNext",
			"swiperight .page-champignon": "onPagePrev"
		},

		onPageNext: function(event){
			var nextModel = this.app.champignons.getNext();
			if(nextModel !== null) {
				this.nextView = new PageChampignon({model: nextModel});
				this.showNext(true);
			} else {
				return;
			}
		},

		onPagePrev: function(event){
			var nextModel = this.app.champignons.getPrev();
			if(nextModel !== null) {
				this.nextView = new PageChampignon({model: nextModel});
				this.showNext(false);
			} else {
				return;
			}
		},

		showNext: function(toleft){
			this.currentView.$el.one("transitionend webkitTransitionEnd", {self:this}, this.clearView);
			if(toleft) {
				this.currentView.$el.addClass("toright");
				this.nextView.$el.addClass("toleft").appendTo(this.$content);
			} else {
				this.currentView.$el.addClass("toleft");
				this.nextView.$el.addClass("toright").appendTo(this.$content);
			}
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

			if(self.showHeader) {
				if(self.currentView.$el.hasClass("page-tous")) {
					self.$header.addClass("header-tous header-on").removeClass("header-champignons");
				} else if(self.currentView.$el.hasClass("page-champignon")) {
					self.$header.addClass("header-champignons header-on").removeClass("header-tous");
				}
			} else {
				self.$header.removeClass("header-on header-tous header-champignons");
			}
		},

		swapView: function(options) {

			switch(options.id){
				case "home":
				this.nextView = new PageHome();
				this.showNav = false;
				this.showHeader = false;
				break;
				case "tous":
				this.nextView = new PageTous({collection:options.collection, settings:this.app.settings});
				this.showNav = true;
				this.showHeader = true;
				break;
				case "champignon":
				this.nextView = new PageChampignon({model: options.model});
				this.showNav = true;
				this.showHeader = true;
				break;
			}

			if(this.currentView.id === this.nextView.id) return;

			this.showNext( this.nextView.level >= this.currentView.level );
		},

		onTransitionEnd: function(event) {
			console.log(event.currentTarget.id + " a fini la transition");
		},

		render: function() {

			this.$el.height( $(window).height() );

			this.$content.append(this.homeView.$el);
			this.currentView = this.homeView;

			this.$el.transition({opacity: 100});

			return this;
		}

	});

	return AppView;

});