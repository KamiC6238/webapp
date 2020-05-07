import React from 'react'
import {
  ListWrapper,
  ListItem,
  List
} from './style'
import { getCount } from '../../api/utils'
import LazyLoad from 'react-lazyload'
import { withRouter } from 'react-router-dom'

// RecommendList是Recommend的子组件，子组件的props指的是父组件传过来的值
// 所以RecommendList是没有location, history, match这些属性的
// 但在导出的时候，可以通过withRouter(RecommendList)来获得上述的属性
// 这样就可以在子组件中使用history.push进行页面跳转了
const RecommendList = props => {
  const enterDetail = id => {
    props.history.push(`/recommend/${id}`)
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          props.recommendList.map((item, index) => {
            return (
              <ListItem
                key={item.id + index}
                onClick={() => enterDetail(item.id)}
              >
                <div className="img_wrapper">
                  <div className="decorate"></div>
                  {/* 图片懒加载, placeholder是未加载图片时的占位符 */}
                  <LazyLoad placeholder={<img src={require('./music.png')} width="100%" height="100%" alt="music"/>}>
                    <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                  </LazyLoad>
                  <div className="play_count">
                    <i className="iconfont play">&#xe60c;</i>
                    <span className="count">{getCount(item.playCount)}</span>
                  </div>
                </div>
                <div className="desc">{item.name}</div>
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(withRouter(RecommendList))