import { AxiosError } from "axios"
import React from "react"


export interface InvoiceCreationAddRemoveProps {
    [key: number]: number
}

export interface DataProps {
    [key: string]: string | boolean | number | null | any | React.ReactElement
}

export interface CustomAxiosError extends Omit<AxiosError, 'response'> {
    response?: {
        data: { error: string }
    }
}

export interface AuthTokenType {
    Authorization: string
}

export interface UserType {
    first_name: string
    email: string
    id: number
    created_at: string
    role: string
    last_login: string
}

export interface AuthProps {
    errorCallBack?: () => void,
    successCallBack?: () => void,
}

export interface StoreProps {
    user: UserType | null,
    updatePasswordUserId: number | null
}

export enum ActionTypes {
    // UPDATE_USER_INFO = "[action] update user info"
    // UPDATE_PASSWORD_USER_ID = "[action] update password user id"
    UPDATE_USER_INFO,
    UPDATE_USER_PASSWORD,
}

export type ActionProps = {
    type: ActionTypes.UPDATE_USER_INFO,
    payload: UserType | null
} | {
    type: ActionTypes.UPDATE_USER_PASSWORD,
    payload: number | null
}

export interface StoreProviderProps {
    state: StoreProps,
    dispatch: (arg: ActionProps) => void
}

export interface FormModalProps {
    isVisible?: boolean
    onSuccessCallBack: (data?: number) => void
    onClose: () => void
}

export interface GroupProps {
    id: number
    name: string,
    belongs_to: {
        name: string
        id: number
    } | null
    created_at: string
    total_items: number
}

export interface InventoryProps {
    id?: number
    code: string
    name: string
    created_by: {
        first_name: string
    }
    group: {
        name: string
        id: number
    } | null
    created_at: string
    updated_at: string
    price: number
    total?: number
    remaining: number
    sum_of_item: number
    photo?: string
}

export interface InvoiceCreationProps {
    id: number
    item: string
    qty: number
    price: number
    total: number
    action?: React.ReactElement
}

export interface ShopProps {
    key: number
    id: number
    name: string
    created_at: string
    created_by: {
        first_name: string
    }
}

export interface InvoiceType {
    id: number
    created_at: string
    created_by_email: string
    created_by_name: string
    invoice_items: InvoiceCreationProps[]
    shop_name: string
    total?: number
}