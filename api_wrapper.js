(function(){
  var Layout;
  Layout = function() {
    this.api_url = "https://api.github.com/repos/baael/czyde/";
    this.branch = "master";
    this.raw_url = "https://raw.github.com/Baael/czyde/" + this.branch + "/preview/";
    this.row = '<tr><td><a href="' + this.raw_url + '{path}"><img src="' + this.raw_url + '{path}/icon.png"/>{path}</td><td></td></tr>';
    this.preview = '<img src="{path}big_icon.png"><h1>{title}</h1><div class="author"></div>';
    this.listBindings();
    return this;
  };
  Layout.prototype.getCurrentHash = function() {
    var self;
    self = this;
    return this.getJSONP(this.api_url + 'git/trees/master', function(data) {
      var _a, _b, _c, _d, item;
      self.sha = (function() {
        _a = []; _c = data.data.tree;
        for (_b = 0, _d = _c.length; _b < _d; _b++) {
          item = _c[_b];
          item.path === "preview" ? _a.push(item.sha) : null;
        }
        return _a;
      })();
      return self.listPreview();
    });
  };
  Layout.prototype.fetchData = function() {
    return this.getCurrentHash();
  };
  Layout.prototype.listBindings = function() {
    var self;
    self = this;
    return $('#list a').live('click', function(e) {
      var element;
      e.preventDefault();
      element = {};
      element.path = $(this).attr('href');
      element.title = $(this).text().replace(/_/gi, ' ');
      $('#preview').html($.nano(self.preview, element));
      return false;
    });
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
    $('#list tbody').append($.nano(this.row, element));
    return $('#preloader').hide();
  };
  Layout.prototype.listPreview = function() {
    var self;
    self = this;
    return this.getJSONP(this.api_url + 'git/trees/' + this.sha + '?' + Math.floor(Math.random() * 10000000), function(data) {
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
    jQuery.support.cors = false;
    layout = new Layout();
    layout.fetchData();
    window.req = $.ajax({
      url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json',
      type: 'GET',
      dataType: 'jsonp',
      success: function(xhr, data, b) {
        return console.log(xhr);
      }
    });
    window.req.getResponseHeader = function() {
      return 'application/json; charset=utf-8';
    };
    window.req.getAllResponseHeaders = function() {
      return 'application/json; charset=utf-8';
    };
    window.req.pipe(function(a, b, c) {
      return alert('aa');
    });
    window.req.always(function(a, b, c, d) {
      return console.log(c);
    });
    return window.req.error(function(a, b) {
      return console.log('Oh noes!');
    });
  });
})();
