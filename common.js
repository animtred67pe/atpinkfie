// Common code shared between index.html, demo.html, app.html etc.
// This should be loaded after pinkfie.js

var Common = (function() {
  function URLsearchParams(name, isBool) {
    var _u = new URL(window.location.href);
    if (isBool) {
      if (_u.searchParams) {
        return _u.searchParams.has(name);
      } else {
        return false;
      }
    } else {
      if (_u.searchParams) {
        return _u.searchParams.get(name);
      } else {
        return false;
      }
    }
  }
  
  var playerOptions = {};

  playerOptions.volume = +(URLsearchParams("volume")) || 100;

  if (URLsearchParams("quality", true)) {
    playerOptions.quality = URLsearchParams("quality");
  }

  playerOptions.vCamId = URLsearchParams("vcam", false) || "";
  playerOptions.vCamShow = URLsearchParams("vcam_show_clip", true);
  playerOptions.unloop = URLsearchParams("unloop", true);
  playerOptions.useBitmapCache = URLsearchParams("bitmap_cache", true);

  var swfUrl = URLsearchParams("swfurl");
  
  var autoplay = URLsearchParams("autoplay", true);

  PinkFie.config.useWebGL = URLsearchParams("webgl", true);

  return {
    playerOptions: playerOptions,
    swfUrl,
    autoplay
  };
}());