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

                <div style="width: 1000px; margin-left: 100px; margin-top: 40px;">
                    <span class="demonstration"></span>
                    <el-carousel :interval="4000" type="card" height="300px">
                        <el-carousel-item v-for="(png,index) in pngList" :key="index">
                            <img :src = "png" alt="Image" class="logoimg"/>


                            <div class="slider-cat">
                                <span class="b2-radius"><b style="border-left:4px solid #607d8b"></b>宠物新鲜事</span>
                            </div>

                            <h2>每年冬天60%的流浪猫都会被冻死！建议大家领养猫代替购买猫！</h2>


                        </el-carousel-item>
                    </el-carousel>
                </div>


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
            pngList:[
                'https://img2.baidu.com/it/u=1114221024,412737789&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500',
                 'https://img1.baidu.com/it/u=1505021688,2426333584&fm=253&fmt=auto&app=120&f=JPEG?w=928&h=500',
                'https://img.chongwuzhi.com.cn/2023/02/20230206143042374.png?imageView2/0/format/webp/q/75|imageslim',
                'https://img1.baidu.com/it/u=1916585894,1667750262&fm=253&fmt=auto&app=138&f=JPEG?w=883&h=500'],
            collapsed: false,
            currentDate: new Date()
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
</style>