import React from 'react'
import { SongList } from './style'

const SongListComponent = props => {
  const { list } = props
  // 这个list就是tracks， 全球榜没有这个数据，所以如果是全球榜的话，就返回null
  // 表示不渲染组件
  return list.length ? (
    <SongList>
      {
        list.map((item, index) => {
          return (
            <li key={index}>
              {index+1}. {item.first} - {item.second}
            </li>
          )
        })
      }
    </SongList>
  ) : null
}

export default React.memo(SongListComponent)