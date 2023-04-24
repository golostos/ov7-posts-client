import { useState } from 'react'
import { Button } from '@mui/material'
import MainMenu from './components/MainMenu'
import Input from './components/Input'
import Finger from './components/Finger'
import IconCheckboxes from './components/IconCheckboxes'

function App() {

  return (
    <>
      <MainMenu />
      <Input />
      <Finger />
      <IconCheckboxes />
    </>
  )
}

export default App
