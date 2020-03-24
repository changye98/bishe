<template>
    <a-card :bordered="false">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col :md="8" :sm="24">
                        <a-form-item label="题干名称" style="margin-left: 50px">
                            <a-input v-model="queryParam.name" placeholder=""/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="题目分数" style="margin-left: -150px">
                            <a-input v-model="queryParam.score" placeholder=""/>
                        </a-form-item>
                    </a-col>
                    <a-col :md="8" :sm="24">
                        <a-form-item label="题目难度" style="margin-left: -300px">
                            <a-select v-model="queryParam.level" placeholder="请选择" default-value="0" style="width: 100px">
                            <a-select-option value="0">全部</a-select-option>
                            <a-select-option value="3">易</a-select-option>
                            <a-select-option value="2">中</a-select-option>
                            <a-select-option value="1">难</a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
            <span
                    class="table-page-search-submitButtons"
                    >
              <a-button type="primary" @click="queryList(pagination.current)" style="margin-left: -500px">查询</a-button>
              <a-button style="margin-left: 15px" @click="() => queryParam = {}">重置</a-button>
              <a-button type="primary" icon="plus" @click="$refs.createQuestionModal.create()" style="margin-left: 200px">新建</a-button>
            </span>
                </a-row>
            </a-form>
        </div>

        <a-table :columns="columns" :dataSource="data" :rowKey="record => record.id" :pagination="pagination">
            <p slot="expandedRowRender" slot-scope="record" style="margin-left: 80px">描述 : {{record.description}}</p>
      <span slot="serial" slot-scope="text, record, index">
        {{ index + 1 }}
      </span>

       <span slot="action" slot-scope="text, record">
        <template>
          <a @click="handleSub(record)">详情</a>
          <a-divider type="vertical"/>
          <a @click="handleEdit(record)">编辑</a>
            <a-divider type="vertical"/>
          <a @click="handleDelete(record)">删除</a>
        </template>
      </span>
        </a-table>

        <create-form ref="createModal" @ok="handleOk"/>
        <!-- ref是为了方便用this.$refs.modal直接引用，上同 -->
        <step-by-step-question-modal @queryList="queryList" ref="createQuestionModal" @ok="handleOk"/>
        <question-view-modal ref="modalView" @ok="handleOk"/>
        <question-edit-modal @queryList="queryList" ref="modalEdit" @ok="handleOk"/>
    </a-card>
</template>

<script>
  import moment from 'moment'
  import QuestionViewModal from './questionModules/QuestionViewModal'
  import QuestionEditModal from './questionModules/QuestionEditModal'
  import StepByStepQuestionModal from './questionModules/StepByStepQuestionModal'
  import CreateForm from './questionModules/CreateForm'
  import  {getAction,postAction} from "@/http";

  export default {
    name: 'QuestionTableList',
    components: {
      StepByStepQuestionModal,
      //STable,
      CreateForm,
      QuestionViewModal,
      QuestionEditModal
    },
    data () {
      return {
        data:[],
        mdl: {},
        pagination:{
          current:1,
          pageSize:10,
          total:0,
          onChange: page => {
            getAction("/question/list",{currentPage:page}).then(res => {
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
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '#',
            scopedSlots: { customRender: 'serial' },
          },
          {
            title: '题干',
            dataIndex: 'name',
            width: 250,
          },
          {
            title: '分数',
            dataIndex: 'score',
          },
          {
            title: '创建人',
            dataIndex: 'creator',
          },
          {
            title: '难度',
            dataIndex: 'level',
          },
          {
            title: '题型',
            dataIndex: 'type',
          },
          {
            title: '学科',
            dataIndex: 'category',
          },
          {
            title: '更新时间',
            dataIndex: 'updateTime',
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
        getAction("/question/list",{currentPage:pageNo,name:that.queryParam.name,score:that.queryParam.score,
        level:that.queryParam.level
        }).then(res => {
          if (res.data.success === true) {
            that.data =  res.data.result.records ;
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
        // 弹出一个可修改的输入框
        console.log(record)
        this.$refs.modalEdit.edit(record)
      },
      handleDelete (record) {
        // 弹出一个可修改的输入框
        const that = this
        this.$confirm({
          title: '提示',
          content: '确定要删除吗 ?',
          onOk () {

            getAction("/question/delete",{id:record.id}).then(res => {
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
      handleSub (record) {
        // 查看题目
        console.log(record)
        this.$refs.modalView.edit(record)
      },
      handleOk () {
        this.$refs.table.refresh()
      },
      resetSearchForm () {
        this.queryParam = {
          date: moment(new Date())
        }
      }
    }
  }
</script>
