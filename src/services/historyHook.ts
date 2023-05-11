import { useContext, useEffect } from 'react'
import LinkContext from './linkContext'

export default function useHistory() {
  const [link, setLink] = useContext(LinkContext)
  useEffect(() => {
    if (document.location.pathname !== link)
      history.pushState({ page: link }, '', link)
  }, [link])
  useEffect(() => {
    function popHandler(event: PopStateEvent) {
      const state = event.state
      setLink(state.page)
    }
    window.addEventListener('popstate', popHandler);
    return () => {
      window.removeEventListener('popstate', popHandler);
    }
  }, [])
}