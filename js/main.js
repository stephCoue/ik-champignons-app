require.config({
	baseUrl: "js/app/",
	paths: {
		jquery: "../libs/jquery-1.9.1.min",
		mobile: "../libs/jquery.mobile-1.3.1.min",
		underscore: "../libs/underscore-min",
		backbone: "../libs/backbone-min",
		fastclick: "../libs/fastclick",
		text: "../libs/text"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

require(["app"], function(App){

	// configuration de JQM
	$(document).on("mobileinit", function(){
		// Empêche toute manipulation de clic sur les ancres
		$.mobile.linkBindingEnabled = false;
		// Empêche jQuery Mobile de traiter des changements de hash
		$.mobile.hashListeningEnabled = false;
		// Annulation des appels ajax de JQM
		$.mobile.ajaxEnabled = false;
		// Empécher l'initialisation automatique de la page d'accueil
		$.mobile.autoInitializePage = false;
		// Empecher JQM de gérer le cache des pages
		$.mobile.page.prototype.options.domCache = false;
		// délai du tap
		$.mobile.buttonMarkup.hoverDelay = 60;
		// Pushstate non supporté par tous les navigateurs
		$.mobile.pushStateEnabled = false;
		// Compatibilité sur les boutons back avec phonegap
		$.mobile.phonegapNavigationEnabled = true;
		// Conflits possibles avec les datepickers (au cas où)
		$.mobile.page.prototype.options.degradeInputs.date = true;
		// Empeche les barres de titre et de ped d'être masquées/affichées au tap
		$( "div[data-role='page']" ).fixedtoolbar({ tapToggle: false });

		$.mobile.touchOverflowEnabled = true;
	});

	require( [ "mobile" ], function() {
		App.initialize();
	});

});
