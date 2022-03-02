import React from 'react'

export const initialMainState = {
    language: 'en',
    connected: false,
}

export const MainReducer = (state, action) => {
    switch(action.type) {
        case "change_language": {
            return {
                ...state, language: action.value
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

 