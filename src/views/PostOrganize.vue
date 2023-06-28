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
                        <span >加入组织</span>
                    </div>

                    <form  @submit.prevent="Postt" >

                        <label for="id" class="char_lt">组织编号</label>
                        <input type="text" id="id" v-model="id" placeholder="请输入组织编号，可且仅可包含阿数字与字母" required>

                        <label for="slogan" >备注</label>
                        <input type="text" id="slogan" v-model="slogan" placeholder="请输入备注" required>
                        
                        <hr>

                        <button type="submit" id="submit-btn">确认提交</button>
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
import axios from "axios";

// 导出模块
export default {
    name: "PostOrganize",
    data: function() {
        return {
            collapsed: false,
            id: '',
            hos: '',//发起申请的人
            slogan: ''
        }
    },
    methods: {
        Postt(){
            const token = localStorage.getItem('token');
            const data={
                id: this.id,
                hos: this.hos,
                slogan: this.slogan
            }
            axios.post('http://10.136.132.34:9000/Postorganize', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code } = response.data;
                    if (code === 1) {
                        alert('发送成功，请等待管理员验证');
                        this.$router.push('/MainPage');
                    } else {
                        alert('发送失败，请稍后重试');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('发送失败：' + error.message);
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

.char_lt
{
    /* color: #333; */
    text-align: left;
    font-family: '宋体';
    font-size: 15px;
    line-height: 2.5;
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

.main-header,
.main-center {
    padding: 0px;
    border-left: 2px solid #333;
}

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
</style>
