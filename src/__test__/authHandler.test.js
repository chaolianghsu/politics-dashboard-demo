import { getToken } from '@/apis/source/auth'

// MSW server is already started in setupTests.js

describe('Mock Auth Handler — DEMO_ACCOUNTS', () => {
  it('allows login with demo@dailyview.tw / demo123', async () => {
    const res = await getToken({ email: 'demo@dailyview.tw', password: 'demo123' })
    expect(res).toHaveProperty('access')
    expect(res).toHaveProperty('refresh')
  })

  it('allows login with admin / admin (dev account preserved)', async () => {
    const res = await getToken({ email: 'admin', password: 'admin' })
    expect(res).toHaveProperty('access')
    expect(res).toHaveProperty('refresh')
  })

  it('rejects wrong password', async () => {
    await expect(
      getToken({ email: 'demo@dailyview.tw', password: 'wrong' }),
    ).rejects.toThrow()
  })

  it('rejects unknown account', async () => {
    await expect(
      getToken({ email: 'unknown@test.com', password: 'test' }),
    ).rejects.toThrow()
  })
})
