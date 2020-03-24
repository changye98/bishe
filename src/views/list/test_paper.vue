<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="试卷名称" style="margin-left: 50px">
                            <a-input v-model="queryParam.name" placeholder=""/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="试卷分数" style="margin-left: -150px">
                            <a-input v-model="queryParam.score" placeholder=""/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="试卷描述" style="margin-left: -350px">
                            <a-input v-model="queryParam.description" placeholder=""/>
                        </a-form-item>
                    </a-col>
                    <span
                            class="table-page-search-submitButtons"
                    >
              <a-button type="primary" @click="queryList(pagination.current)" style="margin-left: -500px">查询</a-button>
              <a-button style="margin-left: 15px" @click="() => queryParam = {}">重置</a-button>
              <a-button type="primary" icon="plus" @click="$refs.createExamModal.create()" style="margin-left: 200px">新建</a-button>
            </span>
                </a-row>
            </a-form>
        </div>

        <a-table :columns="columns" :dataSource="data" :rowKey="record => record.id" :pagination="pagination">
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>

            <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleSub(record)">详情</a>
          <a-divider type="vertical"/>
          <!--<a @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical"/>-->
          <a @click="handleDelete(record)">删除</a>
        </template>
      </span>

        </a-table>
        <create-form ref="createModal" @ok="handleOk"/>
        <!-- ref是为了方便用this.$refs.modal直接引用，上同 -->
        <step-by-step-exam-modal @queryList="queryList" ref="createExamModal" @ok="handleOk"/>
        <question-view-modal ref="modalView" @ok="handleOk"/>
        <question-edit-modal ref="modalEdit" @ok="handleOk"/>
    </a-card>
</template>

<script>
  import moment from 'moment'
  import QuestionViewModal from './questionModules/QuestionViewModal'
  import QuestionEditModal from './questionModules/QuestionEditModal'
  import CreateForm from './questionModules/CreateForm'
  import  {getAction,postAction} from "@/http";
  import StepByStepExamModal from './examModules/StepByStepExamModal'

  export default {
    name: 'ExamTableList',
    components: {
      StepByStepExamModal,
      CreateForm,
      QuestionViewModal,
      QuestionEditModal
    },
    data () {
      return {
        data:[],
        pagination:{
          current:1,
          pageSize:10,
          total:0,
          onChange: page => {
            getAction("/exam/manageList",{currentPage:page}).then(res => {
              if (res.data.success === true) {
                this.data = res.data.result.records
                this.pagination.current =res.data.result.current
                this.pagination.total =res.data.result.total
              }
            })

          },
          showTotal: (total, range) => {
            return  range[0] + '-' + range[1] + ' 共' + total + '条'
          },
        },
        mdl: {},
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '#',
            scopedSlots: { customRender: 'serial' }
          },
          {
            title: '名称',
            dataIndex: 'name',
            width: 250
          },
          {
            title: '总分数',
            dataIndex: 'score'
          },
          {
            title: '描述',
            dataIndex: 'desc'
          },
          {
            title: '创建人',
            dataIndex: 'creator'
          },
          {
            title: '时长',
            dataIndex: 'elapse'
          },
          {
            title: '创建时间',
            dataIndex: 'updateTime'
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '160px',
            scopedSlots: { customRender: 'action' }
          }
        ],
      }
    },
    created () {
      this.queryList(1)
    },
    methods: {
      queryList(pageNo){
        const  that = this
        getAction("/exam/manageList",{currentPage:pageNo,name:that.queryParam.name,score:that.queryParam.score,
          description:that.queryParam.description
        }).then(res => {
          if (res.data.success === true) {
            that.data =  res.data.result.records ;
            console.log(that.data)
            that.pagination.current =res.data.result.current
            that.pagination.total =res.data.result.total
          } else {
            this.$notification.error({
              message: '获取问题列表失败',
              description: res.msg
            })
          }
        })
      },
      handleEdit (record) {
        // Todo:修改考试信息和下面的题目，弹出一个可修改的输入框，实际上复用创建题目的模态框即可，还没做完
        console.log(record)
        this.$refs.modalEdit.edit(record)
      },
      handleSub (record) {
        // 查看题目，不在模态框里查啦，太麻烦
        // console.log(record)
        // this.$refs.modalView.edit(record)

        // 直接跳到参加考试的页面，查看所有题目的详细情况
        const routeUrl = this.$router.resolve({
          path: `/exam/${record.id}`
        })
        // 和点击考试卡片效果一样，跳转到考试页面，里面有所有题目的情况，相当于就是详情了
        window.open(routeUrl.href, '_blank')
      },
      handleOk () {
        this.$refs.table.refresh()
      },
      handleDelete (record) {
        // 弹出一个可修改的输入框
        const that = this
        this.$confirm({
          title: '提示',
          content: '确定要删除吗 ?',
          onOk () {

            getAction("/exam/delete",{id:record.id}).then(res => {
              if (res.data.success === true) {
                that.$notification.success({
                  message: '成功',
                  description: "删除问题成功"
                })
                that.queryList(1)
              } else {
                that.$notification.error({
                  message: '失败',
                  description: '删除问题失败'
                })
              }
            })
          },
          onCancel () {
          }
        })
        console.log(record)

      },
      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    }
  }
</script>
