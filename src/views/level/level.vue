<template>
    <div class="level_box">
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
                <el-button type="primary" size="medium" @click="addLevel('one')"><i class="el-icon-plus"></i>新增一级分类</el-button>
                <el-button type="primary" size="medium" @click="addLevel('two')"><i class="el-icon-plus"></i>新增二级分类</el-button>
                <el-button type="primary" size="medium" @click="addLevel('three')"><i class="el-icon-plus"></i>新增三级分类</el-button>
            </div>
            <el-tabs v-model="levelType" @tab-click="changeTab">
                <el-tab-pane label="一级分类" name="one" />
                <el-tab-pane label="二级分类" name="two" />
                <el-tab-pane label="三级分类" name="three" />
            </el-tabs>
            <el-table
                v-if="levelType === 'one'"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="CategoryName"
                    label="一级分类"
                    width="200"
                    align="center"
                />
                <el-table-column
                    prop="Imgs"
                    label="预览图"
                    align="center"
                >
                    <template slot-scope="scope">
                        <img v-if="scope.row.Imgs" :src="imgUrl+scope.row.Imgs" alt="" />
                        8448948
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SortNum"
                    label="排序号"
                    align="center"
                />
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="delForm(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                v-if="levelType === 'two'"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="ParentName"
                    label="上级分类"
                    width="200"
                    align="center"
                />
                <el-table-column
                    prop="CategoryName"
                    label="二级分类"
                    width="180"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.CategoryName }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Imgs"
                    label="预览图"
                    align="center"
                >
                    <template slot-scope="scope">
                        <img v-if="scope.row.Imgs" :src="imgUrl+scope.row.Imgs" alt="" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SortNum"
                    label="排序号"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.SortNum }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="delForm(scope.$index, scope.row)"
                        >删除488</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                v-else-if="levelType === 'three'"
                :data="tableData"
                style="width: 100%"
            >
                <el-table-column
                    prop="ParentName"
                    label="上级分类"
                    width="200"
                    align="center"
                />
                <el-table-column
                    prop="CategoryName"
                    label="三级分类"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.CategoryName }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="Imgs"
                    label="预览图"
                    align="center"
                >
                    <template slot-scope="scope">
                        <img v-if="scope.row.Imgs" :src="imgUrl+scope.row.Imgs" alt="" />
                    </template>
                </el-table-column>
                <el-table-column
                    prop="SortNum"
                    label="排序号"
                    align="center"
                >
                    <template slot-scope="scope">
                        {{ scope.row.SortNum }}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            @click="delForm(scope.$index, scope.row)"
                        >删除99</el-button>
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
        <el-dialog title="新增商品分类" :visible.sync="levelVisible" width="600px">
            <el-form ref="form" :rules="rules" :model="form" label-width="100px">
                <el-form-item v-if="levelType == 'one'" label="一级分类：" prop="CategoryName">
                    <el-input v-model="form.CategoryName" placeholder="请输入一级分类" />
                </el-form-item>
                <el-form-item v-else-if="levelType == 'two'" label="一级分类：" prop="ParentId">
                    <el-select v-model="form.ParentId" clearable filterable placeholder="请选择一级分类">
                        <el-option v-for="(item,index) in levelOneArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                    </el-select>
                </el-form-item>
                <el-form-item v-else-if="levelType == 'three'" label="一级分类：" prop="ParentTwoId">
                    <el-select v-model="form.ParentTwoId" clearable filterable placeholder="请选择一级分类">
                        <el-option v-for="(item,index) in levelOneArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="levelType == 'two'" label="二级分类：" prop="CategoryName">
                    <el-input v-model="form.CategoryName" placeholder="请输入二级分类" />
                </el-form-item>
                <el-form-item v-if="levelType == 'three' || levelType == 'three'" label="二级分类：" prop="ParentId">
                    <el-select v-model="form.ParentId" clearable filterable placeholder="请选择二级分类">
                        <el-option v-for="(item,index) in levelTwoArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                    </el-select>
                </el-form-item>
                <el-form-item v-if="levelType == 'three'" label="三级分类：">
                    <el-input v-model="form.CategoryName" placeholder="请输入三级分类" />
                </el-form-item>
                <el-form-item label="排序号：">
                    <el-input v-model="form.SortNum" placeholder="请输入排序号" />
                </el-form-item>
                <el-form-item label="上传：">
                    <el-upload
                        class="upload-demo"
                        :action="url"
                        :on-remove="handleRemove"
                        :headers="{'Authorization':token}"
                        name="files"
                        :file-list="fileList"
                        list-type="picture"
                        :on-success="uploadSuccess"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="levelVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveLevel">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IPaginationData } from '@/api/types'
import Pagination from '@/components/Pagination.vue'
import url from '@/utils/url'
import { getToken } from '@/utils/cookies'
import { addGoodType, inquireGoodType, deleteGoodType, getGoodTypeList } from '@/api/level'
interface IFormData{
    CategoryName: string
    CategoryLevel: number
    ParentId?: string
    SortNum?: number | null
    Imgs: string
}
@Component({
    name: 'Level',
    components: {
        Pagination
    }
})
export default class Level extends Vue {
    private tableData: [] = []
    private levelVisible: boolean = false
    private url: string = url + '/Mall/UploadImg'
    private imgUrl = url
    private token = getToken()
    private fileList: any = []
    private form: IFormData = {
        CategoryName: '',
        CategoryLevel: 1,
        Imgs: ''
    }
    private rules: object = {
        CategoryName: [
            { required: true, message: '请输入分类名称', trigger: 'blur' }
        ],
        ParentId: [
            { required: true, message: '请选择上级分类', trigger: 'change' }
        ],
        ParentTwoId: [
            { required: true, message: '请选择上级分类', trigger: 'change' }
        ]
    }
    private levelType: string = 'one'
    private pagination: IPaginationData = {
        pageIndex: 1,
        pageSize: 10,
        typeLevel: '1'
    }
    private total = 0
    private levelOneArr: [] = [] // 一级分类
    private levelTwoArr: [] = [] // 二级分类
    public addLevel(type: string) {
        this.levelVisible = true
        this.levelType = type
        this.form = {
            CategoryName: '',
            CategoryLevel: 1,
            Imgs: ''
        }
        if (type === 'two' || type === 'three') {
            this.inquireGoodType(type)
        }
        this.getData()
    }
    public handleRemove(file: {}, fileList: []) {
        console.log(fileList)
        this.form.Imgs = ''
        fileList.forEach((item: any) => {
            console.log(item.url.split('UploadsPic')[1])
            this.form.Imgs += this.form.Imgs ? (',/UploadsPic' + item.url.split('UploadsPic')[1]) : ('/UploadsPic' + item.url.split('UploadsPic')[1])
        })
        console.log(this.form)
    }
    public uploadSuccess(response: {code: number, result:{imgUrls: string}}, file:{}, fileList: []) {
        if (response.code === 200) {
            this.form.Imgs += this.form.Imgs ? (',' + response.result.imgUrls) : response.result.imgUrls
        }
        console.log(this.form.Imgs)
    }
    // 保存级别
    public saveLevel() {
        console.log(this.form);
        (this.$refs['form'] as HTMLFormElement).validate(async(valid: boolean) => {
            if (valid) {
                if (this.levelType === 'one') {
                    this.form.CategoryLevel = 1
                } else if (this.levelType === 'two') {
                    this.form.CategoryLevel = 2
                } else if (this.levelType === 'three') {
                    this.form.CategoryLevel = 3
                }
                this.form.ParentId = this.form.ParentId?.toString()
                console.log(this.form)
                const { data } = await addGoodType<any>(this.form)
                if (data.code === 200) {
                    this.getData()
                    this.levelVisible = false
                    this.fileList = []
                }
            } else {
                return false
            }
        })
    }
    // 删除
    delForm(index: number, value: object) {
        console.log(value)
        this.$confirm('是否删除该条信息？', '提示', {
            distinguishCancelAndClose: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消'
        })
            .then(async() => {
                console.log(value, 263)
                const { data } = await deleteGoodType<any>(value)
                if (data.code === 200) {
                    this.$message.success('删除成功！')
                    this.getData()
                } else {
                    this.$message.error('删除失败！')
                }
            })
    }
    public changeTab() {
        if (this.levelType === 'one') {
            this.pagination.typeLevel = '1'
        } else if (this.levelType === 'two') {
            this.pagination.typeLevel = '2'
        } else {
            this.pagination.typeLevel = '3'
        }
        this.pagination.pageIndex = 1
        this.getData()
    }
    public paginationGetData(data: object) {
        this.pagination = Object.assign({}, this.pagination, data)
        this.getData()
        console.log(this.pagination, 1555)
    }
    public async getData() {
        const { data } = await getGoodTypeList<any>(this.pagination)
        if (data.code === 200) {
            this.tableData = data.result.typeList
            this.total = data.result.total
        }
        console.log(data)
        console.log(this.tableData)
    }
    // 通过字段查询对应的商品分类
    public async inquireGoodType(type: string) {
        const { data } = await inquireGoodType<any>({
            typeLevel: 1
        })
        const res = await inquireGoodType<any>({
            typeLevel: 2
        })
        if (this.levelType === 'two') {
            this.levelOneArr = data.result
        }
        if (this.levelType === 'three') {
            this.levelOneArr = data.result
            this.levelTwoArr = res.data.result
        }
        console.log(data)
    }
    async mounted() {
        this.getData()
    }
}

</script>
<style lang="less" scoped>
@import '../../styles/form.less';
/deep/ .el-select {
    width: 100%;
}
/deep/ .el-tabs {
    .el-tabs__item{
        padding: 0 30px!important;
    }
}
img{
    width: 70px;
    height: 70px;
}
</style>
