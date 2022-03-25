//Common
const OWNERID = "ownerId"
const CATEGORYLIST = "categoryList"
const ISADMIN = "isAdmin"
const LIKEDSTATUS = "likedStatus"

//User Body
const USERID = "userId"
const DISPLAYNAME = "displayName"
const EMAIL = "email"
const EXPERIENCE = "experience"
const CREATIONTIME = "creationTime"
const PASSWORD = "password"
const UID = "uid"
const PROFILEIMAGE = "profileImage"
const BACKGROUNDIMAGE = "backgroundImage"
const USERDESCRIPTION = "userDescription"
const TOPFEATUREQUIZ = "topFeatureQuiz"
const USERPROFILE = "userProfile"
const USERPROFILE_IMAGE_TYPE = "imageType"
const USERLEVEL = "userLevel"
const EXPNEEDED = "expForLevelUp"
const EXPGAINED = "expGained"

//Quiz Body
const QUIZID = "quizId"
const QUIZNAME = "quizName"
const QUIZCATEGORY = "quizCatgeory"
const QUIZDESCRIPTION = "quizDescription"
const ISPUBLISHED = "isPublished"
const TAKECOUNTS = "takeCounts"
const LIKES  = "likes"
const DISLIKES = "dislikes"
const TIMELIMIT = "timeLimit"
const QUIZTHUMBNAIL = "thumbnail"

//Question Body
const QUESTIONID = "questionId"
const QUESTIONTYPE = "questionType"
const NUMBEROFCHOICE = "numberOfChoice"
const IMAGE = "image"
const QUESTION = "question" 
const QUESTIONS = "questions"

//QuestionChoice Body
const CHOICES = "choices"
const CHOICEID = "choiceId"
const ISRIGHTCHOICE = "is_right_choice"
const CHOICE = "choice"


//Quiz Comment
const QUIZCOMMENTID = "quizCommentId"
const QUIZCOMMENT = "quizComment"
const QUIZCOMMENTREPLYID  = "quizCommentReplyId"

//Quiz Grade
const QUIZGRADEID = "quizGradeId"
const GRADE = "grade"

//Leaderboard
const LEADERBOARDID = "leaderboardId"
const USERCHANNELSCOREID = "userChannelScoreId"
const SCORE = "score"

//Forum
const FORUMID = "forumId"
const FORUMNAME = "forumName"
const FORUMPOSTID = "forumPostId"
const POSTTITLE = "postTitle"
const POSTDESCRIPTION = "postDescription"

//Forum Post Comment
const FORUMPOSTCOMMENTID = "forumPostCommentId"
const POSTCOMMENT = "postComment"

//Forum Post Comment Reply
const FORUMPOSTCOMMENTREPLYID = "forumPostCommentReplyId"

//Forum Admin
const FORUMADMINID = "forumAdminId"

//Achievement
const ACHIEVEMENT = "achievementId"
const ACHIEVEMENTNAME = "achievementName"
const ACHIEVEMENTDESCRIPTION = "achievementDescription"
const COMPLETIONAMOUNT = "completionAmount"
const ACHIEVEMENTLEVEL = "achievementLevel"

//User Achievement Progress
const USERACHIEVEMENTPROGRESSID = "userAchievementProgressId"
const PROGRESS = "progress"

//User Achievement Completion
const USERACHIEVEMENTCOMPLETIONID = "userAchievementCompletionId"

//Subscribe
const SUBSCRIBETO = "subscribeTo"
const SUBSCRIBEID = "subscribeId"

//TakeLater
const TAKELATERID = "takeLaterId"

//LikedQuiz
const LIKEDQUIZID = "likedQuizId"

const HISTORYTIME = "historyTime"

const ROW = "row"

const CHANNELOWNER = "channelOwner"


const INCREASELIKE = "increaselike"

const DECREASELIKE = "decreaselike"

const INCREASEDISLIKE = "increasedislike"

const DECREASEDISLIKE = "decreasedislike"
const LIKEDSTATUSCHANGE = "likedstatuschange"
const BODY_CONSTANT = {
    //Common
    OWNERID,
    ROW,
    CATEGORYLIST,
    ISADMIN,
    LIKEDSTATUS,
    
    //User
    USERID,
    DISPLAYNAME,
    EMAIL,
    EXPERIENCE,
    CREATIONTIME,
    PASSWORD,
    UID,
    PROFILEIMAGE,
    BACKGROUNDIMAGE,
    USERDESCRIPTION,
    TOPFEATUREQUIZ,
    USERPROFILE,
    USERPROFILE_IMAGE_TYPE,
    USERLEVEL,
    EXPNEEDED,
    EXPGAINED,

    //BODY
    QUIZID,
    QUIZNAME,
    QUIZCATEGORY,
    QUIZDESCRIPTION,
    ISPUBLISHED,
    TAKECOUNTS,
    LIKES,
    DISLIKES,
    TIMELIMIT,
    QUIZTHUMBNAIL,

    //QUESTION BODY
    QUESTIONID,
    QUESTIONTYPE,
    NUMBEROFCHOICE,
    IMAGE,
    QUESTION,
    QUESTIONS,

    //QUESTION CHOICE BODY
    CHOICEID,
    ISRIGHTCHOICE,
    CHOICE,
    CHOICES,

    //QUIZ COMMENT
    QUIZCOMMENTID,
    QUIZCOMMENT,
    QUIZCOMMENTREPLYID,

    //QUIZ GRADE
    QUIZGRADEID,
    GRADE,

    //LEADERBOARD
    LEADERBOARDID,
    USERCHANNELSCOREID,
    SCORE,

    //FORUM
    FORUMID,
    FORUMNAME,
    FORUMPOSTID,
    POSTTITLE,
    POSTDESCRIPTION,

    //FORUM POST COMMENT 
    FORUMPOSTCOMMENTID,
    POSTCOMMENT,

    //FORUM POST COMMENT REPLY
    FORUMPOSTCOMMENTREPLYID,

    //Forum Admin
    FORUMADMINID,

    //Achievement
    ACHIEVEMENT,
    ACHIEVEMENTNAME,
    ACHIEVEMENTDESCRIPTION,
    COMPLETIONAMOUNT,
    ACHIEVEMENTLEVEL,

    //User Achievement Progress
    USERACHIEVEMENTPROGRESSID,
    PROGRESS,

    //User Achievement Completion
    USERACHIEVEMENTCOMPLETIONID,
    
    //SUBSCRIBE
    SUBSCRIBETO,
    SUBSCRIBEID,

    TAKELATERID,

    LIKEDQUIZID,

    HISTORYTIME,

    CHANNELOWNER,

    INCREASELIKE,

    DECREASELIKE,

    INCREASEDISLIKE,

    DECREASEDISLIKE,
    LIKEDSTATUSCHANGE
}

export default BODY_CONSTANT