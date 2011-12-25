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
    return console.log(data.data[0].sha);
  };

  $(document).ready(function() {
    this.api = new Api();
    return this.api.getLastSha();
  });
})();
