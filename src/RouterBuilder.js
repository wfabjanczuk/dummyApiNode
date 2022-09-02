import Router from './Router.js'
import HttpResponse from './HttpResponse.js'
import AccountsClient from './client/AccountsClient.js'
import { Configuration } from '@livechat/lc-sdk-js'

export default class RouterBuilder {
  constructor (config) {
    this.config = config
  }

  getAppRouter () {
    const router = new Router()
    const accountsClient = new AccountsClient(this.config)

    router.registerGET('', async () => {
      return new HttpResponse(200, 'Bot Proxy Node v1.0')
    })

    router.registerGET('/install', async (req) => {
      const accessToken = await accountsClient.getAccessToken(req.searchParams.get('code'))
      if (accessToken === undefined) {
        return null
      }
      this.config.setAccessToken(accessToken)

      const configurationApi = new Configuration.Web(
        this.config.clientId,
        this.config.createTokenGetter(),
        { apiUrl: this.config.baseApiUrl }
      )
      configurationApi.createAgent('smith@example5.com', {
        name: 'Agent Smith',
        groups: [{
          id: 0,
          priority: 'first'
        }]
      }).then(res => console.log(res))
        .catch(err => console.error(err))

      return new HttpResponse(200, 'Bot Proxy Node v1.0')
    })

    return router
  }
}
