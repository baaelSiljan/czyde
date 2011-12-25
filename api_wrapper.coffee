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
    @getJSONP('https://api.github.com/repos/baael/czyde/commits', @currentSha)

  listFiles: (data)->
    console.log data.data

  getFilesInPreview: ->
    console.log(@sha)
    @getJSONP('https://api.github.com/repos/baael/czyde/git/trees/'+@sha, @listFiles)

  currentSha: (data)->
    @sha=data.data[0].sha
    @getFilesInPreview()


$(document).ready ->
  @api = new Api()
  @api.getLastSha();

  