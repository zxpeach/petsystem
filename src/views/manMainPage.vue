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
                <div class="main1">
                    <div style="width: 70%; margin-left: 100px; margin-top: 40px;">
                        <span class="demonstration"></span>
                        <el-carousel :interval="4000" type="card" height="300px">
                            <el-carousel-item v-for="(png,index) in pngList" :key="index">

                                <img :src = "png" alt="Image" class="logoimg"/>

                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <div class="qiandao">
                        <button class="qdheader" v-on:click="qiandao">签到考勤</button>
                        <div style="display: flex;">
                            <div class="qdtext">签到时间: 2024-09-07 13:58</div>
                        </div>
                        <button class="qdheader">请假</button>
                        <div style="display: flex;">
                            <div class="qdtext">请假时间: 2024-09-07 13:58</div>
                        </div>
                    </div>
                
                </div>
                <el-page-header @back="goBack" content="签到记录" style="margin-left: 60px; margin-top: 50px;">
                    </el-page-header>
                <el-table
                        :data="postList"
                        style="width: 72%; margin-left: 5%; margin-top: 60px;">
                    <el-table-column
                            prop="attendanceId"
                            label="签到编号"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="attendanceTime"
                            label="签到时间"
                            width="400">
                    </el-table-column>
                    <el-table-column
                            prop="attendanceState"
                            label="状态"
                            width="100">
                    </el-table-column>
                </el-table>

            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopNav from '@/views/TopNav.vue'
import LeftAside from '@/views/manLeftAside.vue'
import axios from "axios";

// 导出模块
export default {
    name: "MainPage",
    data: function() {
        return {
            my_id:'',
            postList:[],
            pngList:[
                ],
            collapsed: false,
            currentDate: new Date()
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        axios.get('http://10.53.16.146:9000/AttendanceController/attendanceList',{
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code, data} = response.data;
                if (code===1) {
                    this.postList = data.attendanceList;
                }
            })
            .catch((error) => {
                console.error(error);
                //alert('获取信息失败：' + error.message);
            });
    },
    methods: {
        qiandao() {
            const token = localStorage.getItem('token');
            axios.get('http://10.53.16.146:9000/AttendanceController/attendance',{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { data } = response.data;
                    alert(data);
                })
                .catch((error) => {
                    console.error(error);
                    //alert('获取信息失败：' + error.message);
                });
        },
        gouser(uid){
            localStorage.setItem('sto_id', uid);
            this.$router.push({name:'Userpage'});
        },
        gopost(postid){
            localStorage.setItem('post_id', postid);
            this.$router.push({name:'PostPage'});
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
.logoimg {
    height: 300px;
    width: 500px;
}
/* 展开样式*/
.main-aside {
    width: 200px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.main-header,
.main-center {
    padding: 0px;
    border-left: 2px solid #333;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 90px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
}
.time {
    font-size: 13px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    width: 250px;
}

.button {
    padding: 0;
    margin-right: 20px;
    float: right;
}

.image {
    height: 300px;
    width: 250px;
    display: block;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}
.main1 {
    width: 100%;
    display: flex;
    height: 400px;
}

.qiandao {
    box-shadow: 0 0 5px rgb(252, 202, 131);
    background-color: #ffffff;
    margin-left: 20px;
    margin-top: 40px;
    width: 20%;
    height: 95%;
}

.qdheader {
    font-size: 25px;
    background-color: rgb(245, 125, 39);
    box-shadow: 0 0 1px aliceblue;
    border-color: aliceblue;
    border-radius: 75px;
    height: 150px;
    width: 150px;
    color: aliceblue;
    text-align: center;
    margin-top: 5px;
    margin-left: 25%;
}
.qdtext{
    font-size: 14px;
    color:#6d6b6b;
    text-align: center;
    margin-left: 18%;
    margin-top: 10px;
}
</style>