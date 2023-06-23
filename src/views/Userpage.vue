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

                <div class="user-box">
                    <h2 style="text-align: center;font-size: 50px;">个人信息</h2>

                    <form>

                        <label for="name" class="char_lt">用户名:</label>
                        <div>    {{ name }}</div>
                        <label for="id" class="char_lt">账号 :</label>
                        <div>    {{ id }}</div>
                        <label for="password" class="char_lt">密码 :</label>
                        <div>    {{ password }}</div>
                        <label for="province" class="char_lt">省份:</label>
                        <div>    {{ province }}</div>
                        <label for="city_or_county" class="char_lt">城市 :</label>
                        <div>    {{ city_or_county }}</div>
                        <label for="distinguish" class="char_lt">下辖地区 : </label>
                        <div>    {{ distinguish }}</div>
                        <label for="community" class="char_lt">社区 :</label>
                        <div>    {{ community }}</div>
                        <label for="email" class="char_lt">邮箱 :</label>
                        <div>    {{ email }}</div>

                        <!-- 信息罗列 -->

                        <el-button type="info" id="change-info" font-size=90px round>修改信息</el-button>
                        <!-- 连接修改信息网页 -->

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
    name: "UserPage",
    data: function() {
        return {
            collapsed: false,
            id: '',
            password:'',
            name: '',
            province: '',
            city_or_county: '',
            distinguish: '',
            community: '',
            email: ''
        }
    },
    methods: {
        userinfo(){
            const data={
                id: this.id
                // 以用户id进行查找
            };
            axios.post('http://10.136.132.34:9000/login', data)
            .then((response) => {
                const now=response.data;
                this.id=now.id;
                this.password=now.password;
                this.name=now.name;
                this.province=now.province;
                this.city_or_county=now.city_or_county;
                this.distinguish=now.distinguish;
                this.community=now.community;
                this.email=now.email;
                //得到信息后复制
            })
            .catch((error) => {
                console.error(error);
                alert('无法调取信息：' + error.message);
            });
        }
    },
    gouserpage(){
        this.$router.push('/Userpage');
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

.user-box {
    width: 700px;
    height: 950px;
    background-color: #fff;
    margin: 100px auto;
    border-radius: 10px;
    box-shadow: 0 0 5px #000;
    padding: 20px;
    color: aliceblue;
    background-color: #9a52ff;
}

/* “邮箱”“省份”等相关标题的字体 */
.char_lt
{
    /* color: #333; */
    text-align: left;
    font-family: '宋体';
    font-size: 30px;
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
</style>