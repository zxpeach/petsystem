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
                        style="width: 900px; margin-left: 150px; margin-top: 60px;">
                    <el-table-column
                            prop="organization_name"
                            label="组织名称"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="organization_id"
                            label="组织编号"
                            width="300">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="OrganizeDetails(scope.row)" type="text" size="small">查看信息</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog
                    title="组织详情"
                    :visible.sync="centerDialogVisible"
                    width="46%"
                    top="20vh"
                    center
                >

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>组织信息</span>
                            <el-button @click="DeleteOrganization" style="float: right; padding: 3px 0" type="text" >退出组织</el-button>
                            <el-button @click="centerDialogVisible = false" style="float: right; padding: 3px 0" type="text" >关闭</el-button>

                        </div>
                        <label for="OrganizeData.name" class="char_lt">名称 :</label>
                        <div>    {{ OrganizeData.name }}</div>
                        <label for="OrganizeData.id" class="char_lt">编号 :</label>
                        <div>    {{ OrganizeData.breeds }}</div>
                        <label for="OrganizeData.address" class="char_lt">地址 :</label>
                        <div>    {{ OrganizeData.address }}</div>
                        <label for="OrganizeData.email" class="char_lt">联系邮箱 :</label>
                        <div>    {{ OrganizeData.email }}</div>
                        <label for="OrganizeData.slogan" class="char_lt">组织标语 :</label>
                        <div>    {{ OrganizeData.slogan }}</div>
                        <label for="OrganizeData.Creator" class="char_lt">创建者 :</label>
                        <div>    {{ OrganizeData.Creator }}</div>

                    </el-card>

                </el-dialog>



            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入组件
import TopNav from '@/views/TopNav.vue'
import LeftAside from '@/views/LeftAside.vue'
import axios from 'axios'
// 导出模块
export default {
    name: "OrganizePage",//随便设的一个名，看看需不需要改
    data: function() {
        return {
            collapsed: false,
            tableData: [],
            OrganizeData: {},
            centerDialogVisible : false,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        const data = {
            id: this.id
        };
        axios.post('http://10.136.133.87:9000/Organize', data,{
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code, data} = response.data;
                if (code===1) {
                    this.tableData = data;
                } else {
                    alert('获取信息失败');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('获取信息失败：' + error.message);
            });
    },
    methods: {
        OrganizeDetails(row) {
            console.log(row);
            this.centerDialogVisible = true;
            const token = localStorage.getItem('token');
            const data = {
                id: row.id
            };
            axios.post('http://10.136.133.87:9000/getOrganization', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code, data} = response.data;
                    if (code===1) {
                        this.OrganizeData = data;
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });
        },

        DeleteOrganization(){
            alert('如果您是组织创建者，退出组织组织会自动解散，请慎重');
            const token = localStorage.getItem('token');
            const data = {
                id: this.OrganizeData.id
            };
            axios.post('http://10.136.133.87:9000/DeleteOrganization', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code} = response.data;
                    if (code===1) {
                        alert('退出成功');
                    } else {
                        alert('退出失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('退出失败：' + error.message);
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

.main-header,
.main-center {
    padding: 0px;
    border-left: 2px solid #333;
}
</style>
