import React, { useState, useEffect } from 'react'
import Horizen from '../../baseUI/Horizon-Item/index'
import { categoryTypes, alphaTypes } from '../../api/config'
import { NavContainer } from './style'
import SingerList from './singerList'
import { connect } from 'react-redux'
import {
  getSingerList,
  getHotSingerList,
  changeEnterLoading,
  changePageCount,
  changePullUpLoading,
  changePullDownLoading,
  refreshMoreHotSingerList
} from './store/actionCreators'

const Singers = props => {
  let [category, setCategory] = useState('')
  let [alpha, setAlpha] = useState('')

  const { singerList, pullUpLoading, pullDownLoading, pageCount } = props
  const {
    getHotSingerDispatch,
    updateDispatch,
    pullUpRefreshDispatch,
    pullDownRefreshDispatch
  } = props

  useEffect(() => {
    if (!singerList.size) {
      getHotSingerDispatch()
    }
  }, [])

  let handleUpdateAlpha = val => {
    setAlpha(val)
    updateDispatch(category, val)
  }
  let handleUpdateCategory = val => {
    setCategory(val)
    updateDispatch(val, alpha)
  }

  const singerListJS = singerList.toJS()

  return (  
    <NavContainer>
      <Horizen
        list={categoryTypes}
        title={"分类(默认热门):"}
        handleClick={handleUpdateCategory}
        oldVal={category}
      />
      <Horizen
        list={alphaTypes}
        title={"首字母:"}
        handleClick={handleUpdateAlpha}
        oldVal={alpha}
      />
      <SingerList
        singerList={singerListJS}
        pullUpRefreshDispatch={pullUpRefreshDispatch}
        pullDownRefreshDispatch={pullDownRefreshDispatch}
        pullUpLoading={pullUpLoading}
        pullDownLoading={pullDownLoading}
        pageCount={pageCount}
        category={category}
        alpha={alpha}
      />
    </NavContainer>
  )
}

const mapStateToProps = state => ({
  singerList: state.getIn(['singers', 'singerList']),
  enterLoading: state.getIn(['singers', 'enterLoading']),
  pullUpLoading: state.getIn(['singers', 'pullUpLoading']),
  pullDownLoading: state.getIn(['singers', 'pullDownLoading']),
  pageCount: state.getIn(['singers', 'pageCount'])
})

const mapDispatchToProps = dispatch => ({
  getHotSingerDispatch () {
    dispatch(getHotSingerList())
  },
  updateDispatch (category, alpha) {
    dispatch(changePageCount(0))
    dispatch(changeEnterLoading(true))
    dispatch(getSingerList(category, alpha))
  },
  pullUpRefreshDispatch (category, alpha, hot, count) {
    dispatch(changePullUpLoading(true))
    dispatch(changePageCount(count + 1))
    if (hot) {
      dispatch(refreshMoreHotSingerList())
    } else {
      dispatch(refreshMoreHotSingerList(category, alpha))
    }
  },
  pullDownRefreshDispatch (category, alpha) {
    dispatch(changePullDownLoading(true))
    dispatch(changePageCount(0))
    if (!category && !alpha) {
      dispatch(getHotSingerList())
    } else {
      dispatch(getSingerList(category, alpha))
    }
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Singers))