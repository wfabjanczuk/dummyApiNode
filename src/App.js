import https from 'https'
import fs from 'fs'
import Config from './Config.js'
import RouterBuilder from './RouterBuilder.js'

export default class App {
  constructor () {
    this.router = new RouterBuilder(new Config()).getAppRouter()
  }

  run () {
    const requestListener = (req, res) => this.router.route(req, res)
    const options = {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.crt')
    }

    const server = https.createServer(options, requestListener)
    server.listen(8080)
  }
}
