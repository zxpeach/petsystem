<template>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#528aff" text-color="#fff" active-text-color="#fff">
        <el-button class="buttonimg">

        </el-button>
        <el-button class="loginbotton" v-if="this.IsLogin === false" v-on:click="login">登录</el-button>
        <el-button class="signupbotton" v-if="this.IsLogin === false" v-on:click="signup">注册</el-button>
        <el-submenu index="2" class="submenu">
            <template slot="title"><span id="username" class="name"></span></template>
            <el-menu-item index="2-1" v-on:click="chatpage">私信</el-menu-item>
            <el-menu-item index="2-2" v-on:click="userpage">个人中心</el-menu-item>
            <el-menu-item v-on:click="idquit" index="2-3">退出</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    name: "TopNav",
    data: function() {
        return {
            IsLogin:false,
            collapsed: false,
            //imgshow: require("../assets/img/show.png"),
            //imgsq: require("../assets/img/sq.png")
        }
    },
    mounted() {

        const token = localStorage.getItem('token');
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const data = JSON.parse(decodedPayload);
        const usernameElement = document.getElementById('username');
        usernameElement.textContent = data.name;
        if(data.id) this.IsLogin=true;
        else usernameElement.textContent="未登录";

    },
    methods: {
        doToggle: function() { //主要控制collapsed为true和false
            this.collapsed = !this.collapsed;
            this.$root.Bus.$emit("Handle", this.collapsed);
        },
        exit:function(){
            this.$router.push({
                path:'/'
            })
        },
        idquit(){
            localStorage.removeItem('token');
            alert('退出成功');
            location.reload();
        },
        login(){
            this.$router.push({name:'Login'});
        },
        signup(){
            this.$router.push({name:'Signup'});
        },
        userpage(){
            localStorage.setItem('sto_id', '');
            this.$router.push({name:'Userpage'});
        },
        chatpage(){
            this.$router.push({name:'ChatPage'});
        }
    }

}
</script>

<style scoped>

.el-menu-vertical-demo:not(.el-menu--collapse) {
    border: none;
}

.submenu {
    float: right;
}

.buttonimg {
    height: 60px;
    background-color: transparent;
    border: none;
}
.showimg {
    width: 26px;
    height: 26px;
    position: absolute;
    top: 17px;
    left: 17px;
}
.loginbotton{
    margin-left: 1000px;
    color: aliceblue;
    background-color: #528aff;
    text-align: end;
}
.signupbotton{
    margin-left: 10px;
    color: aliceblue;
    background-color: #528aff;
    /* text-align: end; */
}
.showimg:active {
    border: none;
}
</style>