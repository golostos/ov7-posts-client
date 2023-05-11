import { useEffect, useState } from 'react'
import MainMenu from './components/MainMenu'
import MainComponent from './components/MainComponent'
import LinkContext from './services/linkContext'

function App() {
  const [link, setLink] = useState('/')
  return (
    <LinkContext.Provider value={[link, setLink]} >
      <MainMenu />
      <MainComponent />
    </LinkContext.Provider>
  )
}

export default App
