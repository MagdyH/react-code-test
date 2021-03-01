import { Dispatch } from 'redux';
import { getUsers } from '../../Api/userApiClient';
import { Action } from '../../types/types';
import { ActionType } from '../constants';
import { FailPayload, GetUserResponse, GetUsersCancelPayload, GetUsersDonePayload, GetUsersRequestPayload, UserResponse } from '../types';

export function getUsersRequest(): Action<GetUsersRequestPayload> {
    return {
        type: ActionType.GET_USERS_REQUEST,
        payload: {
            timestamp: Date.now()
        }
    };
}

export function getUsersCancel(pageNo: number): Action<GetUsersCancelPayload> {
    return {
        type: ActionType.GET_USERS_CANCEL,
        payload: {
            pageNo
        }
    };
}

export function getUsersDone(data: GetUserResponse): Action<GetUsersDonePayload> {
    return {
        type: ActionType.GET_USERS_DONE,
        payload: data
    };
}

export function getUsersFail(error: string): Action<FailPayload> {
    return {
        type: ActionType.GET_USERS_FAIL,
        payload: {
            timestamp: Date.now(),
            error
        }
    };
}

export function getUsersFromApi(pageNo: number): (dispatch: Dispatch) => void {
    return function (dispatch: Dispatch) {
        dispatch(getUsersRequest());

        getUsers(pageNo)
            .then((response: UserResponse) => {
                dispatch(getUsersDone(response.data))
            })
            .catch((error: string) => {
                dispatch(getUsersFail(error))
            })
    }
}