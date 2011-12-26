(function(){
  var Layout;
  Layout = function() {
    this.api_url = "https://api.github.com/repos/baael/czyde/";
    this.branch = "master";
    this.raw_url = "https://raw.github.com/Baael/czyde/" + this.branch + "/preview/";
    this.row = '<tr><td><a id="{path}" href="' + this.raw_url + '{path}"><img src="' + this.raw_url + '{path}/icon.png"/>{path}</td><td></td></tr>';
    this.preview = '<img src="{path}/big_icon.png"><h1>{title}</h1><div class="author">by {author}</div>';
    this.dl = '<dl><dd>forum profile:</dd><dt>{forum_profile}</dt><dd>polygons count:</dd><dt>{polygons}</dt><dd>shader:</dd><dt>{shader}</dt><dd>FO3D included:</dd><dt>{fo3d}</dt><dd>rigged:</dd><dt>{rigged}</dt><dd>category:</dd><dt>{category}</dt></dl><div id="description_text">{description}</div>';
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
      var element, enumerator;
      e.preventDefault();
      enumerator = $(this).attr('id');
      element = details[enumerator];
      element.path = self.raw_url + enumerator;
      $('#preview').html($.nano(self.preview, element));
      $('#text').html($.nano(self.dl, element));
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
    window.details = {};
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
    return window.req;
  });
})();
