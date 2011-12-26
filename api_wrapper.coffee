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
    @getJSONP 'https://api.github.com/repos/Baael/czyde/git/trees/1b4319c7eedb8ff59d717bbd0eec239948684071?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  layout = new Layout()
  layout.listPreview();
  $.ajax {
    url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json'
    type: 'GET'
    dataType: 'jsonp'
    mimeType: 'application/text'
    complete: (data)->
      console.log(data)
    }
  