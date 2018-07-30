import {getData} from '../app/api'

describe('#getUser() using Promises', () => {
  it('should load user data', () => {
    return getData()
    .then(({data}) => {
      expect(data).toBeDefined()
      expect(data.base).toBe('USD')
    })
  })
})