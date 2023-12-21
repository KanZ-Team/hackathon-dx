export const chain = (...promises: any[]) => {
  return promises.reduce((promise, next) => {
    return promise().then(next)
  }, Promise.resolve)
}

export const perlin = (x: number, y = 1) => {
  let m_z = 36969 * (x & 65535) + (x >> 16)
  let m_w = 18000 * (y & 65535) + (y >> 16)
  let ou = (m_z << 16) + m_w
  return (ou + 1.0) * 2.328306435454494e-10
}
