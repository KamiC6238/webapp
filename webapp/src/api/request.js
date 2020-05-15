import { axiosInstance } from './config'

// 推荐页banner
export const getBannerRequest = () => {
  return axiosInstance.get('/banner')
}

// 推荐页
export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}

// 歌手列表--获取热门歌手
export const getHotSingerListRequest = count => {
  return axiosInstance.get(`/top/artists?offset=${count}`)
}

export const getSingerListRequest = (category, alpha, count) => {
  return axiosInstance({
    url: '/artist/list',
    method: 'get',
    params: {
      category,
      initial: alpha.toLowerCase(),
      offset: count
    }
  })
}

export const getRankListRequest = () => {
  return axiosInstance.get('/toplist/detail')
}

export const getAlbumDetailRequest = id => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}