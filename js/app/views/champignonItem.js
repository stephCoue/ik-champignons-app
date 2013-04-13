define([
"jquery",
"underscore",
"backbone",
"models/champignon",
"text!templates/champignonItem.html"
], function($, _, Backbone, Champignon, champignonTemplate){

	var ChampignonItem = Backbone.View.extend({

		tagName: "li",

		template: _.template( champignonTemplate ),

		initialize: function() {
			this.model.on('change', this.setVisibility, this);
		},

		render: function() {
			this.model.set("url", "#" + this.parent.parent.id + "/" + this.model.id);
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