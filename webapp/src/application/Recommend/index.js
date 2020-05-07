import React, { useEffect } from 'react'
import Slider from '../../components/Slider/index'
import RecommendList from '../../components/List/index'
import Scroll from '../../components/Scroll/index'
import { Content } from '../../components/Scroll/style'
import { connect } from 'react-redux'
import { forceCheck } from 'react-lazyload'
import { renderRoutes } from 'react-router-config'
import Loading from '../../baseUI/Loading/index'
import * as actionCreators from './store/actionCreators'

const Recommend = props => {
  const { bannerList, recommendList, enterLoading } = props
  const { getBannerDataDispatch, getRecommendListDataDispatch } = props

  // 使用了[]，确保只会渲染一次，避免造成性能浪费
  // 使用[]是为了模仿componentDidMount这个生命周期
  useEffect(() => {
    // 数据变成immutable形式时，长度用size来获取
    // 用if来判断是因为防止切换路由时重新发送请求，数据只需要在第一次渲染的时候请求即可
    // 避免发送多余请求，也是避免性能浪费
    // 如果需要后端的数据是实时更新的，那么不建议使用这种写法，否则更新后的数据不会被展示出来
    if (!bannerList.size) {
      getBannerDataDispatch()
    }
    if (!recommendList.size) {
      getRecommendListDataDispatch()
    }
  }, [])
  
  // 使用了immutable的时候，在使用数据时如果不使用toJS转换成普通js对象会出错。
  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []
  return (
    <Content>
      {/* 监听滚动事件, 滚动的时候触发事件, 这样之前未加载的图片就能加载出来了 */}
      <Scroll onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes(props.route.routes) }
    </Content>
  )
}

const mapStateToProps = state => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.get('enterLoading'),
})

const mapDispatchToProps = dispatch => ({
  getBannerDataDispatch () {
    dispatch(actionCreators.getBannerList())
  },
  getRecommendListDataDispatch () {
    dispatch(actionCreators.getRecommendList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))