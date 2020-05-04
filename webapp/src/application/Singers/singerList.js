import React from 'react'
import Scroll from '../../components/Scroll/index'
import { List, ListItem, ListContainer } from './style'
import LazyLoad, { forceCheck } from 'react-lazyload'

const SingerList = props => {
  const { singerList, pageCount, category, alpha } = props
  const { pullUpRefreshDispatch, pullDownRefreshDispatch, pullUpLoading, pullDownLoading } = props

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  };

  return (
    <ListContainer>
      <Scroll
        pullUp={handlePullUp}
        pullDown={handlePullDown}
        pullUpLoading={pullUpLoading}
        pullDownLoading={pullDownLoading}
        onScroll={forceCheck}
      >
        <List>
          {
            singerList.map((item, index) => {
              return (
                <ListItem key={item.accountId+''+index}>
                  <div className="img_wrapper">
                    <LazyLoad placeholder={<img width="100%" height="100%" src={require('./singer.png')} alt="music"/>}>
                      <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                    </LazyLoad>
                  </div>
                  <span className="name">{item.name}</span>
                </ListItem>
              )
            })
          }
        </List>
      </Scroll>
    </ListContainer>
  )
}

export default React.memo(SingerList)