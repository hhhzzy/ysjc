import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'

// 获取商品列表
export function getGoodsList<T>(data: object) {
    return Ajax.get<ResponseData<T>>('/Mall/getGoodsList', { params: data })
}
// 新增商品
export function addGoods<T>(data: object) {
    return Ajax.post<ResponseData<T>>('/Mall/addGoods', data)
}
// 获取商品类别
export function InquireGoodType<T>(data: object) {
    return Ajax.get<ResponseData<T>>('/Mall/InquireGoodType', { params: data })
}
// 删除商品
export function deleteGoods<T>(data: string) {
    return Ajax.post<ResponseData<T>>('/Mall/deleteGoods', { GoodsId: data })
}
// 获取商品详情
export function getOneGoods<T>(data: string) {
    return Ajax.get<ResponseData<T>>('/Mall/getOneGoods', { params: { goodsId: data }})
}
// 修改商品
export function changeGoods<T>(data: object) {
    return Ajax.post<ResponseData<T>>('/Mall/changeGoods', data)
}
