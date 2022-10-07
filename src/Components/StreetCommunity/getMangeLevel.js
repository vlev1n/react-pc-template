import { request } from '@/utils/request'

// 获取权限接口/获取街道
function queryCustType() {
  return request.post(
    `/community-baseinfo-saas/community-house/houseManage/queryCustType`
  )
}

export const MangeLevel = async () => {
  let levelObj = {
    streetList: [],
    communityList: [],
    streetCode: '',
    communityCode: '',
    org_type: '',
  }
  const userConfig = await queryCustType()
  levelObj.org_type = userConfig.communtiy_org_type

  if (userConfig.communtiy_org_type === '1') {
    // 区级账号
    levelObj.streetList = userConfig.streetList
    return levelObj
  } else if (userConfig.communtiy_org_type === '2') {
    // 街道级账号
    let streetObj = {
      street: userConfig.street,
      streetCode: userConfig.streetCode,
    }
    levelObj.streetList = [streetObj]
    levelObj.streetCode = userConfig.streetCode
    return levelObj
  } else {
    // 社区级账号
    let streetObj = {
      street: userConfig.street,
      streetCode: userConfig.streetCode,
    }
    let communityObj = {
      communityCode: userConfig.communityCode,
      communityName: userConfig.communityName,
    }
    levelObj.streetList = [streetObj]
    levelObj.communityList = [communityObj]
    levelObj.streetCode = userConfig.streetCode
    levelObj.communityCode = userConfig.communityCode
    return levelObj
  }
}
