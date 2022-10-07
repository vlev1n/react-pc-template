import React from 'react'
import './Result.less'
import { Result, Button } from 'antd'

class ResultComp extends React.Component {
  render() {
    return (
      <Result
        status="success"
        title="欢迎来到React世界"
        subTitle="Welcome to the React world"
        extra={[
          <Button
            key="console"
            onClick={() => {
              window.history.go(-1)
            }}
          >
            Go Back
          </Button>,
        ]}
      />
    )
  }
}
export default ResultComp
