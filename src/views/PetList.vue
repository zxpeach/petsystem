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
                            prop="pet_id"
                            label="宠物id"
                            width="300">
                    </el-table-column>
                    <el-table-column
                            prop="pet_name"
                            label="昵称"
                            width="300">
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="200">
                        <template slot-scope="scope">
                            <el-button @click="PetDetails(scope.row)" type="text" size="small">查看</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <el-dialog
                    title="宠物详情"
                    :visible.sync="centerDialogVisible"
                    width="46%"
                    top="20vh"
                    center
                >

                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>宠物信息</span>
                            <el-button @click="DeletePet" style="float: right; padding: 3px 0" type="text" >删除宠物</el-button>
                            <el-button @click="centerDialogVisible = false" style="float: right; padding: 3px 0" type="text" >关闭</el-button>

                        </div>
                        <label for="petData.name" class="char_lt">昵称 :</label>
                        <div>    {{ petData.name }}</div>
                        <label for="petData.breeds" class="char_lt">品种 :</label>
                        <div>    {{ petData.breeds }}</div>
                        <label for="petData.health" class="char_lt">健康状态 :</label>
                        <div>    {{ petData.health }}</div>
                        <label for="petData.notes" class="char_lt">城市 :</label>
                        <div>    {{ petData.notes }}</div>
                        <label for="petData.is_adopted" class="char_lt">是否被领养 : </label>
                        <div>    {{ petData.is_adopted }}</div>

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
import axios from "axios";

// 导出模块
export default {
    name: "PetList",
    data: function() {
        return {
            collapsed: false,
            tableData: [],
            petData: {},
            centerDialogVisible : false,
        }
    },
    mounted() {
        const token = localStorage.getItem('token');
        const payload = token.split('.')[1];
        const decodedPayload = atob(payload);
        const dat = JSON.parse(decodedPayload);
        axios.get('http://10.136.132.34:9000/MyPet',{
            params: {
                'id': dat.id
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
        PetDetails(row) {
            console.log(row);
            this.centerDialogVisible = true;
            const token = localStorage.getItem('token');
            const data = {
                id: row.id
            };
            axios.post('http://10.136.132.34:9000/getPet', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code, data} = response.data;
                    if (code===1) {
                        this.petData = data;
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });

        },
        DeletePet(){
            const token = localStorage.getItem('token');
            const data = {
                id: this.petData.id
            };
            axios.post('http://10.136.132.34:9000/DeletePet', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code} = response.data;
                    if (code===1) {
                        alert('删除成功');
                    } else {
                        alert('失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('失败：' + error.message);
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