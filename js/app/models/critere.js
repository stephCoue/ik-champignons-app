define([
	"underscore",
	"backbone"
], function(_, Backbone){

	var Critere = Backbone.Model.extend({

		initialize: function(){
			this.set("count", this.get("champignons").length);
		}

	});

	return Critere;
});