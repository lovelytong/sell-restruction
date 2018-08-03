import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://ustbhuangyi.com/sell/api',
  timeout: 5000,
  headers: {'X-Custom-Header': 'foobar'}
})

export default {
  getData: async function ({state}, payload) {
    try {
      const response = await instance.get(payload.url)
      return response.data
    } catch (error) {
      console.log(error)
    }
  },
  postData: async function (context, payload) {
    try {
      const response = await instance.post(payload.url, payload.param)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

}
