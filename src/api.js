import update from 'immutability-helper'


const ResponseHandler = function (options) {
    this.prepareForRequest = options.prepareForRequest || function () {}

    this.handleResponse = function (resp, data) {
        if (resp && resp.status === 401) {
            // FIXME: Add handling of 401 for authorization errors by login out
            // user.
            console.log('FIXME: do something about authorization errors.')
        }
        return options.handleResponse(resp, data)
    }
}

export const ResponseHandlerBuilder = function (handleResponse) {
    var _prepareForRequest = null

    this.build = function () {
        return new ResponseHandler({
            prepareForRequest: _prepareForRequest,
            handleResponse: handleResponse,
        })
    }

    this.withPrepareForRequest = function (prepareForRequest) {
        _prepareForRequest = prepareForRequest
        return this
    }
}


function _callApi(endpoint, options, handler, resolve) {
  var defaultHeaders = {
    'Accept': 'application/json',
  }

  options = update({headers: {}}, {$merge: options})
  options.headers = update(options.headers, {$merge: defaultHeaders})

  handler.prepareForRequest()

  const processResponse = (response) => {
    response.json().then((data) => {
      handler.handleResponse(response, data)
      resolve()
    })
  }

  return fetch(endpoint, options).then(processResponse)
}


export function post(endpoint, data, handler) {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }

        _callApi(endpoint, options, handler, resolve)
    })
}
