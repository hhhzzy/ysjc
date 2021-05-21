<template>
    <div>
        <div class="search-box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="search-list">
                        <p class="title">商品名称：</p>
                        <el-input
                            placeholder="请输入商品名称"
                            size="medium"
                        />
                    </div>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="medium">查询</el-button>
                </el-col>
            </el-row>
        </div>
        <div class="container-box">
            <div class="container-box-top">
                <el-button type="primary" size="medium" @click="addGoodsList"><i class="el-icon-plus"></i>新增</el-button>
            </div>
            <el-table
                :data="tableData"
                border
                style="width: 100%"
            >
                <el-table-column
                    type="selection"
                    width="55"
                />
                <el-table-column
                    prop="GoodsName"
                    label="商品名称"
                    width="180"
                />
                <el-table-column
                    prop="firstLevelName"
                    label="一级分类"
                    width="180"
                />
                <el-table-column
                    prop="secondLevelName"
                    label="二级分类"
                />
                <el-table-column
                    prop="thirdLevelName"
                    label="三级分类"
                />
                <el-table-column
                    prop="ShopPrice"
                    label="门市价格（元）"
                />
                <el-table-column
                    prop="RetailPrice"
                    label="零售价格（元）"
                />
                <el-table-column
                    prop="DecorationPrice"
                    label="装饰价格（元）"
                />
                <el-table-column
                    prop="GoodsStock"
                    label="库存"
                />
                <el-table-column
                    prop="SortNum"
                    label="排序号"
                />
                <el-table-column
                    prop="address"
                    label="商品图片"
                    width="250"
                >
                    <template slot-scope="scope">
                        <img v-for="(item,index) in scope.row.GoodsImgs" :key="index" :src="url+item" alt="" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="address"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editGoods(scope.row)">修改</el-button>
                        <el-button type="danger" size="mini" @click="delItem(scope)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <Pagination
                :total="total"
                :current-page.sync="pagination.pageIndex"
                :page-size.sync="pagination.pageSize"
                :sizes="pagination.pageSizes"
                @pagination="paginationGetData"
            />
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Pagination from '@/components/Pagination.vue'
import { IPaginationData, IGoodsListData } from '@/api/types'
import { getGoodsList, deleteGoods } from '@/api/goods'
import { getGoodsType } from '@/api/level'
import url from '@/utils/url'
interface IFormData {
    name: string
    id: string
    parentDepartmentId: string
    isRevoked: boolean | null
}

@Component({
    name: 'GoodList',
    components: {
        Pagination
    }
})
export default class GoodList extends Vue {
    private tableData: IGoodsListData[] = []
    private deparmentVisible: boolean = false
    private pagination: IPaginationData = {
        pageIndex: 1,
        pageSize: 10
    }
    private total: number = 0
    private form: IFormData = {
        name: '',
        id: '',
        parentDepartmentId: '',
        isRevoked: null
    }
    private url: string = url
    private levelArr: [] =[]
    async mounted() {
        await this.getGoodsType()
        this.getGoodsList()
    }
    public addGoodsList() {
        this.$router.push({
            path: '/goods/goodsDetail'
        })
    }
    private async getGoodsList() {
        const data = await getGoodsList<any>(this.pagination)
        this.tableData = data.data.result.goodsList
        this.tableData = this.tableData.map((item: any) => {
            if (item.FirstSort) {
                (this.levelArr as any).FirstTypes.forEach((ele:{CategoryId: string, CategoryName: string}) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.FirstSort == ele.CategoryId) {
                        item.firstLevelName = ele.CategoryName
                    }
                })
            }
            if (item.SecondSort) {
                (this.levelArr as any).SencondTypes.forEach((ele:{CategoryId: string, CategoryName: string}) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.SecondSort == ele.CategoryId) {
                        item.secondLevelName = ele.CategoryName
                    }
                })
            }
            if (item.ThirdSort) {
                (this.levelArr as any).ThirdTypes.forEach((ele:{CategoryId: string, CategoryName: string}) => {
                    // eslint-disable-next-line eqeqeq
                    if (item.ThirdSort == ele.CategoryId) {
                        item.thirdLevelName = ele.CategoryName
                    }
                })
            }
            if (item.GoodsImgs) {
                item.GoodsImgs = item.GoodsImgs.split(',')
            }
            return item
        })
        this.total = data.data.result.total
    }
    private async getGoodsType() {
        const { data } = await getGoodsType<any>()
        this.levelArr = data.result
        console.log(data, 140)
    }
    // 删除
    private delItem(item: any) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(async() => {
            const { data } = await deleteGoods(item.row.GoodsId)
            if (data.code === 200) {
                this.getGoodsList()
                this.$message.success('删除成功！')
            }
        })
    }
    // 修改
    editGoods(item: {GoodsId: string}) {
        console.log(item)
        this.$router.push({
            path: '/goods/goodsDetail',
            query: {
                id: item.GoodsId
            }
        })
    }
    public paginationGetData(data: object) {
        this.pagination = Object.assign({}, this.pagination, data)
        this.getGoodsList()
    }
}
</script>
<style lang="less" scoped>
@import '../../styles/form.less';
img{
    width: 50px;
    height: 50px;
    margin-right: 5px;
}
</style>
