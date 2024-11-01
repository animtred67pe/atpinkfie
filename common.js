// Common code shared between index.html, demo.html etc.
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
  playerOptions.wth = +URLsearchParams("wth", false);

  var swfUrl = URLsearchParams("swfurl");
  var swfMd5 = URLsearchParams("swfmd5");

  if (!swfUrl) {
    if (URLsearchParams("apology", true)) swfUrl = "https://assets.scratch.mit.edu/internalapi/asset/50f0d850bca885ee5e6196597cf3964c.wav/get/";
    if (URLsearchParams("snowdrop", true)) swfUrl = "https://assets.scratch.mit.edu/internalapi/asset/ce22396713e7678970543dd713529daa.wav/get/";
    if (URLsearchParams("gamederps", true)) swfUrl = "https://assets.scratch.mit.edu/internalapi/asset/a99eb64e0c272789e24e7c69a2726608.wav/get/";
    if (swfMd5) swfUrl = "https://assets.scratch.mit.edu/internalapi/asset/" + swfMd5 + ".wav/get/";
  }
  
  var autoplay = URLsearchParams("autoplay", true);

  return {
    playerOptions: playerOptions,
    swfUrl,
    autoplay
  };
}());