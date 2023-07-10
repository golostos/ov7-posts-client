import { useRef, useState } from 'react'
import MainMenu from './components/MainMenu'
import MainComponent from './components/MainComponent'
import LinkContext from './services/linkContext'
import { RevalidateProvider } from './services/revalidateContext'

function App() {
  const [link, setLink] = useState('/')
  // useRef + context
  // const [revalidate, setRevalidate] = useState<(() => void) | null>(null)
  const revalidateRef = useRef(null)
  const [filter, setFilter] = useState('')
  return (
    <LinkContext.Provider value={[link, setLink]} >
      <RevalidateProvider value={revalidateRef}>
        <MainMenu filter={filter} setFilter={setFilter} />
        <MainComponent filter={filter} />
      </RevalidateProvider>
    </LinkContext.Provider>
  )
}

export default App
