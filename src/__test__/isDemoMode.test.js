describe('isDemoMode', () => {
  const originalEnv = process.env

  afterEach(() => {
    process.env = originalEnv
    jest.resetModules()
  })

  it('returns true when VITE_DEMO_MODE is "true"', async () => {
    process.env = { ...originalEnv, VITE_DEMO_MODE: 'true' }
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(true)
  })

  it('returns false when VITE_DEMO_MODE is empty', async () => {
    process.env = { ...originalEnv, VITE_DEMO_MODE: '' }
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(false)
  })

  it('returns false when VITE_DEMO_MODE is undefined', async () => {
    process.env = { ...originalEnv }
    delete process.env.VITE_DEMO_MODE
    const { isDemoMode } = await import('@/utils/isDemoMode')
    expect(isDemoMode).toBe(false)
  })
})
