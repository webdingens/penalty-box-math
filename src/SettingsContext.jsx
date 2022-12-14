import React, {useCallback, useEffect} from 'react'
export const Context = React.createContext()

export const modes = {
  STOPWATCH_OVERLAY: 'Stopwatch Overlay',
  PROMPT: 'Prompt',
  STOPWATCH_AND_SHEET: 'Stopwatch + Sheet',
  SHEET: 'Sheet',
}

const initialState = {
  splitInput: false,
  mode: modes.STOPWATCH_OVERLAY,
  settingsMenuOpen: false,
  helpOpen: false,
  smallStopwatch: window.innerHeight < 1000,
  virtualNumblock: window.innerWidth < 600,
}

const actions = {
  SET_SPLIT_INPUT: 'SET_SPLIT_INPUT',
  SET_SETTINGS_MENU_OPEN: 'SET_SETTINGS_MENU_OPEN',
  SET_HELP_OPEN: 'SET_HELP_OPEN',
  SET_MODE: 'SET_MODE',
  SET_SMALL_STOPWATCH: 'SET_SMALL_STOPWATCH',
  SET_VIRTUAL_NUMBLOCK: 'SET_VIRTUAL_NUMBLOCK',
}

const reducer = (state, action) => {
  switch (action.type) {
    case actions.SET_SPLIT_INPUT:
      return {
        ...state,
        splitInput: action.splitInput
      };
    case actions.SET_SETTINGS_MENU_OPEN:
      return {
        ...state,
        settingsMenuOpen: action.settingsMenuOpen
      };
    case actions.SET_HELP_OPEN:
      return {
        ...state,
        helpOpen: action.helpOpen
      };
    case actions.SET_MODE:
      return {
        ...state,
        mode: action.mode
      };
    case actions.SET_SMALL_STOPWATCH:
      return {
        ...state,
        smallStopwatch: action.smallStopwatch
      };
    case actions.SET_VIRTUAL_NUMBLOCK:
      return {
        ...state,
        virtualNumblock: action.virtualNumblock
      };
    default:
      return state;
  }
}

// persistence localstorage
const saveState = (state) => localStorage.setItem('settings', JSON.stringify(state))
const loadState = () => {
  const storedState = localStorage.getItem('settings');
  if (!storedState) return initialState
  return Object.assign({}, initialState, JSON.parse(localStorage.getItem('settings')))
}

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  const value = {
    ...state,
    setSplitInput: (splitInput) => {
      dispatch({ type: actions.SET_SPLIT_INPUT, splitInput })
    },
    setSettingsMenuOpen: (settingsMenuOpen) => {
      dispatch({ type: actions.SET_SETTINGS_MENU_OPEN, settingsMenuOpen })
    },
    setHelpOpen: (helpOpen) => {
      dispatch({ type: actions.SET_HELP_OPEN, helpOpen })
    },
    setMode: (mode) => {
      dispatch({ type: actions.SET_MODE, mode })
    },
    setSmallStopwatch: (smallStopwatch) => {
      dispatch({ type: actions.SET_SMALL_STOPWATCH, smallStopwatch })
    },
    setVirtualNumblock: (virtualNumblock) => {
      dispatch({ type: actions.SET_VIRTUAL_NUMBLOCK, virtualNumblock })
    },
  }

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  )
}

export default {
  Provider,
  Context,
  modes
}