import axios from 'axios'
import config from '../config'
const api = axios.create({
    baseURL: `${config.base_url}/user`,
})
export const createUser = (payload, config) => api.post('/create', payload, config) 
export const getMainLeaderboard = () => api.get('/leaderboard')
export const getChannelLeaderboard = (ownerId, row) => api.get(`/leaderboard/${ownerId}?row=${row}`)
export const setProfilePageImage = (formdata, config) => api.post('/profile/setUserProfileImage', formdata, config)
export const setBackgroundImage = (formdata, config) => api.post('/profile/setUserBackgroundImage', formdata, config)
export const setUserDescription = (payload, config) => api.post('/profile/setUserDescription', payload, config)
export const setTopFeatureQuiz = (payload, config) => api.post('/profile/setTopFeatureQuiz', payload, config)
export const getProfileImage = (userId)=>api.get(`/profile/profileImage/${userId}`)
export const getBackgroundImage = (userId)=>api.get(`/profile/backgroundImage/${userId}`)
export const getUserDescription = (userId)=>api.get(`/profile/userDescription/${userId}`)
export const getSubscriberCount = (userId)=>api.get(`/profile/subscriber/${userId}`)
export const subscribe = (payload, headers)=>api.post('/subscribe', payload, {headers: headers})
export const unsubscribe = (payload, headers)=>api.post('/unsubscribe', payload, {headers: headers})
export const getSubscriptions = (headers)=>api.get('/subscriptions', {headers: headers})
export const getUserInfo = (userId)=>api.get(`/info/${userId}`)
export const getUserDisplayName = (userId)=>api.get(`/displayname/${userId}`)
export const getFollowers = (headers, row)=>api.get(`/followers?row=${row}`, {headers: headers})
/*TODO: REQUIRE AUTHENTICATION*/export const updateUserExperience = (payload) => api.put('/updateUserExperience', payload)
export const updateUserDisplayNamem = (payload, headers) => api.put('/updateUserDisplayName', payload, {headers: headers})
export const updateUserLevel = (payload, headers) => api.put('/updateUserLevel', payload, {headers: headers})
export const getMoreSubscriptionsById = (payload, headers) => api.post('/getMoreSubscriptionsById', payload, {headers: headers})
export const createPreferenceCateory = (payload, headers) => api.post('/createPreferenceCateory', payload, {headers: headers})
export const obtainUserCategoryPreference = (headers) => api.get('/obtainUserCategoryPreference', {headers: headers})
export const checkSubscribeStatus = (subscribeTo, headers) => api.get(`/checkSubscribeStatus?subscribeTo=${subscribeTo}`, {headers: headers})
export const updateChannelLeaderboard = (payload, headers) => api.post('/leaderboard/updateScore', payload, {headers: headers})
export const getGlobalLeaderboard = (category, row) => api.get(`/leaderboard/global/${category}?row=${row}`)
export const updateGlobalLeaderboard = (payload, headers) => api.post("/leaderboard/global/update", payload, {headers: headers})
const userApis = {
    createUser,
    getMainLeaderboard,
    getChannelLeaderboard,
    setProfilePageImage,
    setUserDescription,
    setTopFeatureQuiz,
    setBackgroundImage,
    getProfileImage,
    getBackgroundImage,
    getUserDescription,
    subscribe,
    unsubscribe,
    getSubscriptions,
    getUserInfo,
    getUserDisplayName,
    getFollowers,
    getSubscriberCount,
    updateUserExperience,
    updateUserDisplayNamem,
    updateUserLevel,
    getMoreSubscriptionsById,
    createPreferenceCateory,
    obtainUserCategoryPreference,
    checkSubscribeStatus,
    updateChannelLeaderboard,
    getGlobalLeaderboard,
    updateGlobalLeaderboard
}

export default userApis