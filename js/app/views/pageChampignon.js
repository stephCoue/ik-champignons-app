define([
	"jquery",
	"underscore",
	"backbone",
	"models/champignon",
	"views/ficheChampignon",
	"mixins/pageMixin"
], function($, _, Backbone, Champignon, Fiche, PageMixin){

	var PageChampignon = Backbone.View.extend({

		el: $("#champignon"),

		initialize: function(options) {
			this.$el.hide();

			this.collection = options.currentSubset; // Le data provider
			this.champignons = []; // Les modèles en cours (3 max)
			this.fiches = []; // La liste des fiches (3 max)

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
			this.collection.current = this.collection.findWhere({id:champignon.id});

			// Initialisation du tableau des champignons du slider
			this.champignons = [];
			this.champignons.length = 0;

			if(this.collection.models.length > 3){

				var startIdx = 0;

				if(_.indexOf(this.collection.models, this.collection.current) === 0){
					startIdx = 0;
					// this.champignons.push( new Champignon(_.clone(this.collection.at(0).attributes )) );
					// this.champignons.push( new Champignon(_.clone(this.collection.at(1).attributes )) );
					// this.champignons.push( new Champignon(_.clone(this.collection.at(2).attributes )) );
					this.currentFiche = 0;
				} else if(_.indexOf(this.collection.models, this.collection.current) === this.collection.models.length - 1){
					startIdx = this.collection.indexOf(this.collection.at( this.collection.models.length - 3 ));
					// this.champignons.push( new Champignon(_.clone( this.collection.at( this.collection.models.length - 3 ).attributes )) );
					// this.champignons.push( new Champignon(_.clone(this.collection.at( this.collection.models.length - 2 ).attributes )) );
					// this.champignons.push( new Champignon(_.clone(this.collection.at( this.collection.models.length - 1 ).attributes )) );
					this.currentFiche = 2;
				} else {
					startIdx = this.collection.indexOf(this.collection.current) - 1;
					// this.champignons.push( new Champignon( _.clone( this.collection.at(this.collection.indexOf(this.collection.current) - 1).attributes ) ) );
					// this.champignons.push( new Champignon(_.clone( this.collection.at(this.collection.indexOf(this.collection.current)).attributes ) ) );
					// this.champignons.push( new Champignon( _.clone( this.collection.at(this.collection.indexOf(this.collection.current) + 1).attributes ) ) );
					this.currentFiche = 1;
				}

				for (var i=startIdx; i < startIdx + 3; i++) {
					this.champignons.push( new Champignon( _.clone(this.collection.at(i).attributes) ) );
				}

			} else {
				this.champignons = this.collection.models;
				this.currentFiche = _.indexOf(this.collection.models, champignon);
			}

			this.render();
		},

		onTransitionEnd: function(event){
			if(this.champignons.length > 1)
				this.onChampignon(this.champignons[this.currentFiche]);
		},

		updateFiches: function(){

			this.fiches[1].model.set( this.champignons[1].toJSON() );
			this.gotoPage(this.currentFiche + 1);

			this.fiches[0].model.set( this.champignons[0].toJSON() );

			if(this.champignons.length > 2){
				this.fiches[2].model.set( this.champignons[2].toJSON() );
			}
		},

		gotoPage: function(page){

			var xpos = 0;

			if(page === 2) xpos = -$(window).width();
			if(page === 3) xpos = -($(window).width() * 2);

			// Mise à jour des images 
			// _.each(this.fiches, function(fiche){
			// 	if(_.indexOf(this.fiches, fiche) === this.currentFiche) fiche.renderImage();
			// 	else fiche.removeImage();
			// }, this);

			this.$slides.css({
				"-webkit-transition-duration": "0",
				"-webkit-transform": "translate3d(" + xpos + "px, 0px, 0px)"
			});

		},

		render: function() {

			if(this.$slides.children().length === 0){ // Si c'est la première fois

				// Mise à jour de la largeur du slider
				this.$slides.width($(window).width() * this.champignons.length);

				// ajout des nouvelles fiches dans le slider
				_.each(this.champignons, function(champignon, i){
					this.fiches[i] = new Fiche({model:champignon});
					this.$slides.append(this.fiches[i].$el);
				}, this);

				// Application du décalage en css
				this.gotoPage(this.currentFiche + 1);

			} else {

				this.updateFiches();

			}

			return this;
		}

	});

	_.extend(PageChampignon.prototype, PageMixin);

	return PageChampignon;

});