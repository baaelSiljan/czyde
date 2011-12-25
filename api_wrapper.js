(function(){
  var Layout;
  Layout = function() {
    this.address = "https://api.github.com/repos/baael/czyde/";
    return this;
  };
  Layout.prototype.getJSONP = function(url, callback) {
    var data, self;
    self = this;
    data = {
      url: url,
      dataType: "jsonp",
      success: function(data) {
        return callback(data);
      }
    };
    return $.ajax(data);
  };
  Layout.prototype.addElement = function(element) {
    return $('#list').append('<div><img src="mask_ico.png" width="30" height="30"/>https://github.com/Baael/czyde/raw/master/preview/' + element.path + '</div>');
  };
  Layout.prototype.listPreview = function() {
    var self;
    self = this;
    return this.getJSONP('https://api.github.com/repos/Baael/czyde/git/trees/3408c3da6d90c7476eef2291e3e0055620539f73', function(data) {
      var _a, _b, _c, _d, item;
      _a = []; _c = data.data.tree;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        _a.push(self.addElement(item));
      }
      return _a;
    });
  };

  $(document).ready(function() {
    var layout;
    layout = new Layout();
    return layout.listPreview();
  });
})();
