(function(){
  var Api;
  Api = function() {
    this.address = "https://api.github.com/repos/baael/czyde/";
    return this;
  };
  Api.prototype.commits = function() {
    var data, self;
    self = this;
    data = {
      url: "https://api.github.com/repos/baael/czyde/commits",
      dataType: "jsonp",
      success: function(data) {
        return self.getLastCommit(data);
      }
    };
    return $.ajax(data);
  };
  Api.prototype.getLastCommit = function(data) {
    return console.log(data[0].sha);
  };

  $(document).ready(function() {
    var api;
    api = new Api();
    return api;
  });
})();
