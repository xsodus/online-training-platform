import { useContext } from 'react'
import { SessionStateContext } from '../components/context/SessionProvider'
import isString from 'lodash/isString'
const useSession = history => {
  const sessionContext = useContext(SessionStateContext)

  if (sessionContext.session === null) {
    if (history) history.push('/login')
    return null
  } else {
    if (isString(sessionContext.session)) {
      sessionContext.session = JSON.parse(sessionContext.session)
    }
    return sessionContext
  }
}

export default useSession
