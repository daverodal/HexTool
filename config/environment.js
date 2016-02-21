module.exports = function(environment) {
  var ENV = {
    baseURL: '/',
    locationType: 'auto',
    adapterURL: "http://localhost:4200/rest",
    pubUrl: "http://localhost:4200/wargame/terrainInit",
    cloneUrl: "http://localhost:4200/rest/cloneFile",
    mapsUrl: "http://localhost:4200/maps",
    FEATURES: {
      // Here you can enable experimental features on an ember canary build
      // e.g. 'with-controller': true
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // LOG_MODULE_RESOLVER is needed for pre-1.6.0
    ENV.LOG_MODULE_RESOLVER = true;

    ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_MODULE_RESOLVER = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'production') {
    ENV.baseURL = '/neo';
    ENV.locationType = 'hash';

    //ENV.adapterURL = "http://davidrodal.com/Battle/index.php/rest/";
    //ENV.pubUrl = "http://davidrodal.com/Battle/index.php/wargame/terrainInit/";
    //ENV.cloneUrl = "http://davidrodal.com/Battle/index.php/rest/cloneFile/";
    //ENV.mapsUrl = "http://davidrodal.com/neo/#/maps";

    ENV.adapterURL = "http://davidrodal.com/rest";
    ENV.pubUrl = "http://davidrodal.com/wargame/terrainInit";
    ENV.cloneUrl = "http://davidrodal.com/rest/cloneFile" +
        "";
    ENV.mapsUrl = "http://davidrodal.com/neo/#/maps";

  }

  return ENV;
};
