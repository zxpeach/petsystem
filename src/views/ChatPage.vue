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


                <div class="container">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>私信</span>

                    </div>

                    <div v-for="(contact, index) in contacts" :key="index" class="contact-container" @click="chat(contact.from_id)">
                        <div class="contact-header" >
                            <span class="contact-name">{{ contact.from_id }}</span>
                            <span class="contact-message">{{ contact.text }}</span>
                        </div>
                    </div>

                </el-card>
                <el-card class="box-card2">

                    <div class="chat-container" ref="chatContainer">
                        <div class="chat-box" ref="chatBox">
                            <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrap">
                                <ul class="message-list" ref="messageList">

                                    <li v-for="(message,index) in messages" :key="index" :class="getMessageClass(message)">
                                        <span class="author">{{ message.from_id }}</span>
                                        <span class="content">{{ message.text }}</span>
                                    </li>
                                </ul>
                            </el-scrollbar>
                        </div>
                        <div class="input-box">
                            <el-input
                                v-model="newMessage"
                                placeholder="请输入消息"
                                @keydown.enter.native="sendMessage"
                            />
                        </div>
                    </div>

                </el-card>
                </div>



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
    name: "MainPage",
    data: function() {
        return {
            collapsed: false,
            toid: '',
            messages: [

                // 其他聊天消息...
            ],
            newMessage: '',
            contacts: [

                // 其他联系人...
            ]
        }
    },
    mounted() {
        this.scrollToBottom();
        setInterval(() => {
            // 要执行的函数
            if(this.toid)this.chat(this.toid);
        }, 1000); // 1000毫秒（1秒）为间隔
        const token = localStorage.getItem('token');
        const data = {

        }
        axios.post('http://10.136.132.34:9000/getContactList',data,{
            headers: {
                'token': token
            }
        })
            .then((response) => {
                const { code,data } = response.data;
                if (code===1) {
                    this.contacts = data;
                } else {
                    alert('失败');
                }
                //得到信息后复制
            })
            .catch((error) => {
                console.error(error);
                alert('无法调取信息：' + error.message);
            });
    },
    methods: {

        sendMessage() {
            const token = localStorage.getItem('token');
            const data = {
                to_id : this.toid,
                text : this.newMessage,
            };
            this.newMessage = '';
            axios.post('http://10.136.132.34:9000/sendMessage',data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code } = response.data;
                    if (code===1) {
                        //location.reload();
                        this.chat(this.toid);
                    } else {
                        alert('失败');
                    }
                    //得到信息后复制
                })
                .catch((error) => {
                    console.error(error);
                    alert('无法调取信息：' + error.message);
                });
            this.scrollToBottom();
        },
        getMessageClass(message) {
            const token = localStorage.getItem('token');
            const payload = token.split('.')[1];
            const decodedPayload = atob(payload);
            const dat = JSON.parse(decodedPayload);
            return {
                'message-right': message.from_id == dat.id
            };
        },
        chat(x){
            this.toid = x;
            const data = {
                id: x
            };

            const token = localStorage.getItem('token');
            axios.post('http://10.136.132.34:9000/getContact', data,{
                headers: {
                    'token': token
                }
            })
                .then((response) => {
                    const { code, data} = response.data;
                    if (code===1) {
                        this.messages = data;
                    } else {
                        alert('获取信息失败');
                    }
                })
                .catch((error) => {
                    console.error(error);
                    alert('获取信息失败：' + error.message);
                });
        },
        scrollToBottom() {
            const container = this.$refs.chatContainer;
            const box = this.$refs.chatBox;
            if (container && box) {
                container.scrollTop = box.scrollHeight;
            }
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
.contact-container {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
}

.contact-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.contact-name {
    //font-weight: bold;
}

.contact-message {
    color: #666;
}
/* 不展开样式*/
.main-aside-collapsed {
    /* 在CSS中，通过对某一样式声明! important ，可以更改默认的CSS样式优先级规则，使该条样式属性声明具有最高优先级 */
    width: 64px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}
.chat-container {

    height: 400px;
}

.chat-box {
    overflow-y: auto;
    flex: 1;
    padding: 5px;
    border: 1px solid #ccc;
    height: 450px;
}

.scrollbar-wrap {
    height: 100%;
}

.message-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.message {
    margin-bottom: 10px;
}
.message-right {
    text-align: right;

}
.author {
    font-weight: bold;
}

.content {
    margin-left: 10px;
}

.input-box {
    margin-top: 10px;
}
.container {
    display: flex;
}
/* 展开样式*/
.main-aside {
    width: 200px !important;
    height: 100%;
    background-color: #ff695f;
    margin: 0px;
}
.box-card {
    margin-top: 60px;
    margin-left: 150px;
    width: 250px;
    height: 540px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    border-right: 1px solid #e8e8e8;
}
.box-card2 {
    font-family: -apple-system, BlinkMacSystemFont, "San Francisco", "Helvetica Neue", "Noto Sans", "Noto Sans CJK SC", "Noto Sans CJK", "Source Han Sans", "PingFang SC", "Segoe UI", "Microsoft YaHei", sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: rgba(0, 0, 0, .75);
    margin-top: 60px;
    margin-left: 3px;
    width: 700px;

}
.main-header,
.main-center {
    padding: 0px;
    border-left: 2px solid #333;
}
.scrollbar-wrap{
    height: 200px; /* 设置高度以限制滚动区域 */
}
</style>