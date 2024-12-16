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
  playerOptions.speed = +(URLsearchParams("speed")) || 1;

  if (URLsearchParams("quality", true)) {
    playerOptions.quality = URLsearchParams("quality");
  }

  playerOptions.vCamId = URLsearchParams("vcam", false) || "";
  playerOptions.vCamShow = URLsearchParams("vcam_show_clip", true);
  playerOptions.allowAvm = URLsearchParams("allow_avm", true);
  playerOptions.interpolation = URLsearchParams("interpolation", true);
  playerOptions.unloop = URLsearchParams("unloop", true);
  playerOptions.wth = +URLsearchParams("wth", false);

  var swfUrl = URLsearchParams("swfurl");
  var swfMd5 = URLsearchParams("swfmd5");

  if (!swfUrl) {
    if (URLsearchParams("apology", true)) swfUrl = ["50f0d850bca885ee5e6196597cf3964c"];
    if (swfMd5) swfUrl = swfMd5.split("_");
  }
  
  var autoplay = URLsearchParams("autoplay", true);

  if (URLsearchParams("viral", true)) {
    playerOptions.wth = 1;
    playerOptions.speed = 2;
    playerOptions.quality = "low";
  }

  return {
    playerOptions: playerOptions,
    swfUrl,
    autoplay
  };
}());