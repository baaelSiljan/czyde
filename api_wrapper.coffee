class Layout
  constructor: ->
    @api_url = "https://api.github.com/repos/baael/czyde/"
    @branch = "master"
    @raw_url = "https://raw.github.com/Baael/czyde/"+@branch+"/preview/"
    @row = '<tr><td><a href="'+@raw_url+'{path}"><img src="'+@raw_url+'{path}/icon.png"/>{path}</td><td></td></tr>'
    @preview = '<img src="{path}big_icon.png"><h1>{title}</h1><div class="author"></div>'
    @listBindings()

  getCurrentHash: ->
    self = @
    @getJSONP @api_url+'git/trees/master', (data) ->
      self.sha = item.sha for item in data.data.tree when item.path is "preview"  
      self.listPreview()

  fetchData: ->
    @getCurrentHash()

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
    @getJSONP @api_url+'git/trees/'+@sha+'?'+Math.floor(Math.random()*10000000), (data)->
      self.addElement item for item in data.data.tree



$(document).ready ->
  window.details = {}
  jQuery.support.cors = false
  layout = new Layout()
  layout.fetchData()
  
  window.req = $.ajax {
    url: 'https://raw.github.com/Baael/czyde/master/preview/jacket/author.json'
    type: 'GET'
    dataType: 'jsonp'
    success : (xhr,data,b)->
      console.log(xhr)
    }
