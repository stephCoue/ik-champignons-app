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
			this.sliderOffset = 0;
			this.$slides = this.$el.find("#slides");
			this.$slides.swipe({
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
			if(this.champignons.length > 1)
				this.sliderOffset = $(window).width() * this.currentFiche;
			else
				this.sliderOffset = 0;

			switch(phase){
				case "move":
					if ( (direction === "left" || direction === "right") && this.swipable){
						if(direction === "left" && distance > 30)
							this.scrollFiche( this.sliderOffset + distance, 0 );
						else if(direction === "right" && distance > 30)
							this.scrollFiche( this.sliderOffset - distance, 0 );
					} else if(direction === "up" || direction === "down"){
						if(distance > 30)
							this.swipable = false;
					}
					break;
				case "cancel":
					this.scrollFiche( this.sliderOffset, this.speed );
					break;
				case "end":
					if( (distance > $(window).width() / 3) && this.swipable ){
						if(direction == "left")
							this.nextFiche();
						else if(direction == "right")
							this.prevFiche();
						else
							this.scrollFiche( this.sliderOffset, this.speed );
					} else {
						this.scrollFiche( this.sliderOffset, this.speed );
					}
					this.swipable = true;
					break;
			}
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

			this.render();
		},

		onTransitionEnd: function(event){
			if(this.champignons.length > 1)
				this.onChampignon(this.champignons[this.currentFiche]);
		},

		renderNext: function(){
			// Suppression du premier enfant
			this.$slides.find(".slide:first-child").remove();
			// Ajout du dernier nouvel enfant
			this.$slides.append( new Fiche({model:this.champignons[2]}).render().$el );
			// Ajout du premier nouvel enfant
			if(this.$slides.children().length < 3)
				this.$slides.prepend( new Fiche({model:this.champignons[0]}).render().$el );
			// repositionnelent du slider
			this.$slides.css({
				"-webkit-transition-duration": "0",
				"-webkit-transform": "translate3d(-" + $(window).width() + "px, 0px, 0px)"
			});
		},

		renderPrev: function(){
			// Suppression du dernier enfant
			this.$slides.find(".slide:last-child").remove();
			// Ajout du premier nouvel enfant
			this.$slides.prepend( new Fiche({model:this.champignons[0]}).render().$el );
			// Ajout du dernier enfant
			if(this.$slides.children().length < 3)
				this.$slides.append( new Fiche({model:this.champignons[2]}).render().$el );
			// repositionnelent du slider
			this.$slides.css({
				"-webkit-transition-duration": "0",
				"-webkit-transform": "translate3d(-" + $(window).width() + "px, 0px, 0px)"
			});
		},

		render: function() {
			// Mise à jour de la largeur du slider
			this.$slides.width($(window).width() * this.champignons.length);

			if(this.$slides.children().length === 0){ // Si c'est la première fois

				// ajout des nouvelles fiches dans le slider
				_.each(this.champignons, function(champignon){
					var fiche = new Fiche({model:champignon}).render();
					this.$slides.append(fiche.$el);
				}, this);

				// Application du décalage en css
				if (this.champignons.length > 1)
					this.sliderOffset = $(window).width() * this.currentFiche;
				else
					this.sliderOffset = 0;

				this.$slides.css({
					"-webkit-transition-duration": "0",
					"-webkit-transform": "translate3d(-" + this.sliderOffset + "px, 0px, 0px)"
				});

			} else { // Si pas la première fois

				if(this.champignons.length < 3){ // On est au début ou à la fin
					if(this.currentFiche === 0){ // on est au début
						if(this.$slides.position().left < 0)
							this.renderPrev();
					} else if(this.currentFiche === 1){ // On est à la fin
						if(this.$slides.children().length === 3){
							this.$slides.find(".slide:first-child").remove();
							this.$slides.css({
								"-webkit-transition-duration": "0",
								"-webkit-transform": "translate3d(-" + $(window).width() + "px, 0px, 0px)"
							});
						}
					}
				} else { // on est au milieu
					if(this.$slides.position().left < -$(window).width()){ // on a fait next
						this.renderNext();
					} else if(this.$slides.children().length === 3 && this.$slides.position().left === 0){ // on a fait prev
						this.renderPrev();
					} else if(this.$slides.children().length === 2 && this.$slides.position().left === -$(window).width()){
						this.renderNext();
					} else if(this.$slides.children().length === 2 && this.$slides.position().left === 0){
						this.renderPrev();
					}
				}

			}

			this.$slides.width($(window).width() * this.$slides.children().length);

			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});