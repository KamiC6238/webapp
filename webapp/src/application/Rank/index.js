import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getRankList } from './store/actionCretors'
import { filterIndex, filterIdx } from '../../api/utils'
import RankList from './rankList'
import { Container } from './style'
import Scroll from '../../components/Scroll/index'

const Rank  = props => {
  const { rankList, loading } = props
  const { getRankListDataDispatch } = props

  let rankListJS = rankList.toJS()
  let globalStartIndex = filterIndex(rankListJS)
  let officialList = rankListJS.slice(0, globalStartIndex)
  let globalList = rankListJS.slice(globalStartIndex)
  let displayStyle = loading ? {'display': 'none'} : {'display': ''}

  const enterDetail = name => {
    const idx = filterIdx(name)
    if (idx === null) {
      alert('暂无相关数据')
      return
    }
  }

  useEffect(() => {
    if (!rankListJS.length) {
      getRankListDataDispatch()
    }
  }, [])


  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}>官方榜</h1>
          <RankList list={officialList} enterDetail={enterDetail} />
          <h1 className="global" style={displayStyle}>全球榜</h1>
          <RankList list={globalList} global={true} enterDetail={enterDetail} />
        </div>
      </Scroll>
    </Container>
  )
}

const mapStateToProps = state => ({
  rankList: state.getIn(['rank', 'rankList']),
  loading: state.getIn(['rank', 'loading'])
})

const mapDispatchToProps = dispatch => ({
  getRankListDataDispatch () {
    dispatch(getRankList())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Rank))