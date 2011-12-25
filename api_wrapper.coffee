class Layout
  constructor: ->
    @address = "https://api.github.com/repos/baael/czyde/"

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
    link = 'https://github.com/Baael/czyde/tree/master/preview/'+element.path
    $('#list').append('<div><a href="'+link+'"><img src="mask_ico.png" width="30" height="30"/>'+element.path+'</a></div>')
    $('#list div:last').hide().fadeIn('40')
    $('#preloader').hide()
  listPreview: ->
    self = @
    @getJSONP 'https://api.github.com/repos/Baael/czyde/git/trees/8c96ad79dc62baefe1f656c964fdae0d5894e237?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  layout = new Layout()
  layout.listPreview();

  