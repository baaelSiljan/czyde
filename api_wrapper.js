(function(){
  var Api;
  Api = function() {
    this.address = "https://api.github.com/repos/baael/czyde/";
    return this;
  };
  Api.prototype.getJSONP = function(url, callback) {
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
  Api.prototype.getLastSha = function() {
    var self;
    self = this;
    return this.getJSONP('https://api.github.com/repos/baael/czyde/commits', function(data) {
      return self.currentSha(data);
    });
  };
  Api.prototype.findPreviewSha = function(data) {
    var _a, _b, _c, _d, _e, _f, _g, item;
    _b = data.data.tree;
    for (_a = 0, _c = _b.length; _a < _c; _a++) {
      item = _b[_a];
      console.log(item);
    }
    this.previewSha = (function() {
      _d = []; _f = data.data.tree;
      for (_e = 0, _g = _f.length; _e < _g; _e++) {
        item = _f[_e];
        item.path === 'preview' ? _d.push(item.sha) : null;
      }
      return _d;
    })();
    return this.previewSha;
  };
  Api.prototype.getFilesInPreview = function() {
    var self;
    self = this;
    console.log('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha);
    return this.getJSONP('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha, function(data) {
      return self.findPreviewSha(data);
    });
  };
  Api.prototype.currentSha = function(data) {
    this.sha = data.data[0].sha;
    return this.getFilesInPreview();
  };

  $(document).ready(function() {
    var api;
    api = new Api();
    return api.getLastSha();
  });
})();
