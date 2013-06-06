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
			//this.backBtn = this.$el.find("#retour a").hide();
		},

		update: function(id) {
			this.currentId = id;
			this.render();
		},

		render: function() {

			var currentItems = this.collection.getEnfants(this.currentId);
			console.log(currentItems);

			if(currentItems) {

				this.$el.empty();

				// if(this.currentId === "0")
				// 	this.backBtn.fadeOut();
				// else
				// 	this.backBtn.fadeIn();

				// this.backBtn.attr("href", "#critere/" + this.collection.getParent(this.currentId));
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