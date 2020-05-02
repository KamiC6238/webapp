import React from 'react'
import { LoadingWrapper } from './style'

const Loading = () => {
  return (
    <LoadingWrapper>
      <div></div>
      <div></div>
    </LoadingWrapper>
  )
}

export default React.memo(Loading)