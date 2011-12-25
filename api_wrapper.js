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
  Api.prototype.listFiles = function(data) {
    return console.log(data.data);
  };
  Api.prototype.getFilesInPreview = function() {
    var self;
    self = this;
    console.log('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha);
    return this.getJSONP('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha, function(data) {
      return self.listFiles(data);
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
