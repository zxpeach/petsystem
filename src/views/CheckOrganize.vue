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
                            prop="user_name"
                            label="用户昵称"
                            width="300">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="UserDetails(scope.row)" type="text" size="small">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog
                    title="用户详情"
                    :visible.sync="centerDialogVisible"
                    width="46%"
                    top="20vh"
                    center
                >

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>用户信息</span>
                            <el-button @click="GetUserPost" style="float: right; padding: 3px 0" type="text" >允许申请</el-button>
                            <el-button @click="DeleteUserPost" style="float: right; padding: 3px 0" type="text" >拒绝申请</el-button>
                            <el-button @click="centerDialogVisible = false" style="float: right; padding: 3px 0" type="text" >关闭</el-button>

                        </div>
                        <label for="UserData.id" class="char_lt">用户id :</label>
                        <div>    {{ UserData.id }}</div>
                        <label for="UserData.slogan" class="char_lt">备注 :</label>
                        <div>    {{ UserData.slogan }}</div>

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
    name: "MainPage",
    data: function() {
        return {
            collapsed: false,
            tableData: [],
            UserData: {},
            centerDialogVisible : false,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        const data = {
            id: this.id
        };
        axios.post('http://10.136.132.34:9000/PostOrganize', data,{
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
        UserDetails(row) {
            console.log(row);
            this.centerDialogVisible = true;
            const token = localStorage.getItem('token');
            const data = {
                id: row.id
            };
            axios.post('http://10.136.132.34:9000/getUserPost', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code, data} = response.data;
                    if (code===1) {
                        this.UserData = data;
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });

        },

        DeleteUserPost(){
            const token = localStorage.getItem('token');
            const data = {
                id: this.UserData.id
            };
            axios.post('http://10.136.132.34:9000/DeleteUserPost', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code} = response.data;
                    if (code===1) {
                        alert('拒绝成功');
                    } else {
                        alert('拒绝失败，请稍后重试');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('失败：' + error.message);
                });
        },

        GetUserPost(){
            const token = localStorage.getItem('token');
            const data = {
                id: this.UserData.id
            };
            axios.post('http://10.136.132.34:9000/GetUserPost', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code} = response.data;
                    if (code===1) {
                        alert('同意成功');
                    } else {
                        alert('同意失败，请稍后重试');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('失败：' + error.message);
                });
        },
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