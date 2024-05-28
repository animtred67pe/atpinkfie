'use strict';

// Common code shared between index.html, demo.html etc.
// This should be loaded after pinkfie.js

var Common = (function() { 

  function URLsearchParams(name, isBool) {
    var _u = new URL(window.location.href);
    if (isBool) {
      return _u.searchParams.has(name);
    } else {
      return _u.searchParams.get(name);
    }
  }
  var playerOptions = {};

  PKF.config.debug = URLsearchParams("debug", true);

  playerOptions.volume = +(URLsearchParams("volume")) || 100;

  if (URLsearchParams("quality", true)) {
    playerOptions.quality = URLsearchParams("quality");
  }

  var swfUrl = URLsearchParams("swfurl");

  var autoplay = URLsearchParams("autoplay", true);

  return {
    playerOptions: playerOptions,
    swfUrl,
    autoplay
  };
}());
