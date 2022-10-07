import { HashRouter, Routes, Route } from 'react-router-dom'
import { debounce } from 'debounce'

import Main from './Page/Main/Main'
import Detail from './Page/Detail/Detail'
import TreeLeft from './Page/TreeLeft/TreeLeft'

export function RouteMap() {
  window.onresize = debounce(() => {
    location.reload()
  }, 200)

  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Main></Main>}></Route>
        <Route path="/detail" element={<Detail></Detail>}></Route>
        <Route path="/tree-left" element={<TreeLeft></TreeLeft>}></Route>
      </Routes>
    </HashRouter>
  )
}
