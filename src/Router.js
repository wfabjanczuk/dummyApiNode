import HttpRequest from './HttpRequest.js'
import HttpResponse from './HttpResponse.js'

export default class Router {
  constructor () {
    this.routes = {
      GET: {},
      POST: {}
    }
  }

  registerGET (pathname, handler) {
    this.routes.GET[pathname] = handler
  }

  registerPOST (pathname, handler) {
    this.routes.POST[pathname] = handler
  }

  async route (req, res) {
    let httpResponse
    const httpRequest = new HttpRequest(req)
    const m = httpRequest.method
    const p = httpRequest.pathname

    if (m in this.routes && p in this.routes[m]) {
      httpResponse = await this.routes[m][p](httpRequest).catch(err => console.error(err))

      if (httpResponse === undefined) {
        httpResponse = new HttpResponse(500, 'Internal server error')
      }
    } else {
      httpResponse = new HttpResponse(404, 'Route not found')
    }

    res.writeHead(httpResponse.getStatusCode())
    res.end(httpResponse.getBody())
  }
}
