define([
	"jquery",
	"underscore",
	"backbone",
	"mixins/pageMixin",
	"views/champignons",
	"text!templates/pageTous.html"
], function($, _, Backbone, PageMixin, ChampignonsListView, pageTousTemplate){

	var PageTous = Backbone.View.extend({

		el: $("#tous"),
		template: _.template(pageTousTemplate),

		initialize: function(options) {

			// Liste de tous les champignons
			this.dataProvider = options.champignonsProvider;

			// Création de la vue de la liste des champignons
			this.listView = new ChampignonsListView({collection: options.tousSubset});
			this.listView.collection.reset(this.dataProvider.models);

			// On se cache au départ !
			this.$el.hide();

			// On rend le template
			this.render();
		},

		events: {
			"click .filtres a": "onFiltre",
			"keyup": "search",
			"click .search a": "clearSearch"
		},

		onFiltre: function(event){
			event.preventDefault();

			// mise à jour de la vue liste
			this.listView.sortCollection( $(event.currentTarget).attr("href") );

			// Mise à jour de l'état des boutons
			$(event.currentTarget).parent().addClass("on").siblings().removeClass("on");
		},

		search: function(event){
			var searchString = $(".search input").val().toLowerCase();

			if(searchString.length > 0)
				this.$el.find(".search a").fadeIn(100);
			else
				this.$el.find(".search a").fadeOut(100);

			this.listView.collection.reset( this.dataProvider.rechercher(searchString) );
		},

		clearSearch: function(event){
			event.preventDefault();
			$(".search input").val('');
			this.$el.find(".search a").fadeOut(100);
			this.listView.collection.reset(this.dataProvider.models);
		},

		render: function(){

			this.$el.empty();
			this.$el.html(this.template());

			this.$el.find("#list-view")
			.removeClass("grille liste")
			.addClass(this.liststyle)
			.append(this.listView.$el);

			this.$el.find("#" + this.listView.collection.sort_key).parent().addClass("on").siblings().removeClass("on");

			return this;
		}
	});

	_.extend(PageTous.prototype, PageMixin);

	return PageTous;

});