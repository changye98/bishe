<template>
  <a-layout>
    <a-layout-header class="header" style="color: #fff">
      <!--   v-if="examDetail.exam" 是为了防止 异步请求时页面渲染的时候还没有拿到这个值而报错， 下面多处这个判断都是这个道理 -->
      <span style="font-size:25px;margin-left: 0px;" v-if="examDetail.exam">
        <a-avatar slot="avatar" size="large" shape="circle" :src="examDetail.exam.examAvatar"/>
        {{ examDetail.exam.examName }}
        <span style="font-size:15px;">{{ examDetail.exam.examDescription }} </span>
      </span>
      <span style="float: right;">
        <span style="margin-right: 40px; font-size: 20px" v-if="recordDetail.examRecord">
          考试得分：<span style="color: red">{{ recordDetail.examRecord.examJoinScore }}</span>&nbsp;分&nbsp;
          <span style="font-size:15px;">参加考试时间：{{ recordDetail.examRecord.examJoinDate }}</span>
        </span>
        <a-avatar class="avatar" size="small" :src="userAvatar"/>
        <span style="margin-left: 12px">{{ username }}</span>
      </span>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="190"  :style="{background: '#444',overflow: 'auto', height: '100vh' , left: 20,margin:'22px -150px 0px 20px'}">
        <a-menu

          mode="inline"
          :defaultSelectedKeys="['1']"
          :defaultOpenKeys="['question_radio', 'question_check', 'question_judge']"
          :style="{ height: '100%', borderRight: 0}"
        >
          <a-sub-menu key="question_radio">
            <span slot="title" v-if="examDetail.exam"><a-icon type="check-circle" theme="twoTone"/>单选题(每题{{ examDetail.exam.examScoreRadio }}分)</span>
            <a-menu-item v-for="(item, index) in examDetail.radioIds" :key="item" @click="getQuestionDetail(item)">
              <a-icon type="check" v-if="resultsMap.get(item)==='True'"/>
              <a-icon type="close" v-if="resultsMap.get(item)==='False'||resultsMap.get(item)==null"/>
              题目{{ index + 1 }}
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="question_check">
            <span slot="title" v-if="examDetail.exam"><a-icon type="check-square" theme="twoTone"/>多选题(每题{{ examDetail.exam.examScoreCheck }}分)</span>
            <a-menu-item v-for="(item, index) in examDetail.checkIds" :key="item" @click="getQuestionDetail(item)">
              <a-icon type="check" v-if="resultsMap.get(item)==='True'"/>
              <a-icon type="close" v-if="resultsMap.get(item)==='False'||resultsMap.get(item)==null"/>
              题目{{ index + 1   }}
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="question_judge">
            <span slot="title" v-if="examDetail.exam"><a-icon type="like" theme="twoTone"/>判断题(每题{{ examDetail.exam.examScoreJudge }}分)</span>
            <a-menu-item v-for="(item, index) in examDetail.judgeIds" :key="item" @click="getQuestionDetail(item)">
              <a-icon type="check" v-if="resultsMap.get(item)==='True'"/>
              <a-icon type="close" v-if="resultsMap.get(item)==='False'||resultsMap.get(item)==null"/>
              题目{{ index + 1 }}
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: '200px' }">
        <a-layout-content :style="{ margin: '24px 16px 0',height: '84vh', overflow: 'initial' }">
          <div :style="{ padding: '24px', background: '#fff',height: '84vh'}">
            <span v-if="currentQuestion === ''" style="font-size: 30px;font-family: Consolas">欢迎查看本次考试情况，点击左侧题目编号可以查看答题详情</span>
            <span v-if="currentQuestion !== ''">
              <strong>{{ currentQuestion.type }} </strong> {{ currentQuestion.name }} &nbsp;
              <strong style="color: green;" v-if="questionRight">本题您答对啦！</strong>
              <strong style="color: red;" v-if="!questionRight">本题您答错啦！</strong>
            </span>
            <br><br>
            <!-- 单选题和判断题 --> <!-- key不重复只需要在一个for循环中保证即可 -->

              <div v-if="currentQuestion.type === '单选题' || currentQuestion.type === '判断题'">
            <a-radio-group  v-model="radioValue" >
              <a-radio v-for="option in currentQuestion.options" :key="option.questionOptionId" :style="optionStyle" :value="option.questionOptionId">
                {{ option.questionOptionContent  }}
              </a-radio>
            </a-radio-group>
              </div>

            <!-- 题目出错的时候才显示这块 -->
            <div v-if="!questionRight && currentQuestion!=='' && (currentQuestion.type === '单选题' || currentQuestion.type === '判断题')">
              <span style="color: red;"><br/>正确答案是：<br/></span>
              <a-radio-group  v-model="currentQuestion.answers[0]"   >
                  <a-radio  v-for="option in currentQuestion.options"   :key="option.questionOptionId" :style="optionStyle" :value="option.questionOptionId">
                      {{ option.questionOptionContent }}
                  </a-radio>
              </a-radio-group>
            </div>

            <!-- 多选题 -->
            <a-checkbox-group  v-if="currentQuestion.type === '多选题'" v-model="checkValues" >
              <a-checkbox v-for="option in currentQuestion.options" :key="option.questionOptionId" :style="optionStyle" :value="option.questionOptionId">
                {{ option.questionOptionContent }}
              </a-checkbox>
            </a-checkbox-group>

            <!-- 题目出错的时候才显示这块 -->
            <div v-if="!questionRight && currentQuestion!=='' && currentQuestion.type === '多选题'">
              <span style="color: red;"><br/>正确答案是：<br/></span>
              <a-checkbox-group v-model="currentQuestion.answers">
                <a-checkbox v-for="option in currentQuestion.options" :key="option.questionOptionId" :style="optionStyle" :value="option.questionOptionId">
                  {{ option.questionOptionContent }}
                </a-checkbox>
              </a-checkbox-group>
            </div>
          </div>
        </a-layout-content>
        <a-layout-footer :style="{ textAlign: 'center' }">
          Spting Boot Online Exam ©2019 Crated by Liang Shan Guang
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
  import  {getAction,postAction} from "@/http";

export default {
  name: 'ExamRecordDetail',
  components: {
  },
  data () {
    return {
      //用户名
      username:"",
      //用户头像
      userAvatar:"",
      // 考试详情对象
      examDetail: {},
      // 考试记录详情对象
      recordDetail: {},
      // 用户做过的问题都放到这个数组中，键为问题id, 值为currentQuestion(其属性answers属性用于存放答案选项地id或ids),，用于存放用户勾选的答案
      answersMap: {},
      // 题目的正确答案
      answersRightMap: {},
      // 题目的作答结果(正确或错误)
      resultsMap: {},
      // 当前用户的问题
      currentQuestion: '',
      // 单选或判断题的绑定值，用于从answersMap中初始化做题状态
      radioValue: '',
      // 多选题的绑定值，用于从answersMap中初始化做题状态
      checkValues: [],
      optionStyle: {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
        marginLeft: '0px'
      },
      bolchecked:true
    }
  },
  computed: {
    /**
     * 当前题目用户是否作答正确
     * */
    questionRight () {
      return (this.resultsMap !== '') && (this.resultsMap.get(this.currentQuestion.id) === 'True')
    }
  },
  created () {
    this.username = localStorage.getItem("userNickname")
    this.userAvatar=localStorage.getItem("userAvatar")
    this.answersMap = new Map()
    this.answersRightMap = new Map()
    this.resultsMap = new Map()
    const that = this
    // 从后端获取考试的详细信息，渲染到考试详情里,需要加个延时，要不拿不到参数
    getAction("/exam/detail/"+this.$route.params.exam_id)
      .then(res => {
        if (res.data.success === true) {
          // 赋值考试对象
          that.examDetail = res.data.result
        } else {
          this.$notification.error({
            message: '获取考试详情失败',
            description: res.data.message
          })
        }
      })
    // 查看考试记录详情，渲染到前端界面
    getAction("/exam/record/detail/"+this.$route.params.record_id)
      .then(res => {
        if (res.data.success === true) {
          // 赋值考试对象
          that.recordDetail = res.data.result
          // 赋值用户的作答答案
          that.objToMap()
          console.log(that.answersMap)
          console.log(that.resultsMap)
        } else {
          this.$notification.error({
            message: '获取考试记录详情失败',
            description: res.data.message
          })
        }
      })
  },
  methods: {
    /**
     * 把后端传过来的对象Object转换成Map
     **/
    objToMap () {
      for (const item in this.recordDetail.answersMap) {
        this.answersMap.set(item, this.recordDetail.answersMap[item])
      }

      for (const item in this.recordDetail.answersRightMap) {
        this.answersRightMap.set(item, this.recordDetail.answersRightMap[item])
      }

      for (const item in this.recordDetail.resultsMap) {
        this.resultsMap.set(item, this.recordDetail.resultsMap[item])
      }
    },
    getQuestionDetail (questionId) {
      console.log(questionId)
      // 问题切换时从后端拿到问题详情，渲染到前端content中
      const that = this
      that.checkValues = []
      that.radioValue = ''
      getAction("/exam/question/detail/"+questionId)
        .then(res => {
          if (res.data.success === true) {
            // 赋值当前考试对象
            that.currentQuestion = res.data.result
            console.log(that.currentQuestion)
            if(that.currentQuestion.type === '多选题'){
              Object.assign(that.checkValues, that.answersMap.get(that.currentQuestion.id))
            }
            if(that.answersMap.size!=0&&that.answersMap.get(that.currentQuestion.id)!=undefined){
              that.radioValue =that.answersMap.get(that.currentQuestion.id)[0]
            }
            return res.data.result
          } else {
            this.$notification.error({
              message: '获取问题详情失败',
              description: res.data.message
            })
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
