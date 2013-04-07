define([
"jquery",
"underscore",
"backbone",
"collections/criteres",
"views/critereItem"
], function($, _, Backbone, CriteresCollection, CritereItem){

	var CriteresListView = Backbone.View.extend({

		el: $("#filtres"),

		initialize: function() {
			this.currentId = "0",
			this.collection = new CriteresCollection();
			this.collection.on("sync", this.render, this);
			this.collection.fetch();

			this.backBtn = this.$el.find("#retour a").hide();
		},

		update: function(id) {
			this.currentId = id;
			this.render();
		},

		render: function() {

			var currentItems = this.collection.getEnfants(this.currentId);

			if(currentItems) {

				this.$el.find("ul").html('');

				if(this.currentId === "0")
					this.backBtn.fadeOut();
				else
					this.backBtn.fadeIn();

				this.backBtn.attr("href", "#critere/" + this.collection.getParent(this.currentId));
			}

			_.each(currentItems, function(critere){
				var critereItem = new CritereItem({model:critere});
				this.$el.find("ul").append(critereItem.render().el);
			}, this);

			return this;
		}

	});

	return CriteresListView;

});