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

  return {
    playerOptions: playerOptions
  };
}());
