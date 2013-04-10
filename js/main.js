require.config({
	baseUrl: "js/app/",
	paths: {
		jquery: "../libs/jquery-1.9.1.min",
		mobile: "../libs/jquery.mobile-1.3.0.min",
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
		},
		"mobile": {
			exports: "jquerymobile"
		}
	}
});

require(['app'], function(App){

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

	document.addEventListener("deviceready", function(event){
		require( [ "mobile" ], function() {
			console.log("jquery mobile chargé");
			App.initialize();
		});
	}, false);

	if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
		console.log("main.js : On est sur ", navigator.userAgent);
	} else {
		console.log("main.js : On est sur ", navigator.userAgent);
		require( [ "mobile" ], function() {
			App.initialize();
		});
	}
});
