(function($, imgix) {

	$.imgix = {
		all: function() {
			var imgs = imgix.getElementsWithImages(),
				results = [];

			for (var i = 0; i < imgs.length; i++) {
				results.push(imgs[i]);
			}

			return $(results).imgix();
		}
	};

	$.fn.imgix = function () {
		var jq = this;
		var methods = {
			setParam: function(param, value){
				if (typeof param === "object") {
					return this.setParams(param);
				}
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.setParam(param, value);
						imgix._setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			setParams: function(values) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.setParams(values);
						imgix._setElementImageAfterLoad(e, i.getURL());
					}
				});
			},

			getColors: function(num, callback) {
				return jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						i.getColors(num, callback);
					}
				});
			},

			getParam: function(param) {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						results.push(i.getParam(param));
					}
				});

				return results.length === 1 ? results[0] : results;
			},

			getParams: function() {
				var results = [];
				jq.each(function(idx, e) {
					if (e && imgix.hasImage(e)) {
						var i = new imgix.URL(imgix._getElementImage(e));
						results.push(i.getParams());
					}
				});

				return results.length === 1 ? results[0] : results;
			}
		};

		for (var param in imgix.URL.theGetSetFuncs) {
			(function(tmp) {
				methods['set' + imgix.URL.theGetSetFuncs[tmp]] = function(v, doOverride) {
					return jq.each(function(idx, e) {
						if (e && imgix.hasImage(e)) {
							var i = new imgix.URL(imgix._getElementImage(e));
							i.setParam(tmp, v, doOverride);
							imgix._setElementImageAfterLoad(e, i.getURL());
						}
					});
				};

				methods['get' + imgix.URL.theGetSetFuncs[tmp]] = function() {
					var results = [];
					jq.each(function(idx, e) {
						if (e && imgix.hasImage(e)) {
							var i = new imgix.URL(imgix._getElementImage(e));
							//return i.getParam(tmp);
							results.push(i.getParam(tmp));
						}
					});

					return results.length === 1 ? results[0] : results;
				};

			})(param);
		}

		return methods;
	};

}(jQuery, window.imgix));