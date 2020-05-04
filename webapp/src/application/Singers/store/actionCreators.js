import {
  getHotSingerListRequest,
  getSingerListRequest
} from '../../../api/request'
import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const changeSingerList = data => ({
  type: actionTypes.CHANGE_SINGER_LIST,
  data: fromJS(data)
})

export const changePageCount = data => ({
  type: actionTypes.CHANGE_PAGE_COUNT,
  data: fromJS(data)
})

export const changeEnterLoading = data => ({
  type: actionTypes.CHANGE_ENTER_LOADING,
  data
})

export const changePullUpLoading = data => ({
  type: actionTypes.CHANGE_PULLUP_LOADING,
  data
})

export const changePullDownLoading = data => ({
  type: actionTypes.CHANGE_PULLDOWN_LOADING,
  data
})

// 首次加载热门歌手
export const getHotSingerList = () => {
  return dispatch => {
    getHotSingerListRequest(0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(() => {
      console.log('热门歌手数据获取失败')
    })
  }
}

// 加载更多热门歌手
export const refreshMoreHotSingerList = () => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getHotSingerListRequest(pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(() => {
      console.log('热门歌手获取数据失败')
    })
  }
}

// 首次加载对应类型的歌手
export const getSingerList = (category, alpha) => {
  return dispatch => {
    getSingerListRequest(category, alpha, 0).then(res => {
      const data = res.artists
      dispatch(changeSingerList(data))
      dispatch(changeEnterLoading(false))
      dispatch(changePullDownLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}

// 加载更多对应类型歌手
export const refreshMoreSingerList = (category, alpha) => {
  return (dispatch, getState) => {
    const pageCount = getState().getIn(['singers', 'pageCount'])
    const singerList = getState().getIn(['singers', 'singerList']).toJS()
    getSingerListRequest(category, alpha, pageCount).then(res => {
      const data = [...singerList, ...res.artists]
      dispatch(changeSingerList(data))
      dispatch(changePullUpLoading(false))
    }).catch(() => {
      console.log('歌手数据获取失败')
    })
  }
}