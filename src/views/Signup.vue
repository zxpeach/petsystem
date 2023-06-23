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

                <body>
                <div class="login-box">
                    <h2 style="text-align:center">注册</h2>
                    <form  @submit.prevent="regist" >

                        <label for="account">用户名/账号</label>
                        <input type="text" id="account" v-model="account" placeholder="请输入用户名" required>

                        <label for="password">密码</label>
                        <input type="password" id="password" v-model="password" placeholder="请输入密码" required>

                        <label for="name">昵称</label>
                        <input type="text" id="name" v-model="name" placeholder="请输入用户名（非中文字符）" required>

                        <label for="province">省份</label>
                        <input type="text" id="province" v-model="province" placeholder="请输入省份信息" required>

                        <label for="city_or_county">城市</label>
                        <input type="text" id="city_or_county" v-model="city_or_county" placeholder="请输入城市（如秦皇岛市）名称" required>

                        <label for="distinguish">地区</label>
                        <input type="text" id="distinguish" v-model="distinguish" placeholder="请输入地区信息（如昌黎县、海港区）名称" required>

                        <label for="community">社区</label>
                        <input type="text" id="community" v-model="community" placeholder="请输入社区（如燕大小区）名称" required>

                        <label for="email">邮箱</label>
                        <input type="email" id="email" v-model="email" placeholder="请输入邮箱" required>
                        
                        <p></p>

                        <button type="submit" id="submit-btn">确认注册</button>
                    </form>
                </div>
                </body>

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
    name: "SignUp",
    data: function() {
        return {
            collapsed: false,
            name: '',
            id:'',
            password: '',
            province: '',
            city_or_county: '',
            distinguish: '',
            community: '',
            email: ''
        }
    },
    methods: {
        regist() {
            const data = {
                id: this.id,
                name: this.name,
                password: this.password,
                province: this.province,
                city_or_county: this.city_or_county,
                distinguish: this.distinguish,
                community: this.community,
                email: this.email
            };
            axios.post('http://10.136.132.34:9000/Regist', data)
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('注册成功');
                        this.$router.push('/login');
                    } else {
                        alert('注册失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('注册失败：' + error.message);
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
body {
    background-color: #f1f1f1;
    font-family: Arial, Helvetica, sans-serif;
}

/*设置登录框的样式 */
.login-box {
    width: 500px;
    height: 750px;
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
</style>