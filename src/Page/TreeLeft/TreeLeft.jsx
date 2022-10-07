import React from 'react'
import CommunityTree from '../../Components/CommunityTree/CommunityTree'

class TreeLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  getList = (id, org_id) => {
    console.log(id, org_id)
  }
  render() {
    return <CommunityTree getList={this.getList} />
  }
}

export default TreeLeft
