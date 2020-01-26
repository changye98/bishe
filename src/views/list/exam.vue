<template>
    <div class="card-list" ref="content">

        <a-list
                :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
                :dataSource="dataSource"
                :pagination="pagination"
                :loading="loading"

        >
            <a-list-item slot="renderItem" slot-scope="item">
                <a-card :hoverable="true" @click="joinExam(item.examId)">
                    <a-card-meta>
                        <div style="margin-bottom: 3px" slot="title">{{ item.examName  }}</div>
                        <a-avatar class="card-avatar" slot="avatar" :src="item.examAvatar" size="large"/>
                        <div class="meta-content" slot="description">{{ item.examDescription }}</div>
                    </a-card-meta>
                    <template class="ant-card-actions" slot="actions">
                        <a>满分：{{ item.examScore }}分</a>
                        <a>限时：{{ item.examTimeLimit }}分钟</a>
                    </template>
                </a-card>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
  import  {getAction} from "@/http";
    export default {
        name: "exam",
      data () {
        return {
          description: '您可以随意点击下面的考试卡片开始一场属于您的考试',
          extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
          pagination:{
            current:1,
            pageSize:9,
            total:0,
            onChange: page => {
              this.loading=true
              getAction("/exam/list",{currentPage:page}).then(res => {
                if (res.data.success === true) {
                  this.dataSource = res.data.result.records
                  this.pagination.current =res.data.result.current
                  this.pagination.total =res.data.result.total
                  this.loading=false
                }
              })

            },
            loading:false,
            showTotal: (total, range) => {
              return  range[0] + '-' + range[1] + ' 共' + total + '条'
            },
          },
          dataSource: [],
          url:{
            initExamCardList:"/exam/list"
          }
        }
      },
      methods: {
        joinExam (id) {
          console.log(id)
          const routeUrl = this.$router.resolve({
            path: `/exam/${id}`
          })
          window.open(routeUrl.href, '_blank')
        },
        queryList(pageNo){
          this.loading=true
          getAction("/exam/list",{currentPage:pageNo}).then(res => {
            console.log(res)
            if (res.data.success === true) {
              this.dataSource = res.data.result.records
              this.pagination.current =res.data.result.current
              this.pagination.total =res.data.result.total
              this.loading=false
            } else {
              this.$notification.error({
                message: '获取考试列表失败',
                description: res.msg
              })
              this.loading=false
            }
          }).catch(err => {
            // 失败就弹出警告消息
            this.$notification.error({
              message: '获取考试列表失败',
              description: err.message
            })
          })
        }
      },
      created () {
        // 从后端数据获取考试列表，适配前端卡片
        this.queryList(1)
      }
    }
</script>

<style scoped>

</style>