<template>
    <el-menu class="el-menu-demo" mode="horizontal" background-color="#ffffff" text-color="333333"
        active-text-color="#333333">
        <el-button class="buttonimg">

        </el-button>
        <el-submenu index="2" class="submenu">
            <template slot="title">
                <input v-model="account" disabled>
            </template>
            <el-menu-item index="2-1" v-on:click="chatpage">私信</el-menu-item>
            <el-menu-item index="2-2" v-on:click="userpage">个人中心</el-menu-item>
            <el-menu-item v-on:click="idquit" index="2-3">退出</el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
import axios from "axios";

export default {
    name: "TopNav",
    data: function () {
        return {
            account:'',
            IsLogin: false,
            collapsed: false,
            //imgshow: require("../assets/img/show.png"),
            //imgsq: require("../assets/img/sq.png")
        }
    },
    mounted() {
        const tokenl = localStorage.getItem('token');
        const payloadl = tokenl.split('.')[1];
        const decodedPayloadl = atob(payloadl);
        const datl = JSON.parse(decodedPayloadl);
        if (datl.id) this.IsLogin = true;
        this.account = datl.account;

        axios.get('http://10.136.133.87:9000/getPerson', {
            params: {
                'id': datl.id
            }
        })
            .then((response) => {
                const now = response.data.data;
                this.avatar = 'http://10.136.133.87:9000/image/' + now.picture_id;
                //得到信息后复制
            })
            .catch((error) => {
                console.error(error);
            });

    },
    methods: {
        doToggle: function () { //主要控制collapsed为true和false
            this.collapsed = !this.collapsed;
            this.$root.Bus.$emit("Handle", this.collapsed);
        },
        exit: function () {
            this.$router.push({
                path: '/'
            })
        },
        idquit() {
            localStorage.removeItem('token');
            alert('退出成功');
            this.$router.push({ name: 'Login' });
        },
        login() {
            this.$router.push({ name: 'Login' });
        },
        signup() {
            this.$router.push({ name: 'Signup' });
        },
        userpage() {
            localStorage.setItem('sto_id', '');
            this.$router.push({ name: 'Userpage' });
        },
        chatpage() {
            this.$router.push({ name: 'ChatPage' });
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

.loginbotton {
    margin-left: 1000px;
    color: #528aff;
    background-color: #ffffff;
    text-align: end;
}

.signupbotton {
    margin-left: 10px;
    color: #528aff;
    background-color: #ffffff;
    /* text-align: end; */
}

.showimg:active {
    border: none;
}
</style>