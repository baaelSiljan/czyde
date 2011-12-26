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
    $('#list tbody').append('<tr><td><a href="'+link+'"><img src="mask_ico.png"/>'+element.path+'</td><td></td></tr>')
    $('#preloader').hide()
  listPreview: ->
    self = @
    @getJSONP 'https://api.github.com/repos/Baael/czyde/git/trees/80f450924e236248ee49498f7e600a768976ee71?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  layout = new Layout()
  layout.listPreview();

  