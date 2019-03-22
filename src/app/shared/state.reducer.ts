import { ActionReducer } from '@ngrx/store';
import { INITIAL_STATE, NEW_ITEM } from './state.temp';

export const STATE_ACTIONS = {
    SET_PROGRESS: 'SET_PROGRESS',
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM'
}

export const stateReducer: ActionReducer<any> = (state = INITIAL_STATE, action: { type: string, payload?: any }) => {
    switch (action.type) {
        case STATE_ACTIONS.SET_PROGRESS:
            return {
                ...state,
                progress: action.payload
            }
        case STATE_ACTIONS.ADD_ITEM:
            return {
                ...state,
                todos: [...state.todos, NEW_ITEM]
            }
        case STATE_ACTIONS.REMOVE_ITEM:
            let remain = state.todos.filter(todo => todo.id !== action.payload);
            return {
                ...state,
                todos: remain
            }
        default:
            return state;
    }
};