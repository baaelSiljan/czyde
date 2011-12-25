class Api
  constructor: ->
    @address = "https://api.github.com/repos/baael/czyde/"

  commits: ->
    self = @
    data: {
      url: "https://api.github.com/repos/baael/czyde/commits"
      dataType: "jsonp"
      success: (data) ->
        self.getLastCommit(data)
      }
    $.ajax(data)
  
  getLastCommit: (data)->
    console.log(data[0].sha)
     

$(document).ready ->
  api = new Api()
  