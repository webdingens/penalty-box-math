import React from 'react'
import {useLocation} from 'react-router-dom'
import SettingsMenu from './SettingsMenu'
import Help from './Help'
import FullScreenToggle from './FullScreenToggle'

function Layout({children}) {
  const location = useLocation();

  return (
    <main>
      {children}

      {location.pathname !== '/' ? (
        <>
          <SettingsMenu />
          <Help />
          <FullScreenToggle />
        </>
      ) : null}
    </main>
  )
}

export default Layout