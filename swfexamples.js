var SWFE = function(datas, f) {
	this.root = document.createElement('div');
	this.root.style.width = "640px";
	this.root.style.height = "360px";
	this.root.style.overflow = "auto";
	this._di = document.createElement('div');
	this.root.appendChild(this._di);
	this.elements = [];
	var result = [];
	for (var i = 0; i < datas.length; i++) {
		var data = datas[i];
		if (data.md5 && data.thumb) {
			if (!f || (data.metadata.indexOf(f) >= 0)) {
				result.push(data);
			}
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
SWFE.prototype.loadElements = function(a) {
	while (this.elements.length) {
		var elem = this.elements.pop();
		this.root.removeChild(elem);
	}
	for (var i = 0; i < 20; i++) {
		var data = this.datas[i + a];
		if (data) {
			var elem = this.loadElement(data);
			this.elements.push(elem);
			this.root.appendChild(elem);
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
	elem.style.border = "2px solid #fff";
	var img = document.createElement('img');
	img.width = 130;
	img.height = 90;
	img.title = data.metadata;
	if (data.thumb in _this.images) {
		if (_this.images[data.thumb]) img.src = URL.createObjectURL(_this.images[data.thumb]);
	} else {
		_this.images[data.thumb] = null;
		fetch("https://assets.scratch.mit.edu/internalapi/asset/" + data.thumb + "/get/").then(function(e) {
			e.blob().then(function(a) {
				_this.images[data.thumb] = a;
				img.src = URL.createObjectURL(a);
			});
		});	
	}
	elem.appendChild(img);
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