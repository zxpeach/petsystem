<template>
    <el-container className="main-container">
        <el-aside v-bind:class="asideClass">
            <LeftAside></LeftAside>
        </el-aside>
        <el-container>
            <el-header className="main-header">
                <TopNav></TopNav>
            </el-header>
            <el-main className="main-center">

                <div class="login-box">
                    <h2 style="text-align:center">上传宠物</h2>
                    <form  @submit.prevent="petupload" >

                        <label for="name">昵称</label>
                        <input type="text" id="name" v-model="name" placeholder="请输入昵称" required>

                        <label for="breeds">品种</label>
                        <input type="text" id="breeds" v-model="breeds" placeholder="请输入品种" required>

                        <label for="health">健康状态</label>
                        <input type="text" id="health" v-model="health" placeholder="请输入健康状态" required>

                        <label for="notes">备注</label>
                        <input type="text" id="notes" v-model="notes" placeholder="请输入备注">

                        <label for="petpng">宠物照片</label>
                        <el-upload
                            class="upload-demo"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :before-remove="beforeRemove"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed"
                            :file-list="fileList">
                            <el-button size="small" type="primary">点击选择图片</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>

                        <p></p>

                        <button type="submit" id="submit-btn">上传</button>
                    </form>
                </div>


            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopNav from '@/views/TopNav.vue'
import LeftAside from '@/views/LeftAside.vue'
import axios from "axios";

// 导出模块
export default {
    name: "MainPage",
    data: function () {
        return {
            collapsed: false,
            name: '',
            breeds:'',
            health:'',
            notes:'',
            fileList: [],
        }
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        petupload() {
            const formData = new FormData();
            formData.append('picture', this.fileList);
            formData.append('name', this.name);
            formData.append('breeds', this.breeds);
            formData.append('health', this.health);
            formData.append('notes', this.notes);
            axios.post('http://10.136.132.34:9000/uploadPet', formData)
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('上传成功');
                        this.$router.push('/MainPage');
                    } else {
                        alert('上传失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('上传失败：' + error.message);
                });
        }
    },
    computed: { //计算属性
        asideClass: function () { //如果collapsed属性为true就展开不样式 反之就展开样式
            return this.collapsed ? "main-aside-collapsed" : "main-aside";
        }
    },
    components: { //引入组件
        TopNav,
        LeftAside

    },
    created: function () { //钩子函数
        this.$root.Bus.$on("Handle", value => {
            this.collapsed = value;
        });
    }
};
</script>
<style scoped>
body {
    background-color: #f1f1f1;
    font-family: Arial, Helvetica, sans-serif;
}

/*设置登录框的样式 */
.login-box {
    width: 500px;
    height: 550px;
    background-color: #fff;
    margin: 100px auto;
    border-radius: 10px;
    box-shadow: 0 0 5px #000;
    padding: 20px;
    color: aliceblue;
    background-color: #528aff;
}

/*设置输入框样式 */
input[type=text],
input[type=password],
input[type=email]
{
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 4px;
}

/* 按钮样式 */
button {
    background-color: aliceblue;
    color: #528aff;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
    width: 100%;
}

/* 按钮悬停效果 */
button:hover {
    background-color: #cccccc;
}
.main-container {
    height: 100%;
    width: 100%;
    box-sizing: border-box;
}

/* 不展开样式*/
.main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}

/* 展开样式*/
.main-aside {
    width: 200px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}

.main-header,
.main-center {
    padding: 0px;
    border-left: 2px solid #333;
}
</style>