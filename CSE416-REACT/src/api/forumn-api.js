import axios from 'axios'
import config from '../config'
const api = axios.create({
    baseURL: `${config.base_url}/forumn`,
})

export const createForumnPost = (payload, headers) => api.post('/', payload, {headers: headers})
export const getForumPost = (userId, row) => api.get(`/${userId}?row=${row}`)
export const getForumPostById = (forumPostId) => api.get(`/id/${forumPostId}`)
export const deleteForumPost = (forumPostId, headers) => api.delete(`/${forumPostId}`, {headers: headers})

export const createFroumPostComment = (payload, headers) => api.post('/postComment', payload, {headers: headers})
export const getFroumPostComment = (forumPostId, row) => api.get(`/postComments/${forumPostId}?row=${row}`)
export const deleteForumPostComment = (forumPostCommentId, headers) => api.delete(`/postComment/${forumPostCommentId}`,  {headers: headers})

export const createFroumPostCommentReply = (payload, headers) => api.post('/postCommentReply', payload, {headers: headers})
export const getFroumPostCommentReply = (forumPostCommentId) => api.get(`/postCommentReply/${forumPostCommentId}`)
export const deleteFroumPostCommentReply = (forumPostCommentReplyId, headers) => api.delete(`/postCommentReply/${forumPostCommentReplyId}`, {headers: headers})

const forumnApi = {
    createForumnPost,
    getForumPost,
    deleteForumPost,
    createFroumPostComment,
    getFroumPostComment,
    deleteForumPostComment,
    createFroumPostCommentReply,
    getFroumPostCommentReply,
    deleteFroumPostCommentReply,
    getForumPostById
}

export default forumnApi