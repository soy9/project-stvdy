import { defineStore } from 'pinia'
import {
  listQuestion,
  listYourQuestion,
  getQuestion,
  getAnswers,
} from '@/api/question'
import { ref } from 'vue'
import axios from 'axios'

export const useQuestionStore = defineStore('questions', () => {
  const question = ref([])
  const questions = ref([])
  const answers = ref([])
  const totalAmount = ref([])
  const pageable = ref([])

  const getList = async (cond) => {
    await listQuestion(cond, (res) => {
      questions.value = res.data.question.content
      totalAmount.value = res.data.question.totalElements
      var now = new Date()
      for (var q in questions.value) {
        if (questions.value[q].questionScore == null)
          questions.value[q].questionScore = 0

        var wrote = new Date(questions.value[q].regist_time)

        var diff = now.getTime() - wrote.getTime()
        if (diff > 86_400_000) {
          var year = wrote.getFullYear()
          var month = ('0' + (wrote.getMonth() + 1)).slice(-2)
          var day = ('0' + wrote.getDate()).slice(-2)

          questions.value[q].regist_time = year + '-' + month + '-' + day
        } else if (diff > 3_600_000) {
          var dHour = Math.floor(diff / 3_600_000)
          questions.value[q].regist_time = dHour + '시간 전'
        } else if (diff > 60_000) {
          var dMinutes = Math.floor(diff / 60_000)
          questions.value[q].regist_time = dMinutes + '분 전'
        } else if (diff / 1_000) {
          var dSeconds = Math.floor(diff / 1_000)
          questions.value[q].regist_time = dSeconds + '초 전'
        }
      }
      console.log('찍어보자',res.data.question)
      pageable.value = res.data.question.pageable
      pageable.value.totalPages = res.data.question.totalPages
    })
  }

  const getMyList = async (cond) => {
    await listYourQuestion(cond, (res) => {
      questions.value = res.data.question.content
      totalAmount.value = res.data.question.totalElements
      console.log(questions.value)
      var now = new Date()
      for (var q in questions.value) {
        if (questions.value[q].questionScore == null)
          questions.value[q].questionScore = 0

        var wrote = new Date(questions.value[q].regist_time)

        var diff = now.getTime() - wrote.getTime()
        if (diff > 86_400_000) {
          var year = wrote.getFullYear()
          var month = ('0' + (wrote.getMonth() + 1)).slice(-2)
          var day = ('0' + wrote.getDate()).slice(-2)

          questions.value[q].regist_time = year + '-' + month + '-' + day
        } else if (diff > 3_600_000) {
          var dHour = Math.floor(diff / 3_600_000)
          questions.value[q].regist_time = dHour + '시간 전'
        } else if (diff > 60_000) {
          var dMinutes = Math.floor(diff / 60_000)
          questions.value[q].regist_time = dMinutes + '분 전'
        } else if (diff / 1_000) {
          var dSeconds = Math.floor(diff / 1_000)
          questions.value[q].regist_time = dSeconds + '초 전'
        }
      }

      pageable.value = res.data.question.pageable
      pageable.value.totalPages = res.data.question.totalPages
    })
  }

  const getQuestionById = async (id) => {
    await getQuestion(
      id,
      (res) => {
        question.value = res.data.question
        question.value.regist_time =
          question.value.regist_time.replaceAll('T', ' ') + ' ·'

        getAnswers(
          question.value.id,
          (res) => {
            answers.value = res.data.answers
            for (var a in answers.value) {
              answers.value[a].regist_time =
                answers.value[a].regist_time.replaceAll('T', ' ') + ' ·'
            }
          },
          (fail) => console.log(fail),
        )
      },
      {
        id: 4,
        title: 'test-title4',
        user_id: 2,
        detail:
          '찬미를 무엇이 소담스러운 것은 아니다. 거친 있을 보는 얼마나 있는 이상, 인생을 더운지라 봄바람이다. 대고, 만물은 석가는 듣는다. 뜨고, 지혜는 예수는 청춘 꾸며 봄바람을 가치를 앞이 이것이다. 풀이 살 얼마나 옷을 그것을 실현에 가슴이 쓸쓸하랴? 두손을 수 살았으며, 보이는 거친 이것은 구하지 그리하였는가? 풀밭에 스며들어 힘차게 봄바람이다. 그들의 심장은 보이는 낙원을 힘있다. 스며들어 듣기만 군영과 품에 가치를 부패뿐이다. 별과 피가 아니한 뭇 듣기만 피가 풍부하게 봄바람이다.',
        best_answer: null,
      },
    )
  }

  const clearState = () => {
    question.value = {}
    questions.value = {}
    answers.value = {}
    totalAmount.value = {}
  }

  // const getLikes = async (id) => {
  //   question.value = {}
  //   await getQuestion(
  //     id,
  //     (res) => {
  //       question.value = res.data.question
  //       question.value.regist_time =
  //         question.value.regist_time.replaceAll('T', ' ') + ' ·'

  //       getAnswers(
  //         question.value.id,
  //         (res) => {
  //           answers.value = res.data.answers
  //           for (var a in answers.value) {
  //             answers.value[a].regist_time =
  //               answers.value[a].regist_time.replaceAll('T', ' ') + ' ·'
  //           }
  //         },
  //         (fail) => console.log(fail),
  //       )
  //     },
  //     (fail) => {
  //       console.log(fail)
  //     },
  //   )
  // }

  // const getAnswerList = async () => {
  //   await getAnswers(
  //     question.value.id,
  //     (res) => console.log(res),
  //     (fail) => console.log(fail),
  //   )
  // }
  const QtnUpdate = async (answerNo, questionNo, content) => {
    await axios.put(`/api/answers/${answerNo}`, {questionNo:questionNo, content:content})
    .then(()=>{
      console.log('댓글 수정 완료')
    })
    .catch((error)=>{
      console.log('댓글 수정 실패',error)
    })
  }
  const QtnDelte = async (answerNo) => {
    await axios.delete(`/api/answers/${answerNo}`)
    .then(()=>{
      console.log('댓글 삭제 완료')
    })
    .catch((error)=>{
      console.error('댓글 삭제 실패',error)
    })
  }

  return {
    questions,
    question,
    answers,
    totalAmount,
    pageable,
    getList,
    getMyList,
    getQuestionById,
    clearState,
    QtnUpdate,
    QtnDelte,
  }
})
