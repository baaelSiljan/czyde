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
    @previewSha = item.sha for item in data.data.tree when item.path is 'preview'
    console.log @previewSha
    @getPreviewTree()
    
  getFilesInPreview: ->
    self = @
    console.log 'https://api.github.com/repos/baael/czyde/git/trees/'+@sha
    @getJSONP 'https://api.github.com/repos/baael/czyde/git/trees/'+@sha, (data)->
      self.findPreviewSha(data)

  currentSha: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()

  getPreviewTree: ->
    self = @
    console.log 'https://api.github.com/repos/baael/czyde/git/trees/'+@previewSha
    @getJSONP 'https://api.github.com/repos/baael/czyde/git/trees/'+@previewSha, (data)->
      console.log(data.data)


$(document).ready ->
  api = new Api()
  api.getLastSha();

  