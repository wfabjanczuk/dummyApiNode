import axios from 'axios'

export default class AccountsClient {
  constructor (config) {
    this.config = config
  }

  async getAccessToken (code) {
    const params = new URLSearchParams()

    params.append('grant_type', 'authorization_code')
    params.append('code', code)
    params.append('client_id', this.config.clientId)
    params.append('client_secret', this.config.secretKey)
    params.append('redirect_uri', this.config.baseAppUrl + '/install')

    const url = this.config.baseAccountsUrl + '/token?' + params.toString()

    const accessToken = await axios.post(url)
      .then(res => res.data.access_token)
      .catch((err) => console.error(err))

    return accessToken
  }
}
