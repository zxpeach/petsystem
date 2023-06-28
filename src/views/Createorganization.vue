<template>
    <el-container class="main-container">
        <el-aside v-bind:class="asideClass">
            <LeftAside></LeftAside>
        </el-aside>
        <el-container>
            <el-header class="main-header">
                <TopNav></TopNav>
            </el-header>
            <el-main class="main-center">


                <el-card class="box-card">
                    
                    <div slot="header" class="clearfix">
                        <span >创建组织</span>
                    </div>

                    <form  @submit.prevent="Create" >

                        <label for="name" class="char_lt">组织名称</label>
                        <input type="text" id="account" v-model="account" placeholder="请输入组织名称" required>

                        <label for="id" class="char_lt">组织编号</label>
                        <input type="text" id="id" v-model="id" placeholder="请输入编号，可且仅可包含阿数字与字母" required>

                        <label for="address">地址</label>
                        <input type="text" id="address" v-model="address" placeholder="请输入地址" required>

                        <label for="email">联系邮箱</label>
                        <input type="email" id="email" v-model="email" placeholder="请输入邮箱" required>
                        
                        <label for="slogan">组织标语</label>
                        <input type="text" id="slogan" v-model="slogan" placeholder="请输入组织标语" required>
                        


                        <button type="submit" id="submit-btn">确认创建</button>
                    </form>
                
                </el-card>


                
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopNav from '@/views/TopNav.vue'
import LeftAside from '@/views/LeftAside.vue'
import axios from 'axios'
// 导出模块
export default {
    name: "CreateOrganization",
    data: function() {
        return {
            collapsed: false,
            name : '',
            id: '',
            address: '',
            email: '',
            slogan: '',
            creator: ''//直接调用登录数据，将创建者设置为管理员
        }
    },
    methods: {
        Create() {
            const data = {
                id: this.id,
                name: this.name,
                address: this.address,
                email: this.email,
                slogan: this.slogan,
                creator: this.creator
            };
            axios.post('http://10.136.133.87:9000/CreateOrganization', data)
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('创建成功,正在为您跳转至首页');
                        this.$router.push('/MainPage');
                    } else {
                        alert('创建失败，组织编号已存在，请重新输入');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('创建失败：' + error.message);
                });
        }
    },
    computed: { //计算属性
        asideClass: function() { //如果collapsed属性为true就展开不样式 反之就展开样式
            return this.collapsed ? "main-aside-collapsed" : "main-aside";
        }
    },
    components: { //引入组件
        TopNav,
        LeftAside

    },
    created: function() { //钩子函数
        this.$root.Bus.$on("Handle", value => {
            this.collapsed = value;
        });
    }
};
</script>
<style scoped>

.char_lt
{
    /* color: #333; */
    text-align: left;
    font-family: '宋体';
    font-size: 15px;
    line-height: 2.5;
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


input[type=text],
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
.box-card {
    margin-top: 60px;
    margin-left: 150px;
    width: 900px;
}
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

</style>
