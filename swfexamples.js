var SWFE = function(datas) {
	this.root = document.createElement('div');
	this.root.style.width = "640px";
	this.root.style.height = "360px";
	this.root.style.overflow = "auto";
	this.datas = datas;
	this.onclick = null;
	this.isload = false;
}
SWFE.prototype.load = function() {
	if (this.isload) return;
	this.isload = true;
	for (var i = 0; i < this.datas.length; i++) {
		var data = this.datas[i];
		if (data.md5 && data.thumb) {
			this.root.appendChild(this.loadElement(data));
		} else {
			//var elem = document.createElement('h3');
			//elem.textContent = data.name;
			//this.root.appendChild(document.createElement('br'));
			//this.root.appendChild(elem);
			//this.root.appendChild(document.createElement('br'));
		}
	}
};
SWFE.prototype.loadElement = function(data) {
	var _this = this;
	var elem = document.createElement('div');
	elem.style.width = "180px";
	elem.style.height = "150px";
	elem.style.overflow = "hidden";
	elem.style.float = "left";
	elem.style.margin = "5px";
	elem.style.padding = "5px";
	elem.style.cursor = "pointer";
	elem.style.border = "2px solid #fff";
	var img = document.createElement('img');
	img.width = 180;
	img.height = 120;
	img.title = data.metadata;
	fetch("https://assets.scratch.mit.edu/internalapi/asset/" + data.thumb + "/get/").then(function(e) {
		e.blob().then(function(a) {
			img.src = URL.createObjectURL(a);
		});
	});
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