import { request } from '@/utils/request'

export async function getUserInfo() {
  const res = await request.post('/htime/portal/login/checkToken', {
    app_id: 'eff1e27d-e252-41b6-b2fa-1a46fc600371',
  })
  const { org_info, type } = res.data
  // vlevin @ 2022-05-11 -1市0区1街道2社区
  const level = type === 6 ? -1 : type === 10 ? 0 : type === 18 ? 1 : 2
  const { city_id, city, district_id } = org_info
  return {
    level,
    city_id,
    city,
    district_id,
  }
}
