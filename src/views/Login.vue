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

                <div class="login-box">
                    <h2 style="text-align:center">欢迎登录</h2>

                    <form>
                        <label for="id">账号</label>
                        <input type="text" id="id" v-model="id" placeholder="请输入账号" />

                        <label for="password">密码</label>
                        <input type="password" id="password" v-model="password" placeholder="请输入密码"  />

                        <button type="submit" value="Login" v-on:click="login">登录</button>
                        <button type="submit" v-on:click="gosignup">注册</button>
                    </form>
                    <div id="error-message" style="display: none; color: red;">Invalid username or password.</div>

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
    name: "LoginPage",
    data: function() {
        return {
            id: '',
            password: '',
            collapsed: false
        }
    },
    methods: {
        login() {
            const data = {
                id: this.id,
                password: this.password
            };
            axios.post('http://10.136.132.34:9000/login', data)
                .then((response) => {
                    const { code, msg, data } = response.data;
                    if (code === 1) {
                        // 登录成功，将 JWT 令牌存储到本地
                        localStorage.setItem('token', data);
                        alert('登录成功');
                        this.$router.push('/MainPage');
                    } else {
                        alert('登录失败：' + msg);
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('登录失败：' + error.message);
                });
        },
        gosignup(){
            this.$router.push('/signup');
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
    height: 350px;
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
input[type=password] {
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