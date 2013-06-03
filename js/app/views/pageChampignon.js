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
			this.currentFiche = 1;
			this.swipable = true;
			this.speed = 300;
			this.$el.find("#slides").swipe({
				triggerOnTouchEnd: true,
				allowPageScroll:"vertical",
				swipeStatus: function(){}
			});
			Backbone.on("onChampignon", this.onChampignon, this);
		},

		events: {
			"swipeStatus #slides": "onSwipeStatus",
			"webkitTransitionEnd #slides": "onTransitionEnd"
		},

		onSwipeStatus: function(event, phase, direction, distance, fingers){
			console.log(this.swipable, direction);
			switch(phase){
				case "move":
					if ( (direction === "left" || direction === "right") && this.swipable){
						if(direction === "left" && distance > 30)
							this.scrollFiche( $(window).width() * this.currentFiche + distance, 0 );
						else if(direction === "right" && distance > 30)
							this.scrollFiche( $(window).width() * this.currentFiche - distance, 0 );
					} else if(direction === "up" || direction === "down"){
						if(distance > 30)
							this.swipable = false;
					} else {
						//this.swipable = true;
						//this.scrollFiche($(window).width() * this.currentFiche, 0);
					}
					break;
				case "cancel":
					//this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
					break;
				case "end":
					if( (distance > $(window).width() / 3) && this.swipable ){
						if(direction == "left")
							this.nextFiche();
						else if(direction == "right")
							this.prevFiche();
						else
							this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
					} else {
						this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
					}
					this.swipable = true;
					break;
			}
		},

		onTransitionEnd: function(event){
			this.onChampignon(this.champignons[this.currentFiche]);
		},

		scrollFiche: function(distance, duration){
			var $slides = this.$el.find("#slides");
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
			var $slides = this.$el.find("#slides");
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