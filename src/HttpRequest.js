export default class HttpRequest {
  constructor (req) {
    const {
      pathname,
      searchParams
    } = new URL(req.url, `https://${req.headers.host}`)

    this.pathname = pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname

    this.method = req.method
    this.searchParams = searchParams
  }
}
