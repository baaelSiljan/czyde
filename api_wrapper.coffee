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

  currentSha: (data)->
    @sha||=data.data[0].sha

  getFilesInPreview: ->
    @getJSONP('https://api.github.com/repos/baael/czyde/git/trees/'+@sha, @listFiles)

  listFiles: (data)->
    console.log data.data

$(document).ready ->
  @api = new Api()
  @api.getLastSha();
  