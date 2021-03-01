
import { createReducer } from '@reduxjs/toolkit'
import { Action } from '../../types/types';
import { ActionType } from '../constants';
import { GetUsersDonePayload, State } from '../types';

export const initialState: State = {
    isLoading: true,
    users: [],
    page: 1,
    per_page: 6,
    totalCount: 0,
    totalPages: 0
}

function getUsersRequest(state: State): State {
    const { isLoading } = state;
    if (!isLoading) {
        return {
            ...state,
            isLoading: true
        };
    }
    return state;
}


function getUsersCancel(state: State): State {
    const { isLoading } = state;
    if (isLoading) {
        return {
            ...state,
            isLoading: false

        };
    }
    return state;
}



function getUsersDone(state: State, { payload }: Action<GetUsersDonePayload>): State {
    const { isLoading } = state;

    if (isLoading) {
        return {
            ...state,
            users: payload.data,
            per_page: payload.per_page,
            page: payload.page,
            totalCount: payload.total,
            totalPages: payload.total_pages,
            isLoading: false
        };
    }
    return state;
}



export default createReducer<State>(initialState, {
    [ActionType.GET_USERS_REQUEST]: getUsersRequest,
    [ActionType.GET_USERS_CANCEL]: getUsersCancel,
    [ActionType.GET_USERS_DONE]: getUsersDone
})