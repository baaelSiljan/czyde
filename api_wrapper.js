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
    var _a, _b, _c, _d, item;
    this.previewSha = (function() {
      _a = []; _c = data.data.tree;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        item.path === 'preview' ? _a.push(item.sha) : null;
      }
      return _a;
    })();
    console.log(this.previewSha);
    return this.getPreviewTree();
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
  Api.prototype.getPreviewTree = function() {
    var self;
    self = this;
    console.log('https://api.github.com/repos/baael/czyde/git/trees/' + this.previewSha);
    return this.getJSONP('https://api.github.com/repos/baael/czyde/git/trees/' + this.previewSha, function(data) {
      return console.log(data.data);
    });
  };

  $(document).ready(function() {
    var api;
    api = new Api();
    return api.getLastSha();
  });
})();
