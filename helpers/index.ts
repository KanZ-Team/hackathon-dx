export const chain = (...promises: any[]) => {
  return promises.reduce((promise, next) => {
    return promise().then(next)
  }, Promise.resolve)
}

const dot2 = (old: { x: number; y: number }, x: number, y: number) =>
  (old?.x || 0) * x + (old?.y || 0) * y
const perm = new Array(512)
const gradP = new Array(512)
const fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a: number, b: number, t: number) => (1 - t) * a + t * b

export const perlin = (x: number, y = 1) => {
  // Find unit grid cell containing point
  var X = Math.floor(x),
    Y = Math.floor(y)
  // Get relative xy coordinates of point within that cell
  x = x - X
  y = y - Y
  // Wrap the integer cells at 255 (smaller integer period can be introduced here)
  X = X & 255
  Y = Y & 255

  // Calculate noise contributions from each of the four corners
  var n00 = dot2(gradP[X + perm[Y]], x, y)
  var n01 = dot2(gradP[X + perm[Y + 1]], x, y - 1)
  var n10 = dot2(gradP[X + 1 + perm[Y]], x - 1, y)
  var n11 = dot2(gradP[X + 1 + perm[Y + 1]], x - 1, y - 1)

  // Compute the fade curve value for x
  var u = fade(x)

  // Interpolate the four results
  return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y))
}
