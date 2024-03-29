class Viewer3d
  constructor: ->
    @canvas = $('#preview3d')[0]
    
  place: ->
    @viewer = new JSC3D.Viewer(@canvas)
  
  setParams: ->
    @viewer.setParameter('InitRotationX', 0)
    @viewer.setParameter('InitRotationY', 45)
    @viewer.setParameter('InitRotationZ', 0)
    @viewer.setParameter('ModelColor', '#FFFFFF')
    @viewer.setParameter('SimulateSpecular', 'true')
    @viewer.setParameter('BackgroundColor1', '#F4F4F4')
    @viewer.setParameter('BackgroundColor2', '#ECECEC')
    @viewer.setParameter('RenderMode', 'texturesmooth')
    @viewer.setParameter('Definition', 'low')
    @viewer.setParameter('MipMapping', 'on')

  loadScene: (url)->
    @viewer.setParameter('SceneUrl', url);
  
  refresh: ->
    @viewer.init()
    @viewer.update()

class Layout
  constructor: ->
    @api_url = "https://api.github.com/repos/baael/czyde/"
    @branch = "master"
    @raw_url = "https://raw.github.com/Baael/czyde/"+@branch+"/preview/"
    @row = '<tr><td><a id="{path}" href="'+@raw_url+'{path}"><img src="'+@raw_url+'{path}/icon.png"/>{path}</td><td></td></tr>'
    @preview = '<img src="{path}/big_icon.png"><h1>{title}</h1><div class="author">by {author}</div>'
    @dl = '<dl><dd>forum profile:</dd><dt>{forum_profile}</dt><dd>polygons count:</dd><dt>{polygons}</dt><dd>shader:</dd><dt>{shader}</dt><dd>FO3D included:</dd><dt>{fo3d}</dt><dd>rigged:</dd><dt>{rigged}</dt><dd>category:</dd><dt>{category}</dt></dl><div id="description_text" class="non3d">{description}</div>'
    @listBindings()
    @list = {}
    @global_req

  getCurrentHash: ->
    self = @
    @getJSONP @api_url+'git/trees/master', (data) ->
      tree = {}
      tree = item for item in data.data.tree when item.path is "preview"
      self.sha = tree[0].sha
      self.tree_url = tree[0].url
      self.getObjectsList()
      self.listPreview()

  getObjectsList: ->
    self = @
    @getJSONP self.tree_url, (data) ->
      self.assignObjectDirectory(item) for item in data.data.tree when item.type is "tree"

  assignObjectDirectory: (obj)->
    self = @
    @list[obj.path] = obj
    @list[obj.path].items = {}
    @getJSONP obj.url, (data) ->
      self.assignObjectTree(obj.path, item) for item in data.data.tree
    console.log(@list)
    

  getAndDecode: (url, callback) ->
    self = @
    @getJSONP url, (data) ->
      callback($.base64Decode(data.data.content))
      

  assignObjectTree: (enumerator, obj)->
    @list[enumerator].items[obj.path] = obj 

  fetchData: ->
    @getCurrentHash()

  previewBindings: ->
    $('#buttons a').live 'click', (e)->
      if ($('body').hasClass('in3d'))
        if ($(this).hasClass('togglable'))
          $('.togglable').removeClass('turned_on')
          $(this).addClass('turned_on')
        else
          $(this).toggleClass('turned_on')
      e.preventDefault()
      false
    $('#run3d').live 'click', (e)->
      $('body').toggleClass('in3d')
      if ($('body').hasClass('in3d') == false)
        $('.turned_on').removeClass('turned_on')
      else
        $(this).addClass('turned_on')
      
  listBindings: ->
    self = @
    @previewBindings()
    $('#list a').live 'click', (e)->
      $('.selected').removeClass('selected')
      $(this).parents('tr').addClass('selected')
      e.preventDefault()
      $('#preloader_left').show()

      item = self.list[$(this).attr('id')]

      if item.items['author.json']
        self.getAndDecode item.items['author.json'].url, (content) ->
          eval("details = " +content)
          details.path = self.raw_url+item.path
          item.details = details
        
          $('#preview').html($.nano(self.preview, item.details))
          $('#text').html($.nano(self.dl, item.details))
          $('#preloader_left').hide()
      false


  getJSONP: (url, callback)->
    self = @
    data: {
      url: url
      dataType: "jsonp"
      success: (data) ->
        callback(data)
      }
    $.ajax(data)

  addElement: (element)->
    $('#list tbody').append($.nano(@row, element))
    $('#preloader').hide()

  listPreview: ->
    self = @
    @getJSONP @api_url+'git/trees/'+@sha+'?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  window.details = {}
  jQuery.support.cors = false
  window.layout = new Layout()
  window.layout.fetchData()
  
  window.viewer = new Viewer3d()
  window.viewer.place()
  window.viewer.refresh()
  layout.getAndDecode 'https://api.github.com/repos/Baael/czyde/git/blobs/d5d5e63685c32356550a373b02e0ed3793b5e93c', (data)->
    window.loaded_obj = data;
  layout.getAndDecode 'https://api.github.com/repos/Baael/czyde/git/blobs/9540b67535a1069b65dd5833cc7b0c1d0b754f26', (data)->
    window.loaded_mtl = data;
  layout.getAndDecode 'https://api.github.com/repos/Baael/czyde/git/blobs/52eaf33f6f283e93cf5878142b83d2de195def3f', (data)->
    window.loaded_texture = data;
    
  
   
  
  #window.req = $.ajax {
  #  url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json'
  #  type: 'GET'
  #  dataType: 'jsonp'
  #  success : (xhr,data,b)->
  #    console.log(xhr)
  #  }
    
  #window.req = $.ajax {
  #  url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/object.obj'
  #  type: 'GET'
  #  dataType: 'jsonp'
  #  success : (xhr,data,b)->
  #    console.log(xhr)
  #  }
