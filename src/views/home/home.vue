<template>
    <div class="home-box">
        <div class="search-box">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="search-list">
                        <p class="title">商品分类：</p>
                        <el-input
                            placeholder="请输入商品分类"
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
                <!-- <el-button type="primary" size="medium"><i class="el-icon-plus"></i>新增一级分类</el-button> -->
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="UserName"
                    label="用户姓名"
                    width="200"
                    align="center"
                />
                <el-table-column
                    prop="NickName"
                    label="昵称"
                    align="center"
                />
                <el-table-column
                    prop="PhoneNum"
                    label="手机号"
                    align="center"
                />
                <el-table-column
                    prop="PhoneNum"
                    label="权限"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ (scope.row.userRole && scope.row.userRole.length) ? scope.row.userRole[0].RoleName : '' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="authorizeUser(scope.$index, scope.row)"
                        >授权</el-button>
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
import { IPaginationData } from '@/api/types'
import store from '@/store'
@Component({
    name: 'Home',
    components: {
        Pagination
    }
})
export default class Home extends Vue {
    private pagination: IPaginationData = {
        pageIndex: 1,
        pageSize: 10
    }
    private tableData:[] = []
    mounted() {
        console.log(store, 55)
    }
}
</script>
<style lang="less" scoped>
@import '../../styles/form.less';

</style>
