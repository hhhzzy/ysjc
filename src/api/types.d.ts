export interface ILoginData {
    UserAccount: string
    UserPassword: string
}
export interface IUserData {
    roles: string[]
    introduction: string
    avatar: string
    name: string
}

export interface IGoodsListData {
    GoodsId: string
    GoodsName: string
    GoodsImgs: string
    ShopPrice: number
    RetailPrice: number
    DecorationPrice: number
    GoodsStock: number
    SortNum: number
}

export interface IPaginationData {
    pageIndex: number // 当前页码数
    pageSize: number // 每页显示条目个数
    [key: string]: any
}
