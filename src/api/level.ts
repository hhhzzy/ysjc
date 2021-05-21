import Ajax from '@/utils/http'
import { ResponseData } from '@/api/response'
// 新增商品分类
export function addGoodType<T>(data: object) {
    return Ajax.post<ResponseData<T>>('/Mall/addGoodType', data)
}
// 获取商品分类列表
export function getGoodsType<T>() {
    return Ajax.get<ResponseData<T>>('/Mall/getGoodsType')
}
// 删除商品分类
export function deleteGoodType<T>(data: object) {
    return Ajax.post<ResponseData<T>>('/Mall/deleteGoodType', data)
}
// 通过字段查询商品分类
export function inquireGoodType<T>(data: object) {
    return Ajax.get<ResponseData<T>>('/Mall/InquireGoodType', { params: data })
}
// 获取商品类别分页列表
export function getGoodTypeList<T>(data: object) {
    return Ajax.get<ResponseData<T>>('/Mall/getGoodTypeList', { params: data })
}
