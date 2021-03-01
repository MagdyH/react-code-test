export interface CancelPayload {
    timestamp: number
}

export interface GetUsersCancelPayload {
    pageNo: number
}

export interface FailPayload {
    error: string,
    timestamp: number
}

export interface GetUsersRequestPayload {
    timestamp: number
}

export interface User {
    id: number,
    email: string,
    first_name: string,
    last_name: string,
    avatar: string
}

export interface Support {
    url: string,
    text: string
}

export interface UserResponse {
    data: GetResponse
}

export interface GetResponse {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: User[],
    support: Support
}

export type GetUsersDonePayload = GetResponse;

export interface State {
    users: User[],
    isLoading: boolean,
    per_page: number,
    page: number,
    totalCount?: number,
    totalPages?: number
}

export interface RootState {
    userState?: State
}

export type GetUserResponse = GetResponse;

export type GetRequestPayload = GetUsersRequestPayload

export type GetCancelPayload = CancelPayload

export type GetDonePayload = GetUsersDonePayload

