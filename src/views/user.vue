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
                <div style="display: flex; height: 30px; margin-top: 30px; margin-left: 50px;">
                    <label for="id" style=" margin-top: 3px;">用户ID</label>
                    <input type="number" id="projectname" v-model="id" style="margin-left: 10px; " placeholder="请输入用户ID" />
                    <label for="name" style=" margin-top: 3px;">姓名</label>
                    <input type="text" id="projectname" v-model="name" style="margin-left: 10px; " placeholder="请输入用户姓名" />
                    <label for="projectname" style=" margin-top: 3px;">账户</label>
                    <input type="text" id="projectname" v-model="account" style="margin-left: 10px; " placeholder="请输入账户" />
                    <label for="projectname" style=" margin-top: 3px;">邮箱</label>
                    <input type="text" id="projectname" v-model="email" style="margin-left: 10px; " placeholder="请输入邮箱" />
                    <button v-on:click="SearchProject" style="margin-left: 10px; background-color:royalblue; border-color: aliceblue; color: aliceblue; border-radius: 5px; width: 60px; box-shadow: 0 0 3px #fff;">搜索</button>
                    <button v-on:click="AddProject1" style="margin-left: 10px; background-color:royalblue; border-color: aliceblue; color: aliceblue; border-radius: 5px; width: 100px; box-shadow: 0 0 3px #fff;">添加用户</button>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 90%; margin-left: 50px; margin-top: 30px;">
                    <el-table-column
                            prop="userId"
                            label="userId"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="userName"
                            label="姓名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="userAccount"
                            label="账户名"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="userPassword"
                            label="密码"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="userEmail"
                            label="邮箱"
                            width="250">
                    </el-table-column>
                    <el-table-column
                            prop="userAuthority"
                            label="用户身份"
                            width="100">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                        <template slot-scope="scope">
                            <div style="display: flex;">
                            <select v-model="opera" style="margin-left: 10px; color:lightslategray;">
                                <option disabled value="">请选择操作</option>
                                <option value="option1">删除</option>
                                <option value="option2">重置密码</option>
                                <option value="option3">设置考勤时间</option>
                            </select>
                            <el-button @click="doProject(scope.row)" type="text" size="small" style="margin-left: 10px;">确认</el-button>
                        </div>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog
                    title="添加用户"
                    :visible.sync="centerDialogVisible"
                    width="46%"
                    center
                >

                    
                        <div class="login-box">
                    <form>

                        <label for="pn" class="bx">用户名称</label>
                        <input type="text" id="account" v-model="pn" class="t1" placeholder="请输入用户名称" required>

                        <label for="pc" class="bx">用户姓名</label>
                        <input type="text" id="account" v-model="pc" class="t1" placeholder="请输入用户姓名" required>

                        <label for="ps" class="bx">用户邮箱</label>
                        <input type="text" id="account" v-model="ps" class="t1" placeholder="请输入用户邮箱" required>

                        
                        <button type="submit" id="submit-btn" class="t2" v-on:click="AddProject2" >确认添加</button>
                    </form>
                    </div>

                    

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
    name: "ProjectPage",//随便设的一个名，看看需不需要改
    data: function() {
        return {
            collapsed: false,
            tableData: [],
            OrganizeData: {},
            centerDialogVisible : false,
            selected: '', // 初始选中值
            projectdtl: '',
            projectname: '',
            pn: '',
            ps: '',
            pc: '',
            opera: '',
            addname: '',
            id: null,
            name: null,
            account: null,
            email: null,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        const data = {
            id: this.id,
            name: this.name,
            account: this.account,
            email: this.email
        }
        axios.post('http://localhost:9000/UserController/selectUser',data, {
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code, data} = response.data;
                if (code===1) {
                    this.tableData = data.staffList;
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
        SearchProject() {
            const token = localStorage.getItem('token');
            const data = {
            id: this.id,
            name: this.name,
            account: this.account,
            email: this.email
        }
        axios.post('http://localhost:9000/UserController/selectUser',data, {
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code, data} = response.data;
                if (code===1) {
                    this.tableData = data.staffList;
                } else {
                    alert('获取信息失败');
                }
            })
            .catch((error) => {
                console.error(error);
                alert('获取信息失败：' + error.message);
            });
        },

        AddProject1(){
            this.centerDialogVisible = true;
        },

        AddProject2(){
            const token = localStorage.getItem('token');
            const data = {
                account: this.pn,
                name: this.pc,
                email: this.ps,
            };
            axios.post('http://localhost:9000/UserController/addUser', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('添加成功');
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });
                this.$router.go(0);
        },

        doProject(row) {
            const token = localStorage.getItem('token');
            if (this.opera === 'option1') {
                const data = {
                    id: row.userId,
                };
                axios.post('http://localhost:9000/UserController/deleteUser', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('删除成功');
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });
            }
            if (this.opera === 'option2') {
                const data = {
                    id: row.userId,
                };
                axios.post('http://localhost:9000/UserController/resetPassword', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        alert('重置成功');
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });
            }
            const data = {
            id: this.id,
            name: this.name,
            account: this.account,
            email: this.email
        }
        axios.post('http://localhost:9000/UserController/selectUser',data, {
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code, data} = response.data;
                if (code===1) {
                    this.tableData = data.staffList;
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

.t1 {
    width: 80%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
    border-radius: 4px;

}

/* 按钮样式 */
.t2 {
    margin-left: 10%;
    margin-top: 20px;
    background-color: #528aff;
    color: aliceblue;
    padding: 14px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    box-sizing: border-box;
    width: 80%;
}

/* 按钮悬停效果 */
button:hover {
    background-color: #cccccc;
}

/* 不展开样式*/
.main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}

.bx {
    margin-left: 30px;
}


.login-box {
    width: 80%;
    margin-left: 70px;
    height: 400px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 0 3px #528aff;
    color: #528aff;
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
