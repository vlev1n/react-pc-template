import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import 'moment/dist/locale/zh-cn'

import { RouteMap } from './RouteMap'

import 'antd/dist/antd.less'
import 'virtual:windi.css'
// import './global.css'
import './App.less'

import { ResponsiveView } from './utils/responsiveView'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { usePxtoremStylisPlugin } from 'pxtorem-stylis-plugin'

const cache = createCache({
  key: 'rem',
  stylisPlugins: [usePxtoremStylisPlugin({ propList: ['*'] })],
})
window.responsiveView = new ResponsiveView()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <CacheProvider value={cache}>
    <ConfigProvider locale={zhCN}>
      <RouteMap></RouteMap>
    </ConfigProvider>
  </CacheProvider>
)
