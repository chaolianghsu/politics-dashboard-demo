const secret = 'secret'

export const genToken = (validPeriod = 300000) => {
  const iat = Date.now()
  const exp = iat + validPeriod
  return [iat, exp, secret].join(',')
}

export const tokenValidation = (token = '') => {
  if (typeof token !== 'string') {
    return { success: false, message: 'Token invalid.' }
  }

  const tokenDecoded = token.split(',')
  if (tokenDecoded[2] !== secret) {
    return { success: false, message: 'Token invalid.' }
  }

  console.log(tokenDecoded[1], Date.now())

  if (tokenDecoded[1] <= Date.now()) {
    return { success: false, message: 'Token expired.' }
  }

  return { success: true, message: '' }
}

export const authVerification = (req, res, ctx, next = () => {}) => {
  const auth = req.headers.get('authorization')
  const { success, message } = tokenValidation(auth)

  if (success !== true) {
    return res(
      ctx.status(401),
      ctx.json({
        detail: message,
      }),
    )
  }
  return next(req, res, ctx)
}
