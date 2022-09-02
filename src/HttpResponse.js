export default class HttpResponse {
  constructor (statusCode, body) {
    this.statusCode = statusCode
    this.body = body
  }

  getStatusCode () {
    return this.statusCode
  }

  getBody () {
    return this.body
  }
}
