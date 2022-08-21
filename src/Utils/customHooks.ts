import { useContext, useEffect } from "react"
import { authHandler, getGroups, getInventories, getInvoice, getShops } from "./functions"
import { store } from "./store"
import { ActionTypes, AuthProps, GroupProps, InventoryProps, InvoiceType, ShopProps, UserType } from "./types"


export const useAuthHook = async (
    { successCallBack, errorCallBack }: AuthProps) => {

    const { dispatch } = useContext(store)

    useEffect(() => {
        const Check = async () => {
            const user: UserType | null = await authHandler()
            if (!user) {
                if (errorCallBack) {
                    errorCallBack()
                }
                return
            }
            if (successCallBack) {

                dispatch({ type: ActionTypes.UPDATE_USER_INFO, payload: user })
                successCallBack()
            }
        }
        Check()
    }, [])
}

export const useGetGroups = (
    setGroup: (data: GroupProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    useEffect(() => {
        getGroups(setGroup, setFetching)
    }, [])
}

export const useGetInventories = (
    setInventry: (data: InventoryProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    useEffect(() => {
        getInventories(setInventry, setFetching)
    }, [])
}

export const useGetShops = (
    setShops: (data: ShopProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    useEffect(() => {
        getShops(setShops, setFetching)
    }, [])
}

export const useGetInvoice = (
    setInvoice: (data: InvoiceType[]) => void,
    setFetching: (val: boolean) => void
) => {

    useEffect(() => {
        getInvoice(setInvoice, setFetching)
    }, [])
}