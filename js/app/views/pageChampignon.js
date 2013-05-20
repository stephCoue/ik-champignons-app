define([
	"jquery",
	"underscore",
	"backbone",
	"views/ficheChampignon",
	"mixins/pageMixin"
], function($, _, Backbone, Fiche, PageMixin){

	var PageChampignon = Backbone.View.extend({

		el: $("#champignon"),

		initialize: function() {
			this.$el.hide();
			this.slides = $("#slides");
			this.currentFiche = 1;
			this.speed = 300;
			this.slides.swipe({
				triggerOnTouchEnd: true,
				swipeStatus: function(){}
			});
			Backbone.on("onChampignon", this.onChampignon, this);
		},

		events: {
			"swipeStatus #slides": "onSwipeStatus",
			"webkitTransitionEnd #slides": "onTransitionEnd"
		},

		onSwipeStatus: function(event, phase, direction, distance, fingers){
			if(phase == "move" && (direction == "left" || direction == "right") ){
				var duration = 0;
				if(direction == "left" && distance > 50)
					this.scrollFiche( $(window).width() * this.currentFiche + distance, duration );
				else if(direction == "right" && distance > 50)
					this.scrollFiche( $(window).width() * this.currentFiche - distance, duration );
			}
			else if(phase == "cancel")
				this.scrollFiche( $(window).width() * this.currentFiche - distance, this.speed );
			else if(phase == "end") {
				if(distance > $(window).width() / 4){
					if(direction == "left")
						this.nextFiche();
					else if(direction == "right")
						this.prevFiche();
				} else {
					this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
				}
			}
		},

		onTransitionEnd: function(event){
			this.onChampignon(this.champignons[this.currentFiche]);
		},

		scrollFiche: function(distance, duration){
			var $slides = this.$el.find(".slides");
			var delta = (distance<0 ? "" : "-") + Math.abs(distance).toString();
			$slides.css("-webkit-transition-duration", (duration/1000).toFixed(1) + "s");
			$slides.css("-webkit-transform", "translate3d(" + delta + "px,0px,0px)");
		},

		prevFiche: function(){
			this.currentFiche = Math.max(this.currentFiche - 1, 0);
			this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
		},

		nextFiche: function(){
			this.currentFiche = Math.min(this.currentFiche + 1, this.champignons.length - 1);
			this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
		},

		onChampignon: function(champignon){
			// Mise à jour de la sélection dans la collection
			champignon.collection.current = champignon;

			// Initialisation du tableau des champignons du slider
			this.champignons = [];

			// Remplissage du tableau
			if(champignon.collection.getPrev())
				this.champignons.push(champignon.collection.getPrev());
			this.champignons.push(champignon);
			if(champignon.collection.getNext())
				this.champignons.push(champignon.collection.getNext());

			// Mise à jour de l'index du slider
			if(champignon.collection.indexOf(champignon) === champignon.collection.length - 1){
				this.currentFiche = 1;
			} else {
				this.currentFiche = this.champignons.length - 2;
			}

			// rendu du slider
			this.render();
		},

		render: function() {
			var $slides = this.$el.find(".slides");
			$slides.empty();
			$slides.width($(window).width() * this.champignons.length);
			_.each(this.champignons, function(champignon){
				var fiche = new Fiche({model:champignon}).render();
				$slides.append(fiche.$el);
			});

			var offset = $(window).width() * this.currentFiche;

			$slides.css({
				"-webkit-transform": "translate3d(-" + offset + "px, 0px, 0px)",
				"-webkit-transition-duration": "0"
			});

			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});