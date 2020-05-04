import React, { useRef, useEffect, memo } from 'react'
import Scroll from '../../components/Scroll/index'
import { PropTypes } from 'prop-types'
import {
  List,
  ListItem
} from './style'

const Horizen = props => {
  const { list, oldVal, title, handleClick } = props
  const Category = useRef(null)

  useEffect(() => {
    let categoryDom = Category.current
    let tagElems = categoryDom.querySelectorAll('span')
    let totalWidth = 0
    Array.from(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth
    })
    categoryDom.style.width = `${totalWidth}px`
  }, [])

  return (  
    <Scroll direction={"horizental"}>
      <div ref={Category}>
        <List>
          <span>{title}</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}>
                    {item.name}
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

Horizen.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null
}

Horizen.propTypes = {
  list: PropTypes.array,
  oldVal: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
}

export default memo(Horizen)