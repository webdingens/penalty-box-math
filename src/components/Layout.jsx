import {useContext} from 'react'
import {Context as SettingsContext, modes} from '../SettingsContext'
import ModeStopwatchOverlay from '../mode/ModeStopwatchOverlay'
import SettingsMenu from './SettingsMenu'
import Help from './Help'

function Layout() {
  const state = useContext(SettingsContext);

  let modeComponent;

  switch (state.mode) {
    case  modes.STOPWATCH_OVERLAY:
      modeComponent = <ModeStopwatchOverlay />
      break
    default:
      modeComponent = <p>Undefined Component: {state.mode}</p>
      break
  }

  return (
    <main>
      {modeComponent}

      <SettingsMenu />
      <Help />
    </main>
  )
}

export default Layout