import { combineReducers } from 'redux'

import appReducers from '@/pages/index/model'
import loginReducers from '@/pages/login/model'
import clueReducers from '@/pages/clue/model'

export default combineReducers({
  appReducers,
  loginReducers,
  clueReducers,
})
