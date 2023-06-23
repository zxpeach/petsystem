<template>
    <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#528aff" text-color="#fff"
             active-text-color="#ffd04b" :collapse="collapsed" :collapse-transition="bb">
        <div class="logobox">
            <img class="logoimg" src="../assets/logo.png" alt="">
        </div>
        <el-submenu index="1">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>宠物中心</span>
            </template>
            <el-menu-item-group>
                <template slot="title">我的宠物</template>
                <el-menu-item index="1-1">宠物列表</el-menu-item>
                <el-menu-item index="1-2">上传宠物</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group>
                <template slot="title">申请记录</template>
                <el-menu-item index="1-3">我的申请</el-menu-item>
                <el-menu-item index="1-4">他人申请</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>组织中心</span>
            </template>
            <el-menu-item-group>
                <template slot="title">我的组织</template>
                <el-menu-item index="2-1">组织列表</el-menu-item>
                <el-menu-item index="2-2">创建组织</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="申请记录">
                <el-menu-item index="2-3">我的申请</el-menu-item>
                <el-menu-item index="2-4">管理申请</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">我的帖子</span>
        </el-menu-item>
        <el-menu-item index="4">
            <i class="el-icon-document"></i>
            <span slot="title">我的消息</span>
        </el-menu-item>
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
    methods: {},
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
    min-height: 800px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
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
    height: 40px;
}

.TTTITLE
{
    height: 40px;
    line-height: 50px;
    color: #70f1b5;
    font-size: 25px;
}
</style>