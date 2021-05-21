<template>
    <div class="pagination-box">
        <el-pagination
            :current-page.sync="page"
            :page-size.sync="num"
            :page-sizes="pageSizes"
            layout="total, sizes, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
@Component({
    name: 'Pagination'
})
export default class Pagination extends Vue {
    @Prop({ default: 1 }) currentPage!: number // 当前页码数
    @Prop({ default: 1 }) pageSize!: number // 每页显示条目个数
    @Prop({ required: true }) total!: number // 总条数
    @Prop({ default: () => [10, 20, 30, 40, 50, 100] }) sizes!: number[] // 分页数的显示
    get page() {
        return this.currentPage
    }
    set page(newVal: number) {
        this.$emit('update:currentPage', newVal)
    }
    get num() {
        return this.pageSize
    }
    set num(newVal: number) {
        this.$emit('update:pageSize', newVal)
    }
    get pageSizes() {
        console.log(this.sizes, 333)
        return this.sizes
    }
    // 每页条数改变
    public handleSizeChange(value: number) {
        // tods: 把分页需要的参数传过去
        this.$emit('pagination', { pageIndex: this.currentPage, pageSize: value })
    }
    // 页码数的改变
    public handleCurrentChange(value: number) {
        // tods: 把分页需要的参数传过去
        this.$emit('pagination', { pageIndex: value, pageSize: this.pageSize })
    }
}
</script>

