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
    return this.getJSONP('https://api.github.com/repos/baael/czyde/commits', this.currentSha);
  };
  Api.prototype.currentSha = function(data) {
    this.sha = data.data[0].sha;
    return this.getFilesInPreview();
  };
  Api.prototype.getFilesInPreview = function() {
    console.log(this.sha);
    return this.getJSONP('https://api.github.com/repos/baael/czyde/git/trees/' + this.sha, this.listFiles);
  };
  Api.prototype.listFiles = function(data) {
    return console.log(data.data);
  };

  $(document).ready(function() {
    this.api = new Api();
    return this.api.getLastSha();
  });
})();
