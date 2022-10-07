export class ResponsiveView {
  constructor() {
    this.deviceType = ''
    this.setRem()
  }
  setRem() {
    const stdWidth = 1920 - 80 // 减去80px侧栏
    const stdHeight = 1080 - 1080 * 0.08 // 减去8vh顶栏
    const stdAspectRatio = parseFloat((stdWidth / stdHeight).toFixed(2))

    const { innerWidth, innerHeight } = window

    const actualWidth = innerWidth / devicePixelRatio
    const actualHeight = innerHeight / devicePixelRatio
    const actualAspectRatio = parseFloat((innerWidth / innerHeight).toFixed(2))

    const { style } = document.querySelector('html')
    let pixelsForOneRem = 16

    if (innerHeight < stdHeight) {
      // vlevin @ 2022-03-24 高度小于1080
      pixelsForOneRem = actualHeight / (stdHeight / 16)
      // style.overflowX = 'hidden'
      this.deviceType = '1080P'
    } else if (actualAspectRatio > 16 / 9) {
      // vlevin @ 2021-11-22 比例超过16:9，视为双屏，以高度为准
      this.deviceType = '双4K'
      // pixelsForOneRem = actualHeight / (768 / 16)
      pixelsForOneRem = actualHeight / (stdHeight / 16)
      style.overflowY = 'hidden'
    } else if (actualAspectRatio > stdAspectRatio) {
      // vlevin @ 2020-11-10 视窗宽度有余，高度不足，应竖向滚动
      pixelsForOneRem = actualWidth / (stdWidth / 16)
      // style.overflowX = 'hidden'
    } else {
      // vlevin @ 2020-11-10 视窗高度有余，宽度不足，应横向滚动
      pixelsForOneRem = actualHeight / (stdHeight / 16)
      // style.overflowY = 'hidden'
    }
    style.fontSize = `${pixelsForOneRem}px`
  }
}

export function getPixel(value) {
  const rootFontSize = document.querySelector('html').style.fontSize
  const pixelForOneRem = parseFloat(rootFontSize)
  return value * (pixelForOneRem / 16)
}
