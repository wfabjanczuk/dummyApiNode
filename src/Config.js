import { config } from 'dotenv'

export default class Config {
  constructor () {
    config()

    this.organizationId = process.env.BOT_PROXY_ORGANIZATION_ID
    this.accountId = process.env.BOT_PROXY_ACCOUNT_ID
    this.pat = process.env.BOT_PROXY_PAT
    this.clientId = process.env.BOT_PROXY_CLIENT_ID
    this.secretKey = process.env.BOT_PROXY_SECRET_KEY
    this.baseAccountsUrl = process.env.BOT_PROXY_BASE_ACCOUNTS_URL
    this.baseApiUrl = process.env.BOT_PROXY_BASE_API_URL
    this.baseAppUrl = process.env.BOT_PROXY_BASE_APP_URL
  }

  setAccessToken (accessToken) {
    this.accessToken = accessToken
  }

  createTokenGetter () {
    const token = {
      accessToken: this.accessToken,
      organizationID: this.organizationId,
      region: this.accessToken.split(':')[0]
    }

    return () => token
  }
}
