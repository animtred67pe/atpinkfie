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
    if (URLsearchParams("gotta_catch_em_all_again", true)) swfUrl = ["c09da91a1b96cb3f061dd634605b5c15"];
    if (URLsearchParams("guardian", true)) swfUrl = ["200cb9d6fbf02a30add188244e6c69a1","7e383a22fb070f0afaa8400770e35f6b"];
    if (URLsearchParams("once_upon_a_time_in_canterlot", true)) swfUrl = ["deef195cbadc444515be401f7bab13ca","cd18e3bd92c164c7307670afdce35096"];
    if (swfMd5) swfUrl = swfMd5.split("_");
  }
  
  var autoplay = URLsearchParams("autoplay", true);
  var swfexamples = URLsearchParams("swfexamples", true);

  if (URLsearchParams("viral", true)) {
    playerOptions.wth = 1;
    playerOptions.speed = 1.575; // 1.575
    playerOptions.quality = "low";
  }

  PinkFie.config.useWebGL = URLsearchParams("webgl", true);
  PinkFie.config.allowDownloadMP3SoundStream = URLsearchParams("allow_download_mp3_sound_stream", true);

  return {
    playerOptions: playerOptions,
    swfUrl,
    autoplay,
    swfexamples
  };
}());