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

                <el-table
                    :data="tableData"
                    style="margin-top: 30px; margin-left: 60px; width: 90%">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item label="概要">
                                    <label class="TTTitle">
                                        <span>{{ props.row.title }}</span>
                                    </label>
                                </el-form-item>
                                <br>
                                <el-form-item label="内容">
                                    <label class="TTTitle">
                                        <span>{{ props.row.text }}</span>
                                    </label>
                                </el-form-item>
                                <br>
                                <el-form-item label="发布人">
                                    <label class="TTTitle">
                                        <span>{{ props.row.id }}</span>
                                    </label>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="公告栏"
                        prop="time">
                        
                    </el-table-column>

                </el-table>


                <el-row :gutter="10">
                    <el-page-header @back="goBack" content="帖子列表" style="margin-left: 60px; margin-top: 50px;">
                    </el-page-header>
                    <el-col :span="5" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 0 : 0">
                        <el-card :body-style="{ padding: '0px' }" style="width: 250px; margin-top: 50px; margin-left: 60px;">
                            <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F2d6af970-4795-447e-a4ae-f460b4415961%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1689927291&t=7b07c4529a4c19017830457c41e0e335" class="image">
                            <div style="padding: 14px;">
                                <span>我超，原</span>
                                <div class="bottom clearfix">
                                    <router-link to="/MainPage" class="menu-item">root</router-link>
                                </div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>


            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopNav from '@/views/TopNav.vue'
import LeftAside from '@/views/LeftAside.vue'

// 导出模块
export default {
    name: "MainPage",
    data: function() {
        return {
            collapsed: false,
            currentDate: new Date(),
            tableData: [
                {time: '2023-06-15', title: '关于该系统的相关内容\n', text: '本系统现为1.0版，将来会不断维护更新以满足不同系统与浏览器的情况，如有bug欢迎联系', id: '123456789@126.com'},
            ]
        }
    },
    methods: {

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

.TTTitle {
  font-family: "黑体", sans-serif;
  font-weight: bold;
  text-align: left;
  font-size: 20px;
}

</style>
