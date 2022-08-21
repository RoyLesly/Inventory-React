import { notification } from "antd"
import Axios, { AxiosResponse } from "axios"
import { GroupUrl, InventoryUrl, InvoiceUrl, MeUrl, CreateShopsUrl } from "./Config"
import { tokenName, userName, userRole } from "./data"
import { AuthTokenType, CustomAxiosError, DataProps, GroupProps, InventoryProps, InvoiceType, ShopProps, UserType } from "./types"


export const getAuthToken = (): AuthTokenType | null => {
    const accessToken = localStorage.getItem(tokenName)
    if (!accessToken) {
        return null
    }

    return { Authorization: `Bearer ${accessToken}` }
}

export const logout = () => {
    localStorage.removeItem(tokenName)
    localStorage.removeItem(userName)
    localStorage.removeItem(userRole)
    window.location.href = "/login"
}

export const authHandler = async (): Promise<UserType | null> => {
    const response = await axiosRequest<UserType>({ url: MeUrl, hasAuth: true, showError: false })
    if (response) {
        return response.data
    }

    return null
}

interface AxiosRequestProps {
    method?: 'get' | 'post' | 'put' | 'patch' | 'delete' | 'update'
    url: string
    payload?: DataProps | FormData
    hasAuth?: boolean
    showError?: boolean
    errorObject?: {
        message: string,
        description?: string
    }
    file?: boolean
}

export const axiosRequest = async <T>({
    method = 'get',
    url,
    payload,
    hasAuth = false,
    showError = true,
    file = false,
    errorObject,
}: AxiosRequestProps): Promise<AxiosResponse<T> | null> => {
    let headers = hasAuth ? getAuthToken() : {}
    if (file) {
        //console.log("File ")
        headers = { ...headers, 'content-type': 'multipart/form-data' }
    } else {
        //console.log("No File")
    }

    const response = await Axios({
        method,
        url,
        data: payload,
        headers: { ...headers }
    }).catch(
        (e: CustomAxiosError) => {
            if (!showError) return
            notification.error({
                message: errorObject ? errorObject.message : "Operation Error",
                description: errorObject?.description ? errorObject.description : e.response?.data.error
            })
        }
    ) as AxiosResponse<T>

    if (response) {
        return response
    }

    return null
}

export const getGroups = async (
    setGroup: (data: GroupProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: GroupProps[] }>({
        url: GroupUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        console.log(response.data.results)
        const data = response.data.results.map(item => ({
            ...item,
            created_at: (item.created_at)?.toString().slice(0, 10),
            belongsTo: item.belongs_to ? item.belongs_to.name : "Not Defined"
        }))
        setGroup(data)
        setFetching(false)
    }
}

export const getInventories = async (
    setGroup: (data: InventoryProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: InventoryProps[] }>({
        url: InventoryUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        console.log(response.data.results)
        const data = response.data.results.map(item => ({
            ...item,
            groupInfo: item.group?.name,
            created_at: (item.created_at)?.toString().slice(0, 10),
            updated_at: (item.updated_at)?.toString().slice(0, 10),
            photoInfo: item.photo
        }))
        setGroup(data)
        setFetching(false)
    }
}

export const getShops = async (
    setShop: (data: ShopProps[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: ShopProps[] }>({
        url: CreateShopsUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        const data = response.data.results.map(
            (item): any => ({
                ...item,
                //key: item.id,
                created_by: item.created_by.first_name,
            })
        )
        setShop(data)
        setFetching(false)
    }
}

export const getInvoice = async (
    setInvoice: (data: InvoiceType[]) => void,
    setFetching: (val: boolean) => void
) => {

    const response = await axiosRequest<{ results: DataProps[] }>({
        url: InvoiceUrl,
        hasAuth: true,
        showError: false,
    })
    if (response) {
        // console.log(response)
        const data: InvoiceType[] = response.data.results.map((item: any) => ({
            ...item,
            created_by_email: item.created_by.email,
            shop_name: item.shop.name,
            invoice_items: item.invoice_items.map((i: any) => ({
                //...i,
                id: i.id,
                price: i.amount,
                qty: i.quantity,
                item: i.item_name,
                total: i.amount * i.quantity
            }))
        }))
        setInvoice(data)
        setFetching(false)
    }
}