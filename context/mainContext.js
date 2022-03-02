import { createContext, useState, useContext, useMemo, useReducer } from "react";
import { MainReducer, initialMainState} from './mainReducer'

const MainContext = createContext()

export const MainProvider = ({children}) => {

    const [state, dispatch ] = useReducer(MainReducer, initialMainState)

    const mainContextValue = {state, dispatch}
    

    return ( <MainContext.Provider value={mainContextValue}>{children}</MainContext.Provider>)
}


export const useMainContext = () => {
    const context = useContext(MainContext)
    if (!context) throw new Error('Not inside provider coverage')
    return context
}

