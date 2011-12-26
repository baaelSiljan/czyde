class Layout
  constructor: ->
    @api_url = "https://api.github.com/repos/baael/czyde/"
    @branch = "master"
    @raw_url = "https://raw.github.com/Baael/czyde/"+@branch+"/preview/"
    @row = '<tr><td><a href="'+@raw_url+'{path}"><img src="'+@raw_url+'{path}/icon.png"/>{path}</td><td></td></tr>'
    @preview = '<img src="{path}big_icon.png"><h1>{title}</h1><div class="author"></div>'
    @listBindings()


  listBindings: ->
    self = @
    $('#list a').live 'click', (e)->
      e.preventDefault()
      element = {} 
      element.path = $(this).attr('href')
      element.title = $(this).text().replace(/_/gi,' ')
      
      $('#preview').html($.nano(self.preview, element))
      
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
    @getJSONP @api_url+'git/trees/ccde406bbdc3c73f335339fd277894e5ee5861d9?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  jQuery.support.cors = false
  layout = new Layout()
  layout.listPreview();
  window.req = $.ajax {
    url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json'
    type: 'GET'
    dataType: 'jsonp'
    success : (xhr,data,b)->
      console.log(xhr)
    }


  window.req.getResponseHeader = ->
    'application/json; charset=utf-8'

  window.req.getAllResponseHeaders = ->
    'application/json; charset=utf-8'
  window.req.pipe (a,b,c) ->
    alert('aa')
  window.req.always (a,b,c,d) ->
    console.log(c)
  window.req.error (a,b) ->
    console.log('Oh noes!')
