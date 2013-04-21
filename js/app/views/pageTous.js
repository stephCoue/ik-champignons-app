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
			this.app = options.app;
			this.liststyle = this.app.settings.get('liststyle');
			this.order = this.app.settings.get('sortkey');
			this.listenTo(this.options.app, "listModeChange", this.onListModeChange);
			this.render();
		},

		events: {
			"click .filtres a": "onFiltre",
			"touchstart .filtres a": "onFiltre",
			"keyup": "search",
			"click .search a": "reset"
		},

		onFiltre: function(event){
			event.preventDefault();
			this.order = $(event.currentTarget).attr("href");
			this.app.settings.set("sortkey", $(event.currentTarget).attr("href"));
			this.app.settings.save();
			this.collection.filtrerPar( $(event.currentTarget).attr("href") );
			this.render();
		},

		search: function(event){
			var searchString = $(".search input").val().toLowerCase();

			this.listView.collection = new Backbone.Collection(this.collection.rechercher(searchString));
			this.listView.render();
		},

		reset: function(event){
			event.preventDefault();
			$(".search input").val('');
			this.listView.collection = this.collection;
			this.listView.render();
		},

		onListModeChange: function(){
			this.liststyle = this.app.settings.get('liststyle');
			this.$el.find("#list-view").removeClass("grille liste").addClass(this.app.settings.get('liststyle'));
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