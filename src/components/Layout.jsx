import React, {useContext, Suspense} from 'react'
import {Context as SettingsContext, modes} from '../SettingsContext'
import SettingsMenu from './SettingsMenu'
import Help from './Help'
import FullScreenToggle from './FullScreenToggle'

const ModeStopwatchOverlay = React.lazy(() => import('../mode/ModeStopwatchOverlay/ModeStopwatchOverlay'))
const ModeSheet = React.lazy(() => import('../mode/ModeSheet/ModeSheet'))

function Layout() {
  const state = useContext(SettingsContext);

  let modeComponent;

  switch (state.mode) {
    case  modes.STOPWATCH_OVERLAY:
      modeComponent = <ModeStopwatchOverlay />
      break
    case  modes.SHEET:
      modeComponent = <ModeSheet />
      break
    default:
      modeComponent = <p>Undefined Component: {state.mode}</p>
      break
  }

  return (
    <main>
      <Suspense>
        {modeComponent}
      </Suspense>

      <SettingsMenu />
      <Help />
      <FullScreenToggle />
    </main>
  )
}

export default Layout