define([
	"jquery",
	"underscore",
	"backbone",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		id: "tous",
		className: "page page-tous",
		template: _.template(pageTousTemplate),

		initialize: function(options) {
			this.level = 1;
			this.liststyle = options.liststyle;
			this.order = options.sortkey;

			Backbone.on("onGrille", this.onGrille, this);
			Backbone.on("onListe", this.onListe, this);

			this.render();
		},

		events: {
			"click .filtres a": "onFiltre",
			"touchstart .filtres a": "onFiltre",
			"keyup": "search",
			"click .search a": "clearSearch"
		},

		onFiltre: function(event){
			event.preventDefault();
			this.order = $(event.currentTarget).attr("href");
			Backbone.trigger("filter", this.order);
			this.collection.filtrerPar( this.order );
			this.render();
		},

		search: function(event){
			var searchString = $(".search input").val().toLowerCase();
			if(searchString.length > 0)
				this.$el.find(".search a").fadeIn(100);
			else
				this.$el.find(".search a").fadeOut(100);

			this.listView.collection = new Backbone.Collection(this.collection.rechercher(searchString));
			this.listView.render();
		},

		clearSearch: function(event){
			event.preventDefault();
			$(".search input").val('');
			this.$el.find(".search a").fadeOut(100);
			this.listView.collection = this.collection;
			this.listView.render();
		},

		onGrille: function(){
			this.liststyle = "grille";
			this.$el.find("#list-view").removeClass("grille liste").addClass("grille");
		},

		onListe: function(){
			this.liststyle = "liste";
			this.$el.find("#list-view").removeClass("grille liste").addClass("liste");
		},

		render: function(){
			this.$el.empty();
			this.listView = new ChampignonsListView({collection:this.collection});
			this.$el.html(this.template());

			this.$el.find("#list-view")
			.removeClass("grille liste")
			.addClass(this.liststyle)
			.append(this.listView.$el);

			this.$el.find("#" + this.order).parent().addClass("on").siblings().removeClass("on");

			return this;
		}
	});

	return PageTous;

});