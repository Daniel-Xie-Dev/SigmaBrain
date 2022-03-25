import axios from 'axios'
import config from '../config'
const api = axios.create({
    baseURL: `${config.base_url}/quiz`,
})

export const publishQuiz = (payload, headers)=>api.post('/publish/quiz', payload, {headers: headers})
export const getUserQuizAuthenticated = (headers, row)=>api.get(`/authenticated/quiz?row=${row}`, {headers: headers})
export const getMostPopularQuiz = () => api.get('/popular/topquiz') 
export const getQuizThumbnail = (quizId) => api.get('/thumbnail/' + quizId) 
export const getCategoryQuiz = (category) => api.get(`/category/${category}`)
export const getQuiz = (quizId) => api.get(`/${quizId}`)
export const getQuizByQuizId = (quizId) => api.get(`/quiz/${quizId}`)
export const getQuizWithUser = (quizId) => api.get(`/quizWithUser/${quizId}`)
export const getQuestion = (quizId) => api.get(`/${quizId}/quizQuestion`)
export const getQuestionChoice = (questionId) => api.get(`/quizQuestionChoice/${questionId}`)
export const getQuestionChoiceByQuizId = (quizId) => api.get(`/getQuestionChoicesByQuizId/${quizId}`)
export const createQuiz = (quiz, headers) => api.post("/", quiz, {headers: headers})
export const setQuizThumbnail = (quizId, formData, headers) => api.post(`/quizThumbnail/${quizId}`, formData, {headers: headers})
export const getUserQuiz = (userId,row) => api.get(`/user/${userId}?row=${row}`)
export const createQuizWithQuestions = (quiz, headers) => api.post("/quizWithQuestions", quiz, {headers: headers})
export const createQuizGrade = (payload, headers) => api.post('/createQuizGrade', payload, {headers: headers})
export const deleteQuizWithQuestions = (quizId, headers) => api.delete(`/quizWithQuestions/${quizId}`, {headers: headers})
export const getUserTopFeatureQuiz = (userId) => api.get(`/userTopFeatureQuiz/${userId}`)
export const setUserTopFeatureQuiz = (payload, headers) => api.post('/userTopFeatureQuiz', payload, {headers: headers})
export const updateQuiz = (payload, headers)=> api.post('/updateQuiz', payload, {headers: headers})
export const getChoicesInAQuestion = (questionId) => api.get(`/choicesInAQuestion/${questionId}`)
export const getChoicesInAQuestionWithAnswer = (questionId, headers) => api.get(`/choicesInAQuestionWithAnswer/${questionId}`, {headers: headers})
export const getQuestions = (quizId) => api.get(`/${quizId}/quizQuestion`)
export const updateQuestionChoice = (payload, headers) => api.post('/updateQuestionChoices', payload, {headers: headers})
export const getTopQuizByCategory = (category) => api.get(`/getTopQuizByCategory/${category}`)
export const postQuizComment = (payload, headers) => api.post('/quizComment', payload, {headers:headers})
export const getQuizComments = (quizId, row) => api.get(`/quizComment/${quizId}?row=${row}`)
export const getQuizNameSearchResult = (search) => api.get(`/search/${search}`)
export const getQuizSearchResult = (search) => api.get(`/searchQuiz/${search}`)
export const likedQuiz = (payload, headers) => api.post('/likedquiz', payload, {headers: headers})
export const takeLaterQuiz = (payload, headers) => api.post('/takelater', payload, {headers: headers})
// export const dislikeQuiz = (quizId, headers) => api.delete(`/likedquiz/${quizId}`, {headers: headers})
export const getLikedQuiz = (headers, row) => api.get(`/main/likedquiz?row=${row}`, {headers: headers})
export const getTakeLaterQuiz = (headers,row) => api.get(`/main/takelater?row=${row}`, {headers: headers})
export const getSubscriptionQuiz = (headers,row) => api.get(`/main/subscriptionquiz?row=${row}`, {headers: headers})
export const getMoreQuizByCategoryById = (payload) => api.post('/getMoreQuizByCategoryById', payload)
export const getMoreSearchResult = (search, row) => api.get(`/searchMore/getMoreSearchResult?search=${search}&row=${row}`)
export const createQuizHistory = (payload, headers) => api.post(`/history/create`, payload, {headers: headers}) 
export const getQuizHistory = (payload, headers) => api.post(`/history/get`, payload, {headers: headers}) 
export const adminBlockQuiz = (payload, headers) =>api.post('/admin/publishquiz', payload, {headers: headers})
export const obtainUserQuizAdmin = (quizId, headers) => api.get(`/admin/userquiz/${quizId}`, {headers: headers})
export const removeUserQuizAdmin = (quizId, headers) => api.delete(`/admin/userquiz/${quizId}`, {headers: headers})
export const getLikedStatusOnQuiz = (quizId, headers) => api.get(`/quiz/likedStatus/${quizId}`, {headers: headers})
export const getTakeLaterStatus = (quizId, headers) => api.get(`/quiz/takelaterStatus/${quizId}`, {headers: headers})
export const removeTakeLaterQuiz = (quizId, headers) => api.delete(`/takelater/${quizId}`, {headers: headers})
export const getQuizCommentByCommentId = (quizCommentId) => api.get(`/quizCommenyById/${quizCommentId}`)
export const getSingleUserQuizAuthenticated = (quizId, headers) => api.get(`/authenticated/quiz/${quizId}`, {headers: headers})
export const getRelevantQuiz = ({userId, quizName, row}) => api.get(`/quizRecommendation/relevant?userId=${userId}&quizName=${quizName}&row=${row}`)
export const checkQuiz = (payload, headers) => api.post('/checkQuiz', payload,{headers: headers})
export const addNewQuestion = (payload, headers) => api.post('/addNewQuestion', payload, {headers: headers})
const quizApis = {
    getMostPopularQuiz,
    getQuizThumbnail,
    getCategoryQuiz,
    getQuiz,
    getQuizByQuizId,
    getQuestion,
    getQuestionChoice,
    getQuestionChoiceByQuizId,
    getUserQuiz,
    createQuiz,
    createQuizGrade,
    setQuizThumbnail,
    createQuizWithQuestions,
    deleteQuizWithQuestions,
    getUserTopFeatureQuiz,
    setUserTopFeatureQuiz,
    updateQuiz,
    getQuestions,
    getChoicesInAQuestion,
    getChoicesInAQuestionWithAnswer,
    updateQuestionChoice,
    getTopQuizByCategory,
    postQuizComment,
    getQuizComments,
    getQuizNameSearchResult,
    getQuizSearchResult,
    likedQuiz,
    takeLaterQuiz,
    getLikedQuiz,
    getTakeLaterQuiz,
    getSubscriptionQuiz,
    getMoreQuizByCategoryById,
    getMoreSearchResult,
    createQuizHistory,
    getQuizHistory,
    getQuizWithUser,
    getUserQuizAuthenticated,
    publishQuiz,
    adminBlockQuiz,
    obtainUserQuizAdmin,
    removeUserQuizAdmin,
    getLikedStatusOnQuiz,
    getTakeLaterStatus,
    removeTakeLaterQuiz,
    getQuizCommentByCommentId,
    getSingleUserQuizAuthenticated,
    getRelevantQuiz,
    checkQuiz,
    addNewQuestion
}

export default quizApis