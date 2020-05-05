import React from 'react'
import {
  List,
  ListItem,
} from './style'
import SongListComponent from './songList'

const RankList = props => {
  const { list, global } = props
  const { enterDetail } = props
  return (
    <List globalRank={global}>
      {
        list.map(item => {
          return (
            <ListItem
              key={item.coverImgId}
              tracks={item.tracks}
              onClick={() => enterDetail(item.name)}
            >
              <div className="img_wrapper">
                <img src={item.coverImgUrl} alt="" />
                <div className="decorate"></div>
                <span className="update_frequency">{item.updateFrequency}</span>
              </div>
              {/*
                官方榜的歌曲有tracks数据，而全球榜的没有，
                所以SongListComponent组件根据是由拥有tracks
                来判断是否渲染这个组件 
               */}
              <SongListComponent list={item.tracks} />
            </ListItem>
          )
        })
      }
    </List>
  )
}

export default React.memo(RankList)