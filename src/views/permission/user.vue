<template>
    <div>
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
        <el-dialog
            title="提示"
            :visible.sync="userVisible"
            width="30%"
        >
            <h3 style="margin-bottom:20px;">请选择用户的权限：</h3>
            <el-radio-group v-model="formRole">
                <el-radio v-for="(item,index) in rolesArr" :key="index" :label="item.RoleId">{{ item.RoleName }}</el-radio>
            </el-radio-group>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveAuthorize">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Pagination from '@/components/Pagination.vue'
import { IPaginationData } from '@/api/types'
import { getUserList, getRoleList, assignRole } from '@/api/user'
@Component({
    name: 'User',
    components: {
        Pagination
    }
})
export default class User extends Vue {
    private pagination: IPaginationData = {
        pageIndex: 1,
        pageSize: 10
    }
    private tableData:[] = []
    private userVisible = false
    private rolesArr = []
    private formRole = null
    private total = 0
    private form: any = {}
    // 授权
    public async authorizeUser(index: number, value: {UserInfoId: number, userRole:[]}) {
        this.userVisible = true
        this.form.UerId = value.UserInfoId.toString()
        this.formRole = Number((value.userRole as any)[0].RoleId) as any
    }
    // 获取用户列表
    public async getUserList() {
        const { data } = await getUserList<any>(this.pagination)
        if (data.code === 200) {
            this.tableData = data.result.userList
        }
        console.log(data)
    }
    // 获取角色
    public async getRoleList() {
        const { data } = await getRoleList<any>()
        if (data.code === 200) {
            this.rolesArr = data.result
        }
        console.log(data)
    }
    // 保存权限
    public async saveAuthorize() {
        console.log(this.formRole)
        if (!this.formRole) {
            this.$message.error('请选择要授予的权限')
            return
        }
        if (this.rolesArr && this.rolesArr.length) {
            this.rolesArr.forEach((item:{RoleId: number, RoleName:string}) => {
                if (this.formRole === item.RoleId) {
                    this.form.RoleId = String(item.RoleId)
                    this.form.RoleName = item.RoleName
                }
            })
        }
        const arr: any = []
        arr.push(this.form)
        console.log(arr, this.form)
        const { data } = await assignRole<any>(arr)
        if (data.code === 200) {
            this.$message.success('授权成功！')
        } else {
            this.$message.error('授权失败！')
        }
        this.getUserList()
        this.userVisible = false

        console.log(data)
    }
    public async paginationGetData() {

    }
    async mounted() {
        await this.getUserList()
        await this.getRoleList()
    }
}
</script>
<style lang="less" scoped>
@import '../../styles/form.less';

</style>
