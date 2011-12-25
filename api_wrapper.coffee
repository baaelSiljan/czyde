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

  listFiles: (data)->
    console.log data.data

  getFilesInPreview: ->
    @getJSONP 'https://api.github.com/repos/baael/czyde/git/trees/'+@sha, (data)->
      @listFiles(data)

  currentSha: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()


$(document).ready ->
  api = new Api()
  api.getLastSha();

  