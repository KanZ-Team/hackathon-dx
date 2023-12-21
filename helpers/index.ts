export const chain = (...promises: any[]) => {
  return promises.reduce((promise, next) => {
    return promise.then(next)
  }, Promise.resolve())
}
