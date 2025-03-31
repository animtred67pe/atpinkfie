var SWFE = function(datas, f) {
	var dataG = JSON.parse(JSON.stringify(datas));
	this.root = document.createElement('div');
	this._di = document.createElement('div');
	this.root.appendChild(this._di);
	this.list = document.createElement('div');
	this.root.appendChild(this.list);
	this.list.style.width = "640px";
	this.list.style.height = "300px";
	this.list.style.overflow = "auto";
	this.elements = [];
	var result = [];
	for (var i = 0; i < dataG.length; i++) {
		var data = dataG[i];
		if (data.md5 && data.thumb) if (!f || (data.metadata.indexOf(f) >= 0)) {
			data.thumb_id = (1000000 + (Math.random() * 9000000)) | 0;
			result.push(data);
		}
	}
	this.images = {};
	this.datas = result;
	this.onclick = null;
	this.isload = false;
}
SWFE.prototype.load = function() {
	var _this = this;
	if (this.isload) return;
	this.isload = true;
	var dfg = Math.ceil(this.datas.length / 20);
	for (var i = 0; i < dfg; i++) {
		var r = document.createElement('button');
		r.textContent = i + 1;
		r.onclick = (function(_) {
			return function() {
				_this.loadElements(_);
			}
		}(i * 20));
		this._di.appendChild(r);
	}
	this.loadElements(0);
};
SWFE.prototype.getRect = function(o_width, o_height) {
	var _movieCanvas = {
		width: o_width,
		height: o_height
	};
	var __Width = 130;
	var __Height = 90;
	var w, h;
	var x = 0, y = 0;
	if ((__Height - (_movieCanvas.height * (__Width / _movieCanvas.width))) < 0) {
		w = (_movieCanvas.width * (__Height / _movieCanvas.height));
		h = (_movieCanvas.height * (__Height / _movieCanvas.height));
		x = (__Width - w) / 2;
	} else {
		w = (_movieCanvas.width * (__Width / _movieCanvas.width));
		h = (_movieCanvas.height * (__Width / _movieCanvas.width));
		y = (__Height - h) / 2;
	}
	return [x, y, w, h];
}
SWFE.prototype.loadElements = function(a) {
	while (this.elements.length) {
		var elem = this.elements.pop();
		this.list.removeChild(elem);
	}
	for (var i = 0; i < 20; i++) {
		var data = this.datas[i + a];
		if (data) {
			var elem = this.loadElement(data);
			this.elements.push(elem);
			this.list.appendChild(elem);
		}
	}
}
SWFE.prototype.loadElement = function(data) {
	var _this = this;
	var elem = document.createElement('div');
	elem.style.width = "130px";
	elem.style.height = "120px";
	elem.style.overflow = "hidden";
	elem.style.float = "left";
	elem.style.margin = "5px";
	elem.style.padding = "5px";
	elem.style.cursor = "pointer";
	elem.style.border = "2px solid #ccc";
	var sceneImg = document.createElement('div');
	var img = document.createElement('img');
	img.title = data.metadata;
	img.onload = function() {
		var rect = _this.getRect(img.width, img.height);
		img.style.position = "absolute";
		img.style.top = rect[1] + "px";
		img.style.left = rect[0] + "px";
		img.style.width = rect[2] + "px";
		img.style.height = rect[3] + "px";
	}
	sceneImg.style.position = "relative";
	sceneImg.style.width = "130px";
	sceneImg.style.height = "90px";
	sceneImg.style.overflow = "hidden";
	sceneImg.appendChild(img);
	if (data.thumb_id in _this.images) {
		if (_this.images[data.thumb_id]) img.src = URL.createObjectURL(_this.images[data.thumb_id]);
	} else {
		_this.images[data.thumb_id] = null;
		fetch("https://assets.scratch.mit.edu/internalapi/asset/" + data.thumb + "/get/").then(function(e) {
			e.blob().then(function(a) {
				_this.images[data.thumb_id] = a;
				img.src = URL.createObjectURL(a);
			});
		});	
	}
	elem.appendChild(sceneImg);
	elem.onclick = function() {
		if (_this.onclick) {
			_this.onclick(data);
		}	
	}
	var _title = document.createElement('label');
	_title.textContent = data.name;
	elem.appendChild(_title);
	return elem;
};