class Api
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

  getLastSha: ->
    self = @
    @getJSONP 'https://api.github.com/repos/baael/czyde/commits', (data)->
      self.currentSha(data)

  findPreviewSha: (data)->
    for item in data.data.tree
      console.log item
      @previewSha = item.sha if item.path === "preview"
      
  getFilesInPreview: ->
    self = @
    console.log 'https://api.github.com/repos/baael/czyde/git/trees/'+@sha
    @getJSONP 'https://api.github.com/repos/baael/czyde/git/trees/'+@sha, (data)->
      self.findPreviewSha(data)

  currentSha: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()


$(document).ready ->
  api = new Api()
  api.getLastSha();

  