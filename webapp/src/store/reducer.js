import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../application/Recommend/store/index'
import { reducer as SingersReducer } from '../application/Singers/store/index'

export default combineReducers({
  recommend:  recommendReducer,
  singers: SingersReducer,
})