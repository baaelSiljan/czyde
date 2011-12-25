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
    @getFilesInPreview()
    
  getFilesInPreview: ->
    self = @
    console.log 'https://api.github.com/repos/baael/czyde/git/trees/'+@previewSha
    @getJSONP 'https://api.github.com/repos/baael/czyde/git/trees/'+@previewSha, (data) ->
      self.findPreviewSha(data)

  currentSha: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()

  getPreviewTree: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()


$(document).ready ->
  api = new Api()
  api.getLastSha();

  