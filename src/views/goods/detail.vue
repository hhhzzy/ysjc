<template>
    <div class="detail-box">
        <el-card class="box-card" shadow="never">
            <div slot="header" class="clearfix">
                <span>新增商品</span>
            </div>
            <div class="content-box">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                    <div class="border-box">
                        <el-row :gutter="10">
                            <el-col :span="24">
                                <el-form-item label="商品名称：" prop="GoodsName">
                                    <el-input v-model="ruleForm.GoodsName" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="商品库存：" prop="GoodsStock">
                                    <el-input v-model.number="ruleForm.GoodsStock" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="商品排序号：" prop="SortNum">
                                    <el-input v-model.number="ruleForm.SortNum" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="商品简介：" prop="GoodsIntro">
                                    <el-input v-model="ruleForm.GoodsIntro" type="textarea" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="上传：">
                                    <el-upload
                                        class="upload-demo"
                                        :action="url"
                                        :on-remove="handleRemove"
                                        :headers="{'Authorization':token}"
                                        name="files"
                                        multiple
                                        :file-list="fileList"
                                        list-type="picture"
                                        :on-success="uploadSuccess"
                                    >
                                        <el-button size="small" type="primary">点击上传</el-button>
                                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="border-box">
                        <el-row :gutter="10">
                            <el-col :span="8">
                                <el-form-item label="门市价格：" prop="ShopPrice">
                                    <el-input v-model.number="ruleForm.ShopPrice" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="零售价格：" prop="RetailPrice">
                                    <el-input v-model.number="ruleForm.RetailPrice" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="装饰价格：" prop="DecorationPrice">
                                    <el-input v-model.number="ruleForm.DecorationPrice" />
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="一级分类：" prop="FirstSort">
                                    <el-select v-model="ruleForm.FirstSort" placeholder="请选择一级分类" clearable filterable @change="changeOne">
                                        <el-option v-for="(item,index) in oneLevelArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="二级分类：" prop="SecondSort">
                                    <el-select v-model="ruleForm.SecondSort" placeholder="请选择二级分类" clearable filterable @change="changeTwo">
                                        <el-option v-for="(item,index) in twoLevelArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item label="三级分类：" prop="ThirdSort">
                                    <el-select v-model="ruleForm.ThirdSort" placeholder="请选择三级分类">
                                        <el-option v-for="(item,index) in threeLevelArr" :key="index" :label="item.CategoryName" :value="item.CategoryId" />
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24">
                                <el-form-item label="商品描述：" prop="name">
                                    <el-input v-model="ruleForm.GoodsDesc" type="textarea" />
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                    <div class="botder-button">
                        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    </div>
                </el-form>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { addGoods, InquireGoodType, getOneGoods, changeGoods } from '@/api/goods'
import url from '@/utils/url'
import { getToken } from '@/utils/cookies'
interface IRuleFormData {
    GoodsImgs: any
    FirstSort: any
    SecondSort: any
    ThirdSort: any
}

@Component({
    name: 'GoodDetail'
})
export default class GoodDetail extends Vue {
    private ruleForm: IRuleFormData = {
        GoodsImgs: '',
        FirstSort: '',
        SecondSort: '',
        ThirdSort: ''
    }
    private rules: object = {
        GoodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        ShopPrice: [
            { required: true, message: '请输入门市价格', trigger: 'blur' }
        ],
        RetailPrice: [
            { required: true, message: '请输入零售价格', trigger: 'blur' }
        ],
        DecorationPrice: [
            { required: true, message: '请输入商品名称装饰价格', trigger: 'blur' }
        ]
    }
    private oneLevelArr: [] = [] // 一级分类
    private twoLevelArr: [] = [] // 二级分类
    private threeLevelArr: [] = [] // 三级分类
    private url: string = url + '/Mall/UploadImg'
    private token = getToken()
    private fileList: any = []
    private id = ''
    // 提交
    async submitForm() {
        (this.$refs['ruleForm'] as HTMLFormElement).validate(async(valid: boolean) => {
            if (valid) {
                console.log(this.ruleForm)
                this.ruleForm.FirstSort = this.ruleForm.FirstSort.toString()
                this.ruleForm.SecondSort = this.ruleForm.SecondSort.toString()
                this.ruleForm.ThirdSort = this.ruleForm.ThirdSort.toString()
                if (this.id) {
                    const { data } = await changeGoods<any>(this.ruleForm)
                    if (data.code === 200) {
                        this.$message.success('修改成功！')
                        this.getGoodsInfo()
                    }
                } else {
                    const { data } = await addGoods<any>(this.ruleForm)
                    if (data.code === 200) {
                        this.$message.success('新增成功！')
                        this.$router.push({
                            path: '/goods/goodsList'
                        })
                    }
                }
            } else {
                return false
            }
        })
    }
    // 获取详情
    async getGoodsInfo() {
        const { data } = await getOneGoods(this.id)
        this.ruleForm = Object.assign(({} as any), data.result)
        this.ruleForm.FirstSort = this.ruleForm.FirstSort ? Number(this.ruleForm.FirstSort) : ''
        this.ruleForm.SecondSort = this.ruleForm.SecondSort ? Number(this.ruleForm.SecondSort) : ''
        this.ruleForm.ThirdSort = this.ruleForm.ThirdSort ? Number(this.ruleForm.ThirdSort) : ''
        // 调用二级分类
        if (this.ruleForm.SecondSort) {
            const levelTwo = await InquireGoodType<any>({ typeLevel: 2 })
            if (levelTwo.data.result && levelTwo.data.result.length) {
                levelTwo.data.result.forEach((item: any) => {
                // eslint-disable-next-line eqeqeq
                    if (item.ParentId == this.ruleForm.FirstSort) {
                        (this.twoLevelArr as any).push(item)
                    }
                })
            }
        }
        // 调用三级分类
        if (this.ruleForm.SecondSort) {
            const levelThree = await InquireGoodType<any>({ typeLevel: 3 })
            if (levelThree.data.result && levelThree.data.result.length) {
                levelThree.data.result.forEach((item: any) => {
                // eslint-disable-next-line eqeqeq
                    if (item.ParentId == this.ruleForm.SecondSort) {
                        (this.threeLevelArr as any).push(item)
                    }
                })
            }
        }
        this.fileList = []
        if (this.ruleForm.GoodsImgs) {
            const arr = this.ruleForm.GoodsImgs.split(',')
            arr.forEach((item: any) => {
                this.fileList.push({
                    url: url + item
                })
            })
        }
        console.log(this.fileList)
    }
    // 获取一级分类
    async getOneLevel() {
        const { data } = await InquireGoodType<any>({ typeLevel: 1 })
        console.log(data.result)
        this.oneLevelArr = data.result
    }
    // 改变一级分类
    async changeOne(value: number) {
        console.log(value)
        this.twoLevelArr = []
        this.threeLevelArr = []
        // 清空
        this.$set((this.ruleForm as any), 'SecondSort', '')
        this.$set((this.ruleForm as any), 'ThirdSort', '')
        // 调用二级分类
        const { data } = await InquireGoodType<any>({ typeLevel: 2 })
        if (data.result && data.result.length) {
            data.result.forEach((item: any) => {
                // eslint-disable-next-line eqeqeq
                if (item.ParentId == value) {
                    (this.twoLevelArr as any).push(item)
                }
            })
        }
        console.log(data)
    }
    async changeTwo(value: number) {
        console.log(value)
        this.threeLevelArr = []
        // 清空
        this.$set((this.ruleForm as any), 'ThirdSort', '')
        // 调用二级分类
        const { data } = await InquireGoodType<any>({ typeLevel: 3 })
        if (data.result && data.result.length) {
            data.result.forEach((item: any) => {
                // eslint-disable-next-line eqeqeq
                if (item.ParentId == value) {
                    (this.threeLevelArr as any).push(item)
                }
            })
        }
        console.log(data)
    }
    public handleRemove(file: {}, fileList: []) {
        console.log(fileList)
        this.ruleForm.GoodsImgs = ''
        fileList.forEach((item: any) => {
            console.log(item.url.split('UploadsPic')[1])
            this.ruleForm.GoodsImgs += this.ruleForm.GoodsImgs ? (',/UploadsPic' + item.url.split('UploadsPic')[1]) : ('/UploadsPic' + item.url.split('UploadsPic')[1])
        })
        console.log(this.ruleForm)
    }
    public uploadSuccess(response: {code: number, result:{imgUrls: string}}, file:{}, fileList: []) {
        if (response.code === 200) {
            this.ruleForm.GoodsImgs += this.ruleForm.GoodsImgs ? (',' + response.result.imgUrls) : response.result.imgUrls
        }
        console.log(this.ruleForm.GoodsImgs)
    }
    // 改变二级分类
    mounted() {
        this.getOneLevel()
        if (this.$route.query.id) {
            this.id = this.$route.query.id as string
            this.getGoodsInfo()
        }
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-card__body{
    padding: 0;
}
.content-box{
    .border-box{
        padding: 20px 20px 20px 0;
        float: left;
        width: 50%;
        position: relative;
        &:first-child{
            border-right: 1px solid #e9eaec;
        }
    }
    .botder-button{
        border-top: 1px solid #e9eaec;
        clear: both;
        text-align: center;
        padding: 20px 0;
    }
}
/deep/ .el-select{
    width: 100%;
}
</style>
