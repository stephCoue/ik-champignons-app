define([
"jquery",
"underscore",
"backbone",
"models/champignon",
"text!templates/champignonItem.html"
], function($, _, Backbone, Champignon, champignonTemplate){

	var ChampignonItem = Backbone.View.extend({

		template: _.template( champignonTemplate ),

		initialize: function() {
			this.render();
			this.model.on('change', this.setVisibility, this);
		},

		render: function() {
			if(this.tagName === "div") {
				switch(this.model.collection.indexOf(this.model) % 3) {
					case 0:
					this.$el.attr("class", "ui-block-a");
					break;
					case 1:
					this.$el.attr("class", "ui-block-b");
					break;
					case 2:
					this.$el.attr("class", "ui-block-c");
					break;
				}
			}
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		setVisibility: function() {
			if(this.model.get("selected")) {
				this.$el.fadeIn();
			} else {
				this.$el.fadeOut();
			}
		}

	});

	return ChampignonItem;

});