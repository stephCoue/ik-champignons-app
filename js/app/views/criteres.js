define([
	"jquery",
	"underscore",
	"backbone",
	"collections/criteres",
	"views/critereItem"
], function($, _, Backbone, CriteresCollection, CritereItem){

	var CriteresListView = Backbone.View.extend({

		tagName: "ul",

		initialize: function() {
			this.currentId = "0",
			this.collection = new CriteresCollection();
			Backbone.on("CRITERE", this.update, this);
			Backbone.on("CRITERE_BACK", this.goBack, this);
		},

		update: function(id) {
			this.currentId = id;
			this.parent.setSelection( this.collection.get(id) );
			this.render();
		},

		goBack: function(event){
			this.update( this.collection.get(this.currentId).get("parent") );
		},

		render: function() {

			var currentItems = this.collection.getEnfants(this.currentId);

			if(currentItems) {

				this.$el.empty();
			}

			_.each(currentItems, function(critere){
				var critereItem = new CritereItem({model:critere});
				this.$el.append(critereItem.render().$el);
			}, this);

			return this;
		}

	});

	return CriteresListView;

});