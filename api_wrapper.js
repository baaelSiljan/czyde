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
    return this.getJSONP('https://api.github.com/repos/baael/czyde/commits', self.currentSha);
  };
  Api.prototype.listFiles = function(data) {
    return console.log(data.data);
  };
  Api.prototype.getFilesInPreview = function() {
    return this.getJSONP('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha, this.listFiles);
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
