import React, { useState, useEffect } from 'react'
import { Container, TopDesc, Menu, SongList, SongItem } from './style'
import { CSSTransition } from 'react-transition-group'
import { getName, getCount, isEmptyObject } from '../../api/utils'
import { connect } from 'react-redux'
import { changeEnterLoading, getAlbumList } from './store/actionCreators'
import Header from '../../baseUI/Header/index'
import Scroll from '../../components/Scroll/index'

const Album = props => {
  const [showStatus, setShowStatus] = useState(true)
  const id = props.match.params.id
  const { currentAlbum: currentAlbumImmutable, enterLoading } = props
  const { getAlbumDataDispatch } = props

  useEffect (() => {
    getAlbumDataDispatch(id)
  }, [getAlbumDataDispatch, id])

  const handleBack = () => {
    setShowStatus(false)
  }

  let currentAlbum = currentAlbumImmutable.toJS()

  return (
    <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
    >
      <Container>
        <Header title={'返回'} handleClick={handleBack}></Header>
        {
          !isEmptyObject(currentAlbum) ? 
            <Scroll bounceTop={false}>
              <div>
                <TopDesc background={currentAlbum.coverImgUrl}>
                  <div className="background">
                    <div className="filter"></div>
                  </div>
                  <div className="img_wrapper">
                    <div className="decorate"></div>
                    <img src={currentAlbum.coverImgUrl} alt="" />
                    <div className="play_count">
                      <i className="iconfont play">&#xe60c;</i>
                      <span className="count">
                        {Math.floor(currentAlbum.subscribedCount/1000)/10}万
                      </span>
                    </div>
                  </div>
                  <div className="desc_wrapper">
                    <div className="title">
                      {currentAlbum.name}
                    </div>
                    <div className="person">
                      <div className="avatar">
                        <img src={currentAlbum.creator.avatarUrl} alt="" />
                      </div>
                      <div className="name">{currentAlbum.creator.nickname}</div>
                    </div>
                  </div>
                </TopDesc>
                <Menu>
                  <div>
                    <i className="iconfont">&#xe647;</i>
                    评论
                  </div>
                  <div>
                    <i className="iconfont">&#xe60d;</i>
                    点赞
                  </div>
                  <div>
                    <i className="iconfont">&#xe627;</i>
                    收藏
                  </div>
                  <div>
                    <i className="iconfont">&#xe6f3;</i>
                    更多
                  </div>
                </Menu>
                <SongList>
                  <div className="first_line">
                    <div className="play_all">
                      <i className="iconfont"></i>
                      <span>
                        播放全部
                        <span className="sum">
                          共{currentAlbum.tracks.length}首
                        </span>
                      </span>
                    </div>
                    <div className="add_list">
                      <i className="iconfont"></i>
                      <span>
                        收藏{getCount(currentAlbum.subscribedCount)}
                      </span>
                    </div>
                  </div>
                </SongList>
                <SongItem>
                  {
                    currentAlbum.tracks.map((item, index) => {
                      return (
                        <li key={index}>
                          <span className="index">{index + 1}</span>
                          <div className="info">
                            <span>{item.name}</span>
                            <span>
                              { getName(item.ar) } - { item.al.name }
                            </span>
                          </div>
                        </li>
                      )
                    })
                  }
                </SongItem>
              </div>
            </Scroll>
          : null
        }
      </Container>
    </CSSTransition>
  )
}

const mapStateToProps = state => ({
  currentAlbum: state.getIn(['album', 'currentAlbum']),
  enterLoading: state.getIn(['album', 'enterLoading']),
})

const mapDispatchToProps = dispatch => ({
  getAlbumDataDispatch (id) {
    dispatch(changeEnterLoading(true))
    dispatch(getAlbumList(id))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Album))