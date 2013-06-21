define([
	"jquery",
	"underscore",
	"backbone",
	"touchswipe",
	"fastclick",
	"views/header",
	"views/footer",
	"views/pageHome",
	"views/pageTous",
	"views/pageChampignon",
	"views/pageDeterminer",
	"views/pageCueillette",
	"views/popupTermeGlossaire"
],
function($, _, Backbone, touchswipe, fastclick, Header, Footer, PageHome, PageTous, PageChampignon, PageDeterminer, PageCueillette, PopupTermeGlossaire){

	var AppView = Backbone.View.extend({

		el: $("#app-container"),

		initialize: function(options){
			// Pages
			this.pageHome = new PageHome();
			this.pageTous = new PageTous(options);
			this.pageChampignon = new PageChampignon(options);
			this.pageDeterminer = new PageDeterminer(options);
			this.pageCueillette = new PageCueillette(options);
			this.popupTermeGlossaire = new PopupTermeGlossaire();

			// Barres
			this.header = new Header();
			this.footer = new Footer();

			// Référence vers la page actuellement affichée
			this.currentPage = this.pageHome;

			// Référence vers la prochaine page
			this.nextPage = null;

			// on masque le div au début
			this.$el.css("opacity", "0");

			// touchevents
			this.click = new FastClick(document.body);

			// On affiche
			this.render();

		},

		showPage: function(options){
			this.popupTermeGlossaire.close();
			switch(options.page){
				case "home":
					this.nextPage = this.pageHome;
					this.header.hide();
					this.footer.hide();
					break;
				case "tous":
					this.nextPage = this.pageTous;
					this.header.show("tous");
					this.footer.show("tous");
					break;
				case "champignon":
					this.nextPage = this.pageChampignon;
					this.header.show("champignon");
					break;
				case "determiner":
					this.nextPage = this.pageDeterminer;
					this.header.show("determiner");
					this.footer.show("determiner");
					break;
				case "cueillette":
					this.nextPage = this.pageCueillette;
					this.header.show("cueillette");
					this.footer.show("cueillette");
			}

			if(this.currentPage !== this.nextPage){
				var isToleft = this.nextPage.$el.index() > this.currentPage.$el.index();
				this.currentPage.pageClose( isToleft );
				this.nextPage.pageOpen( isToleft );
				this.currentPage = this.nextPage;
				this.nextPage = null;
			}
		},

		render: function() {

			// On met le div conteneur de l'app à la taille de la fenêtre
			this.$el.height( $(window).height() );

			// On affiche avec un petit fade pour la classe ;-)
			this.$el.css({opacity: 1});

			// on renvoie la vue pour le chaining
			return this;
		}

	});

	return AppView;

});