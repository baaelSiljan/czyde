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
    var link;
    link = 'https://github.com/Baael/czyde/tree/master/preview/' + element.path;
    $('#list tbody').append('<tr><td><a href="' + link + '"><img src="mask_ico.png"/>' + element.path + '</td><td></td></tr>');
    return $('#preloader').hide();
  };
  Layout.prototype.listPreview = function() {
    var self;
    self = this;
    return this.getJSONP('https://api.github.com/repos/Baael/czyde/git/trees/80f450924e236248ee49498f7e600a768976ee71?' + Math.floor(Math.random() * 10000000), function(data) {
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
