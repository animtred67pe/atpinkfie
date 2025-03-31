window.Packer = (function() {

    var Packager = function(styles, scripts, swfdataurl) {
        this.styles = styles;
        this.scripts = scripts;
        this.swfdataurl = swfdataurl;
    }

    Packager.prototype.run = function() {
        const styles = this.styles;
        const scripts = this.scripts;
        const swfdataurl = this.swfdataurl;
        
        const bodyg = `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            /* PinkFie styles... */
            ${styles}

            /* Player styles... */
            body {
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
                margin: 0;
                overflow: hidden;
                background-color: #000;
            }
            #pinkswf {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
            .pinkfie-root {
                margin: 0;
            }
            .splash, .error {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: table;
                color: #fff;
                cursor: default;
            }
            .error {
                display: none;
            }
            .splash > div,
            .error > div {
                display: table-cell;
                height: 100%;
                text-align: center;
                vertical-align: middle;
            }
            .progress {
                width: 200px;
                height: 10px;
                border: 1px solid #fff;
                margin: 0 auto;
            }
            .progress-bar {
                background: #fff;
                width: 10%;
                height: 100%;
            }
        </style>
    </head>
    <body>
        <div id="pinkswf"></div>
        <div class="splash">
            <div>
                <div class="progress">
                    <div class="progress-bar"></div>
                </div>
            </div>
        </div>
        <script>
            // PinkFie scripts...
            ${scripts}

            var player = new PinkFie.Player();
            var playerArea = document.getElementById('pinkswf');
            var splash = document.querySelector('.splash');
            splash.style.display = 'none';
            playerArea.appendChild(player.root);
            var progressBarFill = document.querySelector('.progress-bar');
            function TSProgress(e) {
                progressBarFill.style.width = (e * 100) + '%';
            }
            function _resize_() {
                player.resize(window.innerWidth, window.innerHeight);
            }
            function _onfullscreenchange(e) {
                console.log(e);
            }
            document.addEventListener('fullscreenchange', (e) => _onfullscreenchange(e));
            window.addEventListener("resize", _resize_);
            _resize_();
            
            player.setOptions({
                autoplayPolicy: 'if-audio-playable',
            });

            function loadSwfFile(file) {
                splash.style.display = '';
                playerArea.style.display = 'none';
                TSProgress(0);
                player.loadSwfFromFile(file);
            }
            player.onload.subscribe(function() {
                splash.style.display = 'none';
                playerArea.style.display = '';

            });
            player.onprogress.subscribe(TSProgress);

            var swfdata = '${swfdataurl}';

            var x = new XMLHttpRequest();
            x.onload = function() {
                var bb = new Uint8Array(x.response);
                var fil = new Blob([bb]);
                loadSwfFile(fil);
            }
            x.responseType = "arraybuffer";
            x.open("GET", swfdata);
            x.send();
            
        </script>
    </body>
</html>`;

        return bodyg;

    }
    
    return {
        Packager
    }

}());