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
					}
					break;
				case "cancel":
					this.scrollFiche( $(window).width() * this.currentFiche, this.speed );
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

			console.log("######\n" + "this.currentFiche = ", this.currentFiche);
			if(this.currentFiche === 2 && champignon.collection.indexOf(champignon) < champignon.collection.length - 1)
				this.renderNext();
			else if(this.currentFiche === 0 && champignon.collection.indexOf(champignon) > 1)
				this.renderPrev();
			else
				this.render();

			// Mise à jour de l'index du slider
			if(champignon.collection.indexOf(champignon) === champignon.collection.length - 1){
				this.currentFiche = 1;
			} else {
				this.currentFiche = this.champignons.length - 2;
			}

			console.log("this.currentFiche = ", this.currentFiche);
		},

		onTransitionEnd: function(){
			this.onChampignon(this.champignons[this.currentFiche]);
		},

		renderNext: function(){
			console.log("renderNext");
			// Suppression du premier enfant
			this.$slides.find(".slide:first-child").remove();
			// Ajout du dernier nouvel enfant
			this.$slides.append( new Fiche({model:this.champignons[2]}).render().$el );
			// repositionnelent du slider
			this.$slides.css({
				"-webkit-transform": "translate3d(-" + $(window).width() + "px, 0px, 0px)",
				"-webkit-transition-duration": "0"
			});
		},

		renderPrev: function(){
			console.log("renderPrev");
			// Suppression du dernier enfant
			this.$slides.find(".slide:last-child").remove();
			// Ajout du premier nouvel enfant
			this.$slides.prepend( new Fiche({model:this.champignons[0]}).render().$el );
			// repositionnelent du slider
			this.$slides.css({
				"-webkit-transform": "translate3d(-" + $(window).width() + "px, 0px, 0px)",
				"-webkit-transition-duration": "0"
			});
		},

		render: function() {
			console.log("render");
			console.log("collection length ", this.champignons.length);
			if(this.champignons.length < 3){
				// on est soit eu début ou à la fin de la liste
				console.log("On est au bout ! ", this.champignons.length);
			}

			// Mise à jour du slider
			this.$slides.empty().width($(window).width() * this.champignons.length);

			// ajout des nouvelles fiches dans le slider
			_.each(this.champignons, function(champignon){
				var fiche = new Fiche({model:champignon}).render();
				this.$slides.append(fiche.$el);
			}, this);

			// Application du décalage en css
			this.$slides.css({
				"-webkit-transform": "translate3d(-" + $(window).width() * (this.champignons.length - 2) + "px, 0px, 0px)",
				"-webkit-transition-duration": "0"
			});

			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});