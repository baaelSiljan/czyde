(function(){
  var Layout, Viewer3d;
  Viewer3d = function() {
    this.canvas = $('#preview3d')[0];
    return this;
  };
  Viewer3d.prototype.place = function() {
    this.viewer = new JSC3D.Viewer(this.canvas);
    return this.viewer;
  };
  Viewer3d.prototype.setParams = function() {
    this.viewer.setParameter('InitRotationX', 0);
    this.viewer.setParameter('InitRotationY', 45);
    this.viewer.setParameter('InitRotationZ', 0);
    this.viewer.setParameter('ModelColor', '#FFFFFF');
    this.viewer.setParameter('SimulateSpecular', 'true');
    this.viewer.setParameter('BackgroundColor1', '#F4F4F4');
    this.viewer.setParameter('BackgroundColor2', '#ECECEC');
    this.viewer.setParameter('RenderMode', 'texturesmooth');
    this.viewer.setParameter('Definition', 'low');
    return this.viewer.setParameter('MipMapping', 'on');
  };
  Viewer3d.prototype.loadScene = function(url) {
    return this.viewer.setParameter('SceneUrl', url);
  };
  Viewer3d.prototype.refresh = function() {
    this.viewer.init();
    return this.viewer.update();
  };

  Layout = function() {
    this.api_url = "https://api.github.com/repos/baael/czyde/";
    this.branch = "master";
    this.raw_url = "https://raw.github.com/Baael/czyde/" + this.branch + "/preview/";
    this.row = '<tr><td><a id="{path}" href="' + this.raw_url + '{path}"><img src="' + this.raw_url + '{path}/icon.png"/>{path}</td><td></td></tr>';
    this.preview = '<img src="{path}/big_icon.png"><h1>{title}</h1><div class="author">by {author}</div>';
    this.dl = '<dl><dd>forum profile:</dd><dt>{forum_profile}</dt><dd>polygons count:</dd><dt>{polygons}</dt><dd>shader:</dd><dt>{shader}</dt><dd>FO3D included:</dd><dt>{fo3d}</dt><dd>rigged:</dd><dt>{rigged}</dt><dd>category:</dd><dt>{category}</dt></dl><div id="description_text" class="non3d">{description}</div>';
    this.listBindings();
    this.list = {};
    this.global_req;
    return this;
  };
  Layout.prototype.getCurrentHash = function() {
    var self;
    self = this;
    return this.getJSONP(this.api_url + 'git/trees/master', function(data) {
      var _a, _b, _c, _d, item, tree;
      tree = {};
      tree = (function() {
        _a = []; _c = data.data.tree;
        for (_b = 0, _d = _c.length; _b < _d; _b++) {
          item = _c[_b];
          item.path === "preview" ? _a.push(item) : null;
        }
        return _a;
      })();
      self.sha = tree[0].sha;
      self.tree_url = tree[0].url;
      self.getObjectsList();
      return self.listPreview();
    });
  };
  Layout.prototype.getObjectsList = function() {
    var self;
    self = this;
    return this.getJSONP(self.tree_url, function(data) {
      var _a, _b, _c, _d, item;
      _a = []; _c = data.data.tree;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        item.type === "tree" ? _a.push(self.assignObjectDirectory(item)) : null;
      }
      return _a;
    });
  };
  Layout.prototype.assignObjectDirectory = function(obj) {
    var self;
    self = this;
    this.list[obj.path] = obj;
    this.list[obj.path].items = {};
    this.getJSONP(obj.url, function(data) {
      var _a, _b, _c, _d, item;
      _a = []; _c = data.data.tree;
      for (_b = 0, _d = _c.length; _b < _d; _b++) {
        item = _c[_b];
        _a.push(self.assignObjectTree(obj.path, item));
      }
      return _a;
    });
    return console.log(this.list);
  };
  Layout.prototype.getAndDecode = function(url, callback) {
    var self;
    self = this;
    return this.getJSONP(url, function(data) {
      return callback($.base64Decode(data.data.content));
    });
  };
  Layout.prototype.assignObjectTree = function(enumerator, obj) {
    this.list[enumerator].items[obj.path] = obj;
    return this.list[enumerator].items[obj.path];
  };
  Layout.prototype.fetchData = function() {
    return this.getCurrentHash();
  };
  Layout.prototype.previewBindings = function() {
    $('#buttons a').live('click', function(e) {
      if (($('body').hasClass('in3d'))) {
        ($(this).hasClass('togglable')) ? $('.togglable').removeClass('turned_on') : null;
        $(this).addClass('turned_on');
      }
      e.preventDefault();
      return false;
    });
    return $('#run3d').live('click', function(e) {
      $('body').toggleClass('in3d');
      if (($('body').hasClass('in3d') === false)) {
        return $('.turned_on').removeClass('turned_on');
      } else {
        return $(this).addClass('turned_on');
      }
    });
  };
  Layout.prototype.listBindings = function() {
    var self;
    self = this;
    this.previewBindings();
    return $('#list a').live('click', function(e) {
      var item;
      $('.selected').removeClass('selected');
      $(this).parents('tr').addClass('selected');
      e.preventDefault();
      //element = details[enumerator]
      //element.path = self.raw_url+enumerator
      item = self.list[$(this).attr('id')];
      console.log(item.items['author.json'].url);
      self.getAndDecode(item.items['author.json'].url, function(content) {
        return console.log(content);
        //self.getJSONP item
        //$('#preview').html($.nano(self.preview, element))
        //$('#text').html($.nano(self.dl, element))
      });
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
    window.details = {};
    jQuery.support.cors = false;
    window.layout = new Layout();
    window.layout.fetchData();
    window.viewer = new Viewer3d();
    //viewer.loadScene('https://raw.github.com/Baael/czyde/master/preview/jacket/object.obj')
    //window.req = $.ajax {
    //  url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json'
    //  type: 'GET'
    //  dataType: 'jsonp'
    //  success : (xhr,data,b)->
    //    console.log(xhr)
    //  }
    //window.req = $.ajax {
    //  url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/object.obj'
    //  type: 'GET'
    //  dataType: 'jsonp'
    //  success : (xhr,data,b)->
    //    console.log(xhr)
    //  }
  });
})();
