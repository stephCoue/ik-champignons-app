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
			this.render();
			this.model.on('change', this.setVisibility, this);
		},

		render: function() {
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