import styled from '@emotion/styled'
import { Outlet } from 'react-router-dom'

export function App() {
  return (
    <Root className="min-h-screen p-4 pt-0 flex flex-col">
      <Outlet></Outlet>
    </Root>
  )
}

const Root = styled.div`
  background: #f5f5f5;
`
