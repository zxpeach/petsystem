<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#ffffff" text-color="#333333"
             active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb" >
        <div class="logobox" v-on:click="mainpage">
            
        </div>
        <el-menu-item index="1" v-on:click="mainpage">
            <i class="el-icon-menu" v-on:click="mainpage"></i>
            <span slot="title" v-on:click="mainpage">首页</span>
        </el-menu-item>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>考勤中心</span>
            </template>
            <el-menu-item-group>
                <template slot="title">功能列表</template>
                <el-menu-item index="2-1" v-on:click="kaoqin">考勤管理</el-menu-item>
                <el-menu-item index="2-2" v-on:click="qingjia">请假审批</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>日程管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">功能列表</template>
                <el-menu-item index="3-1" v-on:click="org">员工日程</el-menu-item>
                <el-menu-item index="3-2" v-on:click="creatorg">会议管理</el-menu-item>
                <el-menu-item index="3-3" v-on:click="creatorg">记事本</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>财务管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">功能列表</template>
                <el-menu-item index="4-1" v-on:click="finance">财务管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>项目管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">功能列表</template>
                <el-menu-item index="5-1" v-on:click="project">项目管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="6">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>系统管理</span>
            </template>
            <el-menu-item-group>
                <template slot="title">功能列表</template>
                <el-menu-item index="6-1" v-on:click="user">用户管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>

    </el-menu>
</template>
<script>
export default {
    name: "LeftAside",
    data: function() {
        return {
            collapsed: false,
            bb: true
        }
    },
    methods: {
        mainpage(){
            this.$router.push({name:'MainPage'});
        },
        petlist(){
            this.$router.push({name:'PetList'});
        },
        petupload(){
            this.$router.push({name:'PetUpload'});
        },
        myapply(){
            this.$router.push({name:'MyApply'});
        },
        otherapply(){
            this.$router.push({name:'OtherApply'});
        },
        creatorg(){
            this.$router.push({name:'Creatorganization'});
        },
        org(){
            this.$router.push({name:'Organize'});
        },
        uploadpost(){
            this.$router.push({name:'UploadPost'});
        },
        project(){
            this.$router.push({name:'Project'});
        },
        qingjia(){
            this.$router.push({name:'qingjia2'});
        },
        mypost(){
            this.$router.push({name:'MyPost'});
        },
        kaoqin(){
            this.$router.push({name:'kaoqin'});
        },
        user(){
            this.$router.push({name:'user'});
        },
        finance(){
            this.$router.push({name:'Finance'});
        }

    },
    created: function() { //钩子函数
        this.$root.Bus.$on("Handle", value => {
            this.collapsed = value;
        });
    }

}
</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 2000px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    border: none;
    text-align: left;
}

.el-menu-item-group__title {
    padding: 0px;
}

.el-menu-bg {
    background-color: #9d9d9d !important;
    color: #528aff
}

.el-menu {
    border: none;
}

.logobox {
    height: 40px;
    line-height: 40px;
    color: #9d9d9d;
    font-size: 20px;
    text-align: center;
    padding: 20px 0px;
}

.logoimg {
    height: 80px;
    margin-top: -17px;
}

.TTTITLE
{
    height: 40px;
    line-height: 50px;
    color: #70f1b5;
    font-size: 25px;
}
</style>