const db_pool = require('./mysql-init');
const mysql  = require('mysql2');
const BODY = require('../constant/body');

getQuiz = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT * FROM Quiz WHERE quizId = ${mysql.escape(id)} AND isPublished = 1`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizByQuizId = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT Quiz.*, Users.isAdmin FROM Quiz
        INNER JOIN Users ON Quiz.userId = Users.userId
        WHERE quizId = ${mysql.escape(id)} AND isPublished=1`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizWithUser = (id)=>{
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT * FROM Quiz INNER JOIN Users ON Quiz.userId = Users.userId WHERE quizId = ${mysql.escape(id)} AND isPublished = 1`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getUserQuiz = ({uid, row}) => {
    return new Promise((resolve, reject) => {
        let myquery = `SELECT * FROM Quiz WHERE userId=${mysql.escape(uid)} AND isPublished = 1 LIMIT 10`
        if(row!==undefined && row!=null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT * FROM Quiz WHERE userId=${mysql.escape(uid)} AND isPublished = 1 LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizInternal = (id) => {
    return new Promise((resolve, reject) => {
        let myquery = `SELECT * FROM Quiz WHERE quizId=${mysql.escape(id)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getCategoryQuiz = (category) => {
    return new Promise((resolve, reject) => {
        let query = "SELECT * FROM Quiz WHERE isPublished = 1 ORDER BY RAND() LIMIT 10"
        if(category!=0){
            query = `SELECT * FROM Quiz WHERE quizCatgeory=${category} AND isPublished = 1 ORDER BY RAND() LIMIT 10`
        }
        db_pool.query(query, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createQuiz = (userId, quizName, quizCatgeory, quizDescription, isPublished, timeLimit) => {

    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Quiz(userId, quizName, quizCatgeory, quizDescription, isPublished, timeLimit)
                        VALUES(` 
                        + mysql.escape(userId) + ','
                        + mysql.escape(quizName) + ','
                        + mysql.escape(quizCatgeory) + ','
                        + mysql.escape(quizDescription) + ','
                        + mysql.escape(isPublished) + ','
                        + mysql.escape(timeLimit) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createQuizGrade = (quizId, userId, grade) => {
    return new Promise((resolve, reject) => {
    db_pool.query(`INSERT INTO QuizGrade(quizId, userId, grade)
                    VALUES (`
                    + mysql.escape(quizId) + ','
                    + mysql.escape(userId) + ','
                    + mysql.escape(grade) + ')',
                    (err, result) => {
                        if(err){
                            return reject(err);
                        }
                        return resolve(result);
                    })
    })
}

getQuizGrade = (quizId, userId) => {
    return new Promise((resolve, reject) => {
        let query = `SELECT * FROM QuizGrade WHERE quizId=${mysql.escape(quizId)} AND userId=${mysql.escape(userId)} LIMIT 1`
        db_pool.query(query, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


setQuizThumbnail = (quizId, thumbnail) => {
    return new Promise((resolve, reject) => {
        db_pool.query("UPDATE Quiz SET thumbnail = " + mysql.escape(thumbnail) + " WHERE quizId = " + mysql.escape(quizId),
                (err, result) => {
                    if(err){
                        return reject(err)
                    }
                    return resolve(result)
                })
    })
}

deleteQuiz = (id) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Quiz WHERE quizId = ` + mysql.escape(id), 
        (err, result) => {
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuestion = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM Question WHERE quizId = ' + mysql.escape(quizId), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createQuestion = (quizId, questionType, numberOfChoice, question) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO Question(quizId, questionType, numberOfChoice, question)
                        VALUES(` 
                        + mysql.escape(quizId) + "," 
                        + mysql.escape(questionType) + ","
                        + mysql.escape(numberOfChoice) + ','
                        + mysql.escape(question) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteQuestion = (questionId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Question WHERE questionId = ` + mysql.escape(questionId),
        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteAllQuestionInQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM Question WHERE quizId = ` + mysql.escape(quizId),
            (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}


getQuestionChoice = (questionId) => {
    return new Promise((resolve, reject) => {
        db_pool.query('SELECT * FROM QuestionChoice WHERE questionId = ' + mysql.escape(questionId), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createQuestionChoice = (questionId, quizId, is_right_choice, choice) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`INSERT INTO QuestionChoice(questionId, quizId, is_right_choice, choice)
                        VALUES(` 
                        + mysql.escape(questionId) + "," 
                        + mysql.escape(quizId) + ","
                        + mysql.escape(is_right_choice) + ','
                        + mysql.escape(choice) + ')', 
                        (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createMutipleQuestionChoice = (questionSet) => {
    return new Promise((resolve, reject)=>{
        myquery = "INSERT INTO QuestionChoice(questionId, quizId, is_right_choice, choice) VALUES"
        questionSet.forEach(question => {
            myquery += (
                "(" + 
                + mysql.escape(question[BODY.QUESTIONID]) + ","
                + mysql.escape(question[BODY.QUIZID]) + ","
                + mysql.escape(question[BODY.ISRIGHTCHOICE]) + ","
                + mysql.escape(question[BODY.CHOICE])
                + "),"
            )
        })
        myquery = myquery.slice(0, -1)
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteQuestionChoice = (choiceId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM QuestionChoice WHERE choiceId = ` + mysql.escape(choiceId),
            (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

deleteAllQuestionChoiceInQuiz = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`DELETE FROM QuestionChoice WHERE quizId = ` + mysql.escape(quizId),
            (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getTheMostPopularQuiz = (limit) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Quiz WHERE isPublished = 1 ORDER BY takeCounts DESC LIMIT ${mysql.escape(limit)}`, 
            (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}


getQuizThumbnail = (quizId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT thumbnail FROM Quiz WHERE quizId = ` + mysql.escape(quizId), (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserTopFeatureQuiz = (userId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT * FROM Quiz WHERE quizId = (SELECT topFeatureQuiz FROM Users WHERE userId=${mysql.escape(userId)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

setUserTopFeatureQuiz = (userId, quizId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`UPDATE Users SET topFeatureQuiz = ${mysql.escape(quizId)} WHERE userId = ${mysql.escape(userId)};`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


updateQuiz = (userId, quizId, quizName, quizDescription, timeLimit, quizCategory) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`UPDATE Quiz 
        SET quizName=${mysql.escape(quizName)}, quizDescription=${mysql.escape(quizDescription)}, timeLimit=${mysql.escape(timeLimit)}, quizCatgeory=${mysql.escape(quizCategory)} 
        WHERE quizId=${mysql.escape(quizId)} AND userId=${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getChoicesInAQuestion = (questionId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT q3.choiceId, q3.questionId, q3.quizId, q3.choice 
        FROM Quiz as q1
            INNER JOIN Question as q2
                on q1.quizId = q2.quizId
            INNER JOIN QuestionChoice as q3
                on q3.questionId = q2.questionId
            WHERE q2.questionId = ${questionId}`, (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getChoicesInAQuestionWithAnswer = (questionId, userId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`SELECT q3.* 
        FROM Quiz as q1
            INNER JOIN Question as q2
                on q1.quizId = q2.quizId
            INNER JOIN QuestionChoice as q3
                on q3.questionId = q2.questionId
            WHERE q2.questionId=${mysql.escape(questionId)} AND q1.userId=${mysql.escape(userId)}`, (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getQuestionChoicesByQuizId = (quizId) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`SELECT * FROM QuestionChoice WHERE quizId=${mysql.escape(quizId)}`, (err, result) =>{
            if (err){
                return reject(err);
            }
            return resolve(result);
        })
    })
}

removeChoicesInAQuestion = (userId, questionId) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE q3
        FROM Quiz as q1
            INNER JOIN Question as q2
                on q1.quizId = q2.quizId
            INNER JOIN QuestionChoice as q3
                on q3.questionId = q2.questionId
            WHERE q2.questionId=${mysql.escape(questionId)} AND q1.userId=${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateQuestionName = (questionId, questionName) => {
    return new Promise((resolve, reject) => {
        db_pool.query(`UPDATE Question
        SET question = ${mysql.escape(questionName)}
        WHERE questionId = ${mysql.escape(questionId)}`, (err, result) =>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

updateQuestionChoices = (questionSet, userId, quizId, questionId) => {
    return new Promise((resolve, reject)=>{
        myquery = "INSERT INTO QuestionChoice(questionId, quizId, is_right_choice, choice)"
        for(var i = 0; i < questionSet.length; i++){
            let question = questionSet[i]
            if(i==0){
                myquery += `SELECT ${mysql.escape(questionId)}, ${mysql.escape(quizId)}, ${mysql.escape(question[BODY.ISRIGHTCHOICE])}, ${mysql.escape(question[BODY.CHOICE])}
                WHERE (SELECT userId FROM Quiz WHERE quizId=${mysql.escape(quizId)}) = ${mysql.escape(userId)}`
            }
            else{
                myquery += ` UNION ALL
                SELECT ${mysql.escape(questionId)}, ${mysql.escape(quizId)}, ${mysql.escape(question[BODY.ISRIGHTCHOICE])}, ${mysql.escape(question[BODY.CHOICE])}
                WHERE (SELECT userId FROM Quiz WHERE quizId=${mysql.escape(quizId)}) = ${mysql.escape(userId)}`
            }
        }
     
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getTopQuizByCategory = (category) => {
    return new Promise((resolve, reject)=>{
        myquery = `SELECT * FROM Quiz WHERE isPublished = 1 ORDER BY takeCounts DESC LIMIT 10`
        if (category != 0){
            myquery = `SELECT * FROM Quiz WHERE quizCatgeory = ${mysql.escape(category)} AND isPublished = 1 ORDER BY takeCounts DESC LIMIT 10;`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


createQuizComment = (quizId, quizComment, userId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO QuizComment(quizId, quizComment, userId) VALUES (${mysql.escape(quizId)}, ${mysql.escape(quizComment)}, ${mysql.escape(userId)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizComment = ({quizId, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM QuizComment WHERE quizId=${mysql.escape(quizId)} ORDER BY creationTime ASC LIMIT 10`
        if(row!=null && row!==undefined && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT * FROM QuizComment WHERE quizId=${mysql.escape(quizId)} ORDER BY creationTime ASC LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizSearchName = (search) => {
    return new Promise((resolve, reject)=>{
        updateSearch = '%' + search + '%'
        db_pool.query(`SELECT quizName FROM Quiz WHERE quizName LIKE ${mysql.escape(updateSearch)} AND isPublished = 1 LIMIT 10`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getSearchQuiz = (search) => {
    return new Promise((resolve, reject)=>{
        updateSearch = '%' + search + '%'
        db_pool.query(`SELECT * FROM Quiz WHERE quizName LIKE ${mysql.escape(updateSearch)} AND isPublished = 1 LIMIT 5`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}


getTakeLater = ({uid, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT Quiz.* FROM TakeLater 
        INNER JOIN Quiz ON TakeLater.quizId = Quiz.quizId
        WHERE TakeLater.userId = ${mysql.escape(uid)} AND isPublished = 1 LIMIT 10`
        if(row!==undefined && row!==null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT Quiz.* FROM TakeLater 
            INNER JOIN Quiz ON TakeLater.quizId = Quiz.quizId
            WHERE TakeLater.userId = ${mysql.escape(uid)} AND isPublished = 1 LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getLikedQuiz = ({uid, row})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT Quiz.* FROM LikedQuiz 
        INNER JOIN Quiz ON LikedQuiz.quizId = Quiz.quizId
        WHERE LikedQuiz.userId = ${mysql.escape(uid)} AND isPublished = 1 AND likedStatus=1 LIMIT 10`
        if(row!==undefined && row!==null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT Quiz.* FROM LikedQuiz 
                INNER JOIN Quiz ON LikedQuiz.quizId = Quiz.quizId
                WHERE LikedQuiz.userId = ${mysql.escape(uid)} AND isPublished = 1 AND likedStatus=1 LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createTakeLater = (userId, quizId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT IGNORE INTO TakeLater(userId, quizId) VALUES (${mysql.escape(userId)}, ${mysql.escape(quizId)})`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

createLikedQuiz = (userId, quizId, likedStatus)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO LikedQuiz (userId, quizId, likedStatus)
        VALUES(${mysql.escape(userId)}, ${mysql.escape(quizId)}, ${mysql.escape(likedStatus)}) AS new_liked
        ON DUPLICATE KEY UPDATE
            userId = new_liked.userId,
            quizId = new_liked.quizId,
            likedStatus = new_liked.likedStatus`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteTakeLater = (userId, quizId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM TakeLater WHERE quizId = ${mysql.escape(quizId)} AND userId=${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

deleteLikedQuiz = (userId, quizId)=>{
    return new Promise((resolve, reject)=>{
        db_pool.query(`DELETE FROM LikedQuiz WHERE quizId = ${mysql.escape(quizId)} AND userId= ${mysql.escape(userId)}`, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getSubscriptionQuiz = ({uid, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT Quiz.* FROM Users 
        INNER JOIN Subscribe ON Users.userId = Subscribe.userId
        INNER JOIN Quiz ON  Subscribe.subscribeTo = Quiz.userId
        WHERE Users.userId = ${mysql.escape(uid)} AND isPublished = 1
        ORDER BY creationTime DESC LIMIT 10`

        if(row!==undefined && row!=null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT Quiz.* FROM Users 
            INNER JOIN Subscribe ON Users.userId = Subscribe.userId
            INNER JOIN Quiz ON  Subscribe.subscribeTo = Quiz.userId
            WHERE Users.userId = ${mysql.escape(uid)} AND isPublished = 1
            ORDER BY creationTime DESC LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getMoreQuizByCategoryById = (category ,quizId) =>{
    return new Promise((resolve, reject)=>{
        myquery = `SELECT * FROM Quiz WHERE quizId > ${mysql.escape(quizId)} AND isPublished = 1 LIMIT 10`
        if (category != 0){
            myquery = myquery = `SELECT * FROM Quiz WHERE quizId > ${mysql.escape(quizId)} AND quizCatgeory = ${mysql.escape(category)} AND isPublished = 1 LIMIT 10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getMoreSearchQuiz = (search, row) => {
    return new Promise((resolve, reject)=>{
        if(row!=null && row!==undefined && Number.isInteger(parseInt(row))){
            updateSearch = '%' + search + '%'
            db_pool.query(`SELECT * FROM Quiz WHERE quizName LIKE ${mysql.escape(updateSearch)} AND isPublished = 1 LIMIT ${row}, 5`, (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
        }
        else{
            return reject("row is not in correct format")
        }
    })
}

createQuizHistory = ({quizId, uid, historyTime}) => {
    return new Promise((resolve, reject)=>{
        db_pool.query(`INSERT INTO QuizHistory(quizId, userId, historyTime) 
        VALUES (${mysql.escape(quizId)}, ${mysql.escape(uid)}, ${mysql.escape(historyTime)}) AS new_history
        ON DUPLICATE KEY UPDATE
            historyTime = new_history.historyTime`, (err, result)=>{
                if(err){
                    return reject(err)
                }
                return resolve(result)
            })
    })
}

getQuizHistory = ({uid, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT Quiz.* FROM QuizHistory INNER JOIN Quiz 
        ON QuizHistory.quizId = Quiz.quizId
        WHERE QuizHistory.userId = ${mysql.escape(uid)} AND isPublished = 1 ORDER BY historyTime DESC LIMIT 10`
        if(row!=null && row!==undefined && Number.isInteger(parseInt(row))){
            myquery = `SELECT Quiz.* FROM QuizHistory INNER JOIN Quiz 
            ON QuizHistory.quizId = Quiz.quizId
            WHERE QuizHistory.userId = ${mysql.escape(uid)} AND isPublished = 1 ORDER BY historyTime DESC LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserQuizAuthenticated = ({uid, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Quiz WHERE userId = ${mysql.escape(uid)} LIMIT 10`
        if(row!==undefined && row!=null && row!=='undefined' && Number.isInteger(parseInt(row))){
            myquery = `SELECT * FROM Quiz WHERE userId = ${mysql.escape(uid)} LIMIT ${row},10`
        }
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getSingleUserQuizAuthenticated = ({uid, quizId}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Quiz WHERE userId = ${mysql.escape(uid)} AND quizId = ${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

publishQuiz = ({uid, quizId, isPublished})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET isPublished = ${mysql.escape(isPublished)} WHERE userId = ${mysql.escape(uid)} AND quizId = ${mysql.escape(quizId)} AND isPublished < 2`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

adminBlockQuiz = ({uid, quizId, isPublished})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET isPublished = ${mysql.escape(isPublished)} WHERE (SELECT isAdmin FROM Users WHERE userId = ${mysql.escape(uid)})=1 AND quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getUserQuizAdmin = ({uid, quizId})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Quiz WHERE quizId=${mysql.escape(quizId)} AND (SELECT isAdmin FROM Users WHERE userId = ${mysql.escape(uid)})=1`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

adminRemoveQuiz = ({uid, quizId})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `DELETE FROM Quiz WHERE quizId=${mysql.escape(quizId)} AND (SELECT isAdmin FROM Users WHERE userId = ${mysql.escape(uid)})=1`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getLikedStatusOnQuiz = ({uid, quizId}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT likedStatus FROM LikedQuiz WHERE userId = ${mysql.escape(uid)} AND quizId = ${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

checkTakeLaterStatus = ({uid, quizId})=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT takeLaterId FROM TakeLater WHERE userId=${mysql.escape(uid)} AND quizId=${mysql.escape(quizId)};`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getQuizCommentByCommentId = (quizCommentId) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM QuizComment WHERE quizCommentId=${mysql.escape(quizCommentId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

getRelevantQuiz = ({uid, quizName, row}) => {
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT * FROM Quiz INNER JOIN Users ON Users.userId=Quiz.userId WHERE (Quiz.userId = ${mysql.escape(uid)}`
        let words = quizName.split(' ')
        for(const word of words){
            let newWord = '%' + word + '%'
            myquery += ' OR quizName LIKE ' + mysql.escape(newWord)
        }
        myquery += ') AND isPublished=1 ORDER BY RAND() LIMIT 10'
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

increaseQuizTakeCounts = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET takeCounts = takeCounts + 1 WHERE quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

increaseLikedCounts = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET likes = likes + 1 WHERE quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

decreaseLikedCounts = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET likes = likes - 1 WHERE quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

increaseDislikedCounts = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET dislikes = dislikes + 1 WHERE quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

decreaseDislikedCounts = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `UPDATE Quiz SET dislikes = dislikes - 1 WHERE quizId=${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

countQuestions = (quizId)=>{
    return new Promise((resolve, reject)=>{
        let myquery = `SELECT COUNT(*) AS count FROM Question WHERE quizId = ${mysql.escape(quizId)}`
        db_pool.query(myquery, (err, result)=>{
            if(err){
                return reject(err)
            }
            return resolve(result)
        })
    })
}

module.exports = {
    getQuiz,
    getQuizByQuizId,
    getUserQuiz,
    getQuestion,
    getQuestionChoice,
    getQuestionChoicesByQuizId,
    getCategoryQuiz,
    createQuiz,
    createQuizGrade,
    createQuestion,
    createQuestionChoice,
    createMutipleQuestionChoice,
    deleteQuiz,
    deleteQuestion,
    deleteAllQuestionInQuiz,
    deleteQuestionChoice,
    deleteAllQuestionChoiceInQuiz,
    setQuizThumbnail,
    getTheMostPopularQuiz,
    getQuizThumbnail,
    getUserTopFeatureQuiz,
    setUserTopFeatureQuiz,
    updateQuiz,
    getChoicesInAQuestion,
    getChoicesInAQuestionWithAnswer,
    removeChoicesInAQuestion,
    updateQuestionName,
    updateQuestionChoices,
    getTopQuizByCategory,
    createQuizComment,
    getQuizComment,
    getQuizSearchName,
    getSearchQuiz,
    getTakeLater,
    getLikedQuiz,
    createTakeLater,
    createLikedQuiz,
    deleteTakeLater,
    deleteLikedQuiz,
    getSubscriptionQuiz,
    getMoreQuizByCategoryById,
    getMoreSearchQuiz,
    createQuizHistory,
    getQuizHistory,
    getQuizWithUser,
    getUserQuizAuthenticated,
    publishQuiz,
    adminBlockQuiz,
    getUserQuizAdmin,
    adminRemoveQuiz,
    getLikedStatusOnQuiz,
    createLikedQuiz,
    checkTakeLaterStatus,
    getQuizCommentByCommentId,
    getSingleUserQuizAuthenticated,
    getRelevantQuiz,
    increaseQuizTakeCounts,
    getQuizGrade,
    increaseLikedCounts,
    decreaseLikedCounts,
    increaseDislikedCounts,
    decreaseDislikedCounts,
    getQuizInternal,
    countQuestions
}