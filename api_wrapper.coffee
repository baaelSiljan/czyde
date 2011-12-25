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
    console.log(data.data[0].sha)


$(document).ready ->
  @api = new Api()
  @api.getLastSha();
  