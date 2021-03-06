const db_pool = require('./mysql-init');
const mysql = require('mysql2');

createUser = (user) => {
    return new Promise((resolve, reject) => {
        db_pool.query('INSERT IGNORE INTO Users(userId, email, displayName, userLevel, expForLevelUp) VALUES('
            + mysql.escape(user.userId) + ','
            + mysql.escape(user.email) + ','
            + mysql.escape(user.displayName) + ','
            + 1 + ','
            + 1000 + ')', (err, result) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getTopUsers = ({row}) => {
    return new Promise((resolve, reject) => {
        let myquery = 'SELECT * FROM Users ORDER BY experience DESC LIMIT 10;'
        if(row!=null && row!==undefined && row!=='undefined'  && Number.isInteger(parseInt(row))){
            myquery = `SELECT * FROM Users ORDER BY experience DESC LIMIT ${mysql.escape(row)},10;`
        }
        console.log(myquery)
        db_pool.query(myquery, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getChannelLeaderboard = ({ownerId, row}) => {
    return new Promise((resolve, reject) => {
        let myquery = `SELECT UserChannelScore.* , Users.displayName, Users.userLevel FROM UserChannelScore
        inner join Users on UserChannelScore.userId = Users.userId 
        where channelOwner =  ${mysql.escape(ownerId)} ORDER BY score desc LIMIT 10`
        if(row!=null && row!==undefined && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT UserChannelScore.* , Users.displayName, Users.userLevel FROM UserChannelScore
            inner join Users on UserChannelScore.userId = Users.userId 
            where channelOwner =  ${mysql.escape(ownerId)} ORDER BY score desc LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateChannelLeaderboard = ({userId, channelOwner, score})=>{
    return new Promise((resolve, reject) => {
        let myquery = `INSERT INTO UserChannelScore (userId, channelOwner, score)
        VALUES(${mysql.escape(userId)}, ${mysql.escape(channelOwner)}, ${mysql.escape(score)}) AS new_score
        ON DUPLICATE KEY UPDATE
            userId = new_score.userId,
            channelOwner = new_score.channelOwner,
            score = new_score.score + (SELECT score FROM UserChannelScore AS s WHERE s.userId = ${mysql.escape(userId)} AND s.channelOwner = ${mysql.escape(channelOwner)})`
        db_pool.query(myquery, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getGlobalLeaderboard = ({category, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT globalLeaderboardScore.*, Users.userLevel, Users.displayName FROM globalLeaderboardScore
        INNER JOIN Users ON globalLeaderboardScore.userId = Users.userId
        WHERE category=${mysql.escape(category)} ORDER BY score DESC LIMIT 10`
        if(row!=null && row!==undefined && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT globalLeaderboardScore.*, Users.userLevel, Users.displayName FROM globalLeaderboardScore
            INNER JOIN Users ON globalLeaderboardScore.userId = Users.userId
            WHERE category=${mysql.escape(category)} ORDER BY score DESC LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateGlobalLeaderboard = ({userId,category, score})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `INSERT INTO globalLeaderboardScore (userId, category, score)
        VALUES(${mysql.escape(userId)}, ${mysql.escape(category)}, ${mysql.escape(score)}) AS new_score
        ON DUPLICATE KEY UPDATE
            userId = new_score.userId,
            category = new_score.category,
            score = new_score.score + (SELECT score FROM globalLeaderboardScore AS s WHERE s.userId=${mysql.escape(userId)} AND s.category=${mysql.escape(category)})`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserProfileImage = (userId, url) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET profileImage = ${mysql.escape(url)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserBackgroundImage = (userId, url) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET backgroundImage = ${mysql.escape(url)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })

}

setUserDescription = (userId, description) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET userDescription = ${mysql.escape(description)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserTopFeatureQuiz = (userId, quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET topFeatureQuiz = ${mysql.escape(quizId)} WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserProfileImage = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT profileImage FROM Users WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserBackgroundImage = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT backgroundImage FROM Users WHERE userId = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserDescription = (userId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT userDescription FROM Users WHERE userid = ${mysql.escape(userId)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


createSubscribe = (userId, subscribeTo) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Subscribe (userId, subscribeTo)
        SELECT * FROM (SELECT ${mysql.escape(userId)}, ${mysql.escape(subscribeTo)}) AS tmp
        WHERE 
        NOT EXISTS ((
            SELECT * FROM Subscribe WHERE userId=${mysql.escape(userId)} AND subscribeTo=${mysql.escape(subscribeTo)}
        ) LIMIT 1)
        AND
        EXISTS (
            SELECT * FROM Users WHERE userId = ${mysql.escape(subscribeTo)}
        )`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


cancelSubscribe = (userId, subscribeTo) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Subscribe WHERE userId=${mysql.escape(userId)} AND subscribeTo=${mysql.escape(subscribeTo)}`, (err, result) => {
            if (err) {
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getSubscriptions = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Subscribe WHERE userId = ${mysql.escape(userId)} ORDER BY subscribeId ASC LIMIT 11`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserInfo = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Users WHERE userId = ${mysql.escape(userId)} LIMIT 10`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserDisplayName = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT displayName FROM Users WHERE userId=${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getFollowers = ({uid, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Subscribe WHERE subscribeTo = ${mysql.escape(uid)} LIMIT 10`
        if(row!==undefined && row!=null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT * FROM Subscribe WHERE subscribeTo = ${mysql.escape(uid)} LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getSubscribersCount = (userId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT COUNT(*) FROM Subscribe WHERE subscribeTo = ${mysql.escape(userId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateUserExperience = (userId, experience) =>{
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Users SET experience = ${mysql.escape(experience)} WHERE userId = ${mysql.escape(userId)}`, (err, result) =>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

updateUserDisplayName = (userId, displayName)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`UPDATE Users SET displayName = ${mysql.escape(displayName)} WHERE userId = ${mysql.escape(userId)}`, (err, result) =>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

updateUserLevel = (userId, level, expNeeded)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`UPDATE Users SET userLevel = ${mysql.escape(level)}, expForLevelUp = ${mysql.escape(expNeeded)} WHERE userId = ${mysql.escape(userId)}`, (err, result) =>{
            if(err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

getMoreSubscriptionsById = (userId, subscribeId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Subscribe WHERE userId = ${mysql.escape(userId)} AND subscribeId >= ${mysql.escape(subscribeId)} ORDER BY subscribeId ASC LIMIT 11`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createUserCategoryPreference = (userId, categoryList)=>{
    let myquery = "INSERT IGNORE INTO CatgeoryCustomize(userId, categoryId) VALUES"
    for(var i = 0; i < categoryList.length; i++){
        myquery += `(${mysql.escape(userId)}, ${mysql.escape(categoryList[i])}),`
    }
    myquery = myquery.slice(0, -1)
    return new Promise((resolve, reject)=>{
        db_pool.query(myquery, (err,result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

removeUserCategoryPreference = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM CatgeoryCustomize WHERE userId = ${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

obtainUserCategoryPreference = (userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM CatgeoryCustomize WHERE userId = ${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

checkSubscribeStatus = ({uid, subscribeTo})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT subscribeId FROM Subscribe WHERE userId=${mysql.escape(uid)} AND subscribeTo=${mysql.escape(subscribeTo)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    createUser,
    getTopUsers,
    getChannelLeaderboard,
    setUserProfileImage,
    setUserBackgroundImage,
    setUserDescription,
    setUserTopFeatureQuiz,
    getUserProfileImage,
    getUserBackgroundImage,
    getUserDescription,
    createSubscribe,
    cancelSubscribe,
    getSubscriptions,
    getUserInfo,
    getUserDisplayName,
    getFollowers,
    getSubscribersCount,
    updateUserExperience,
    updateUserDisplayName,
    updateUserLevel,
    getMoreSubscriptionsById,
    obtainUserCategoryPreference,
    createUserCategoryPreference,
    removeUserCategoryPreference,
    checkSubscribeStatus,
    updateChannelLeaderboard,
    getGlobalLeaderboard,
    updateGlobalLeaderboard
}