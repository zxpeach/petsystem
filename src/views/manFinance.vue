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
                    <label for="projectname" style=" margin-top: 3px;">相关项目ID</label>
                    <input type="text" id="projectname" v-model="projectname" style="margin-left: 10px; " placeholder="相关项目ID" />、
                    <label for="projectdtl" style="margin-left: 10px; margin-top: 3px;">金额</label>
                    <input type="text" id="projectdtl" v-model="amount" style="margin-left: 10px; margin-top: 3px;" placeholder="请输入金额" />
                    <label for="projectdtl" style="margin-left: 10px; margin-top: 3px;">详情</label>
                    <input type="text" id="projectdtl" v-model="projectdtl" style="margin-left: 10px; margin-top: 3px;" placeholder="请输入详情" />
                    <select v-model="selected" style="margin-left: 10px; color:lightslategray;">
                        <option disabled value="">请选择财务类型</option>
                        <option value="option1">项目流水</option>
                        <option value="option2">补贴</option>
                        <option value="option3">绩效奖金</option>
                    </select>
                    <button v-on:click="SearchProject" style="margin-left: 10px; background-color:royalblue; border-color: aliceblue; color: aliceblue; border-radius: 5px; width: 60px; box-shadow: 0 0 3px #fff;">搜索</button>
                </div>
                <el-table
                        :data="tableData"
                        style="width: 90%; margin-left: 50px; margin-top: 30px;">
                    <el-table-column
                            prop="financeId"
                            label="财务ID"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="financeType"
                            label="财务类型"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="amount"
                            label="总资金"
                            width="150">
                    </el-table-column>
                    <el-table-column
                            prop="financeDescription"
                            label="描述"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="financeRecordTime"
                            label="时间"
                            width="200">
                    </el-table-column>
                    <el-table-column
                            prop="userId"
                            label="相关用户ID"
                            width="100">
                    </el-table-column>
                    <el-table-column
                            prop="projectId"
                            label="相关项目ID"
                            width="100">
                    </el-table-column>
                </el-table>

                <el-dialog
                    title="添加财务"
                    :visible.sync="centerDialogVisible"
                    width="46%"
                    center
                >

                    
                        <div class="login-box">
                    <form>

                        <label for="pn" class="bx">财务类型</label>
                        <input type="text" id="account" v-model="pn" class="t1" placeholder="请输入财务类型" required>

                        <label for="pc" class="bx">财务金额</label>
                        <input type="text" id="account" v-model="pc" class="t1" placeholder="请输入金额" required>

                        <label for="ps" class="bx">财务描述</label>
                        <input type="text" id="account" v-model="ps" class="t1" placeholder="请输入财务描述" required>

                        <label for="ps" class="bx">相关项目ID</label>
                        <input type="text" id="account" v-model="pi" class="t1" placeholder="请输入相关项目ID" required>

                        
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
            pc: 0,
            pi: '',
            opera: '',
            addname: '',
            amount: 0,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:9000/finance/list',{
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
        SearchProject() {
            const token = localStorage.getItem('token');
            const data = {
                ProjectId: this.projectname,
                financeDescription: this.projectdtl,
                financeType: this.selected,
                amount: this.amount
            };
            axios.post('http://localhost:9000/finance/search', data,{
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

        AddProject1(){
            this.centerDialogVisible = true;
        },

        AddProject2(){
            const token = localStorage.getItem('token');
            const data = {
                financeType: this.pn,
                amount: this.pc,
                financeDescription: this.ps,
                projectId: this.pi
            };
            axios.put('http://localhost:9000/finance/add', data,{
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
                axios.get('http://localhost:9000/finance/list',{
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

        doProject(row) {
            const token = localStorage.getItem('token');
            if (this.opera === 'option1') {
                const data = {
                    projectId: row.projectId,
                };
                axios.delete('http://localhost:9000/finance/delete', data)
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
                    projectId: row.projectId,
                    userIdList: [this.addname],
                };
                axios.put('http://localhost:9000/finance/addUser', data,{
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
            }
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
