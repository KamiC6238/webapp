import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import {
  getBannerRequest,
  getRecommendListRequest
} from '../../../api/request'

/** 因为state中的数据都是通过immutable转换成不可变对象的，
 *  因此在创建action时, 需要将传递的参数通过fromJS也转换成不可变对象
 *  这是为了跟在reducer里处理state的时候保持数据的一致性,
 *  不过只有引用类型的数据需要用fromJS, 原始数据类型不需要
 * 
 * @param { * } data 请求接口返回的数据 
 */
const changeBannerList = data => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data)
})

const changeRecommendList = data => ({
  type: actionTypes.CHANGE_RECOMMEND_LIST,
  data: fromJS(data)
})

const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const getBannerList = () => {
  return dispatch => {
    getBannerRequest()
    .then(data => {
      dispatch(changeBannerList(data.banners))
    })
    .catch(() => {
      console.log('轮播图数据传输错误')
    })
  }
}

export const getRecommendList = () => {
  return dispatch => {
    getRecommendListRequest()
    .then(data => {
      dispatch(changeRecommendList(data.result))
      dispatch(changeEnterLoading(false))         // 获取完数据后loading变为false
    })
    .catch(() => {
      console.log('推荐歌单数据传输错误')
    })
  }
}