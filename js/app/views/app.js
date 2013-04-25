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

			// Les subviews
			this.pageHome = new PageHome();
			this.pageTous = null;

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
			var nextModel = this.pageTous.collection.getNext();
			if(nextModel !== null) {
				this.nextView = new PageChampignon({model: nextModel});
				this.showNext(true);
			} else {
				return;
			}
		},

		onPagePrev: function(event){
			var nextModel = this.pageTous.collection.getPrev();
			if(nextModel !== null) {
				this.nextView = new PageChampignon({model: nextModel});
				this.showNext(false);
			} else {
				return;
			}
		},

		showNext: function(toleft){

			this.currentView.$el.one("webkitTransitionEnd", {self:this}, this.clearView);

			if(toleft) {
				this.currentView.$el.addClass("toright");
				this.nextView.$el.show().addClass("toleft").appendTo(this.$content);
			} else {
				this.currentView.$el.addClass("toleft");
				this.nextView.$el.show().addClass("toright").appendTo(this.$content);
			}
		},

		clearView: function(event){

			var self = event.data.self;
			self.nextView.$el.removeClass("toleft toright");

			if(self.currentView.$el.hasClass("page-champignon"))
				self.currentView.remove();
			else
				self.currentView.$el.hide();
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

			switch(options.page){
				case "home":
					this.nextView = this.pageHome;
					this.$footer.find("li").removeClass("on");
					this.showNav = false;
					this.showHeader = false;
					break;
				case "tous":
					if(this.pageTous === null) {
						this.pageTous = new PageTous({settings:this.app.settings});
						this.nextView = this.pageTous;
					} else {
						this.nextView = this.pageTous;
					}
					this.champignonsCollection = this.pageTous.collection;
					this.$footer.find(".tous").addClass("on").siblings().removeClass("on");
					this.showNav = true;
					this.showHeader = true;
					break;
				case "champignon":
					console.log(this.pageTous.collection);
					this.nextView = new PageChampignon({model: this.pageTous.collection.current});
					this.showNav = true;
					this.showHeader = true;
					break;
			}

			if(this.currentView.id === this.nextView.id)
				return;
			else
				this.showNext( this.nextView.level >= this.currentView.level );
		},

		onTransitionEnd: function(event) {
			console.log(event.currentTarget.id + " a fini la transition");
		},

		render: function() {

			this.$el.height( $(window).height() );

			this.$content.append(this.pageHome.$el);
			this.currentView = this.pageHome;

			this.$el.transition({opacity: 100});

			return this;
		}

	});

	return AppView;

});