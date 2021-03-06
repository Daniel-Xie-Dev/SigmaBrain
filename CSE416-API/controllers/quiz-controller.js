var quizMysql = require('../db/quiz-mysql');
var userMysql = require('../db/user-mysql');
const BODY = require('../constant/body');
const MYSQL_CONSTANT = require('../constant/mysql')
const fs = require('fs')
const path = require('path');

getQuiz = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let result = await quizMysql.getQuiz(id);
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizByQuizId = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let result = await quizMysql.getQuizByQuizId(id);
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserQuiz = async (req, res)=>{
    try{
        let userId = req.params.userId
        let row = req.query.row
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        let result = await quizMysql.getUserQuiz(body)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuiz = async (req, res) => {
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizCatgeory = req.body[BODY.QUIZCATEGORY]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const isPublished = req.body[BODY.ISPUBLISHED]
        const timeLimit = req.body[BODY.TIMELIMIT]
        /* if any of the required paramters is empty, return error */
        if(userId==null || quizName==null || quizCatgeory==null || quizDescription==null || isPublished==null){
            return res.status(400).json({msg: "required field can't be empty"})
        }
        let result = await quizMysql.createQuiz(userId, quizName, quizCatgeory, quizDescription, isPublished, timeLimit)
        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


createQuizWithQuestions = async (req, res) => {
    try{
        console.log(req.body)
        const userId = res.locals.decodedToken[BODY.UID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizCatgeory = req.body[BODY.QUIZCATEGORY]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const isPublished = req.body[BODY.ISPUBLISHED]
        const timeLimit = req.body[BODY.TIMELIMIT]

        if(userId==null || quizName==null || quizCatgeory==null || quizDescription==null || isPublished==null){
            return res.status(400).json({msg: "required field can't be empty"})
        }
        console.log("quiz", quizName, quizCatgeory,quizDescription, isPublished, timeLimit)
        let quiz_result = await quizMysql.createQuiz(userId, quizName, quizCatgeory, quizDescription, isPublished, timeLimit)
        const quizId = quiz_result[MYSQL_CONSTANT.INSERTID]
        const questions = req.body[BODY.QUESTIONS]
        for(let i = 0; i < questions.length; i++){
            const questionType = questions[i][BODY.QUESTIONTYPE]
            const numberOfChoice = questions[i][BODY.NUMBEROFCHOICE]
            const question = questions[i][BODY.QUESTION];
            const choices = questions[i][BODY.CHOICES]
            if (numberOfChoice > 6){
                return res.status(400).json({msg: "Can't have more than 6 answer choices"});
            }
            let check = false;
            for (let k = 0; k < choices.length; k++){
                if (choices[k][BODY.ISRIGHTCHOICE] === 1){
                    check = true;
                    break;
                }
            }
            if (!check){
                return res.status(400).json({msg: "Must have atleast one correct answer choice"});
            }
            console.log("question", questionType, numberOfChoice, question)
            let result = await quizMysql.createQuestion(quizId, questionType, numberOfChoice, question)
            const questionId = result[MYSQL_CONSTANT.INSERTID]
            
            for(let j = 0; j < choices.length; j++){
                const is_right_choice = choices[j][BODY.ISRIGHTCHOICE]
                const choice = choices[j][BODY.CHOICE]
                console.log("choice", choice, is_right_choice)
                await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)
            }
        }
        res.status(201).json(quiz_result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuizGrade = async (req, res) =>{
    try {
        const userId = res.locals.decodedToken[BODY.UID];
        const quizId = req.body.quizId;
        const quizGrade = req.body.quizGrade;
        let result = await quizMysql.createQuizGrade(quizId, userId, quizGrade);
        res.status(201).json(result)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

setQuizWithThumbnail = async (req, res) => {
    try{
        console.log("from setQuizWithThumbnail ", req.body)
        const quizId = req.body.quizId
        const thumbnail = res.locals.file.path
        /* if any of the required paramters is empty, return error */
        if(quizId==null || thumbnail==null){
            return res.status(400).json({msg: "some field is empty"})
        }
    
        let result = await quizMysql.setQuizThumbnail(quizId, thumbnail)
        console.log("quiz thumbnial is set")
        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


deleteQuiz = async (req, res) => {
    try{
        let id = req.params.quizId;
        let result = await quizMysql.deleteQuiz(id)
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


//quiz image route
// file is  {
//     fieldname: 'quizImage',
//     originalname: 'spirit.jpeg',
//     encoding: '7bit',
//     mimetype: 'image/jpeg',
//     destination: '/Users/kaichen/Desktop/Fall2021/CSE416/image-storage/d3pyNcmIwPPTVFnAEowHIWagfgX2/quizes/1',
//     filename: 'quizImage',
//     path: '/Users/kaichen/Desktop/Fall2021/CSE416/image-storage/d3pyNcmIwPPTVFnAEowHIWagfgX2/quizes/1/quizImage',
//     size: 25057
// }



getQuestion = async (req,res)=>{
    try{
        let id = req.params.quizId;
        let questionResult = await quizMysql.getQuestion(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuestion = async (req, res)=>{
    try{
        //INSERT INTO Question(quizId, questionType, numberOfChoice, question)
        const quizId = req.params.quizId
        const questionType = req.body[BODY.QUESTIONTYPE]
        const numberOfChoice = req.body[BODY.NUMBEROFCHOICE]
        const question = req.body[BODY.QUESTION]

        //check if fields are empty
        if(quizId==null || questionType==null || numberOfChoice==null || question==null){
            return res.status(400).json({msg: "required field can't be empty"})
        }

        let result = await quizMysql.createQuestion(quizId, questionType, numberOfChoice, question)

        res.status(201).json(result)


    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createMutipleQuestionChoice = async(req, res)=>{
    try{
        console.log(req.body)
        let choices = req.body
        let result = await quizMysql.createMutipleQuestionChoice(choices)
        res.status(201).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteQuestion = async (req, res) => {
    try{
        let id = req.params.questionId;
        let result = await quizMysql.deleteQuestion(id)
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteAllQuestionInQuiz = async (req, res) => {
    try{
        let id = req.params.quizId
        let result = await quizMysql.deleteAllQuestionInQuiz(id)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuestionChoice = async (req,res)=>{
    try{
        let id = req.params.questionId;
        let questionResult = await quizMysql.getQuestionChoice(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuestionChoice = async (req, res)=>{
    try{
        const quizId = req.params.quizId
        const questionId = req.params.questionId
        const is_right_choice = req.body[BODY.ISRIGHTCHOICE]
        const choice = req.body[BODY.CHOICE]
        //TODO: CHECK
        let result = await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)

        res.status(201).json(result)

    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteQuestionChoice = async (req, res)=>{
    try{
        let id = req.params.choiceId;
        let questionResult = await quizMysql.deleteQuestionChoice(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


deleteAllQuestionChoiceInQuiz = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let questionResult = await quizMysql.deleteAllQuestionChoiceInQuiz(id);
        res.status(200).json(questionResult)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTheMostPopularQuiz = async (req, res)=>{
    try{
        let result = await quizMysql.getTheMostPopularQuiz(5)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizThumbnail = async (req, res)=>{
    try{
        let id = req.params.quizId;
        let result = await quizMysql.getQuizThumbnail(id)
        //TODO: CHECK IF DIR IS EMPTY
        let dir = result[0]['thumbnail']
        if(dir==null){
            return res.send(null)
        }
        // console.log(result)
        //TODO: CHECK IF EXTENTION IS CORRECT IMAGE FORMAT
        // console.log(dir)
        let extention = path.extname(dir).substring(1)
        // console.log("calling thumbnail")
        // console.log("extention is", path.extname(dir).substring(1))
        fs.readFile(
            dir, 'base64',
            (err, base64image)=>{
                const dataUrl = `data:image/${extention};base64,${base64image}`
                return res.send(dataUrl)
            }
        )
    }catch(e){
        // console.log(e)
        res.sendStatus(500)
    }
}

getCategoryQuiz = async (req, res)=>{
    try{
        let category = req.params.category
        let result = await quizMysql.getCategoryQuiz(category)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteQuizWithQuestions = async (req, res)=>{
    try{
        let results = []
        const userId = res.locals.decodedToken[BODY.UID]
        let id = req.params.quizId;
        let result = await quizMysql.deleteQuiz(id)
        results.push(result)
        result = await quizMysql.deleteAllQuestionInQuiz(id)
        results.push(result)
        result = await quizMysql.deleteAllQuestionChoiceInQuiz(id)
        results.push(result)
        res.status(200).json(results)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserTopFeatureQuiz = async (req, res)=>{
    try{
        let userId = req.params.userId
        let result = await quizMysql.getUserTopFeatureQuiz(userId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

setUserTopFeatureQuiz = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        const quizId = req.body[BODY.QUIZID]
        let result = await quizMysql.setUserTopFeatureQuiz(userId, quizId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

updateQuiz = async (req, res)=>{
    try {
        const userId = res.locals.decodedToken[BODY.UID]
        const quizId = req.body[BODY.QUIZID]
        const quizName = req.body[BODY.QUIZNAME]
        const quizDescription = req.body[BODY.QUIZDESCRIPTION]
        const timelimit = req.body[BODY.TIMELIMIT]
        const quizCategory = req.body[BODY.QUIZCATEGORY]
        let result = await quizMysql.updateQuiz(userId, quizId, quizName, quizDescription, timelimit, quizCategory)
        res.sendStatus(200)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getChoicesInAQuestion = async (req, res)=>{
    try{
        let questionId = req.params.questionId
        let result = await quizMysql.getChoicesInAQuestion(questionId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getChoicesInAQuestionWithAnswer = async (req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let questionId = req.params.questionId
        let result = await quizMysql.getChoicesInAQuestionWithAnswer(questionId, userId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuestionChoicesByQuizId = async (req, res)=>{
    try {
        let quizId = req.params.quizId;
        let result = await quizMysql.getQuestionChoicesByQuizId(quizId);
        res.status(200).json(result);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}



updateQuestionChoices = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let choices = req.body[BODY.CHOICES]
        let quizId = req.body[BODY.QUIZID]
        let questionId = req.body[BODY.QUESTIONID]
        let questionName = req.body[BODY.QUESTION]
        try{
            await quizMysql.removeChoicesInAQuestion(userId, questionId)
        }catch{}
        try{
            await quizMysql.updateQuestionName(questionId, questionName)
        }catch{}
        let result = await quizMysql.updateQuestionChoices(choices, userId, quizId, questionId)
        res.status(200).json(result)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTopQuizByCategory = async(req, res)=>{
    try{
        let category = req.params.category
        let response = await quizMysql.getTopQuizByCategory(category)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuizComment = async(req, res)=>{
    console.log("createing quiz comment")
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let quizComment = req.body[BODY.QUIZCOMMENT]
        let response = await quizMysql.createQuizComment(quizId, quizComment, userId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
} 

getQuizComment =  async(req, res)=>{
    try{
        let quizId = req.params.quizId
        let row = req.query.row
        let body = {
            [BODY.QUIZID]: quizId,
            [BODY.ROW]: row
        }
        let response = await quizMysql.getQuizComment(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizSearchName = async(req, res)=>{
    try{
        let search = req.params.search
        let response= await quizMysql.getQuizSearchName(search)
        let search_arr = []
        for(var i=0; i < response.length; i++){
            search_arr.push(response[i][BODY.QUIZNAME])
        }
        res.status(200).json(search_arr)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getSearchQuiz = async(req, res)=>{
    try{
        let search = req.params.search
        let response = await quizMysql.getSearchQuiz(search)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


getTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let row = req.query.row
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        let response = await quizMysql.getTakeLater(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let row = req.query.row
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        let response = await quizMysql.getLikedQuiz(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let response = await quizMysql.createTakeLater(userId, quizId)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.body[BODY.QUIZID]
        let likedStatus = req.body[BODY.LIKEDSTATUS]
        let getStatusBody = {
            [BODY.UID]: userId,
            [BODY.QUIZID]: quizId
        }
        let currentStatus = await quizMysql.getLikedStatusOnQuiz(getStatusBody)
        if(currentStatus.length>0){
            if(currentStatus[0][BODY.LIKEDSTATUS]===1 && likedStatus===2){
                console.log("decrease like")
                await quizMysql.decreaseLikedCounts(quizId)
            }
            else if(currentStatus[0][BODY.LIKEDSTATUS]===0 && likedStatus===2){
                console.log("decrease dislike")
                await quizMysql.decreaseDislikedCounts(quizId)
            }
            else if(currentStatus[0][BODY.LIKEDSTATUS]===2){
                if(likedStatus===1){
                    console.log("increase like")
                    await quizMysql.increaseLikedCounts(quizId)
                }
                else if(likedStatus===0){
                    console.log("increase dislike")
                    await quizMysql.increaseDislikedCounts(quizId)
                }
            }
            else if(currentStatus[0][BODY.LIKEDSTATUS] !== likedStatus){
                if(likedStatus===1){
                    console.log("increase like")
                    await quizMysql.increaseLikedCounts(quizId)
                    console.log("decrease dislike")
                    await quizMysql.decreaseDislikedCounts(quizId)
                }
                else if(likedStatus===0){
                    console.log("decrease like")
                    await quizMysql.decreaseLikedCounts(quizId)
                    console.log("increase dislike")
                    await quizMysql.increaseDislikedCounts(quizId)
                }
            }
        }else{
            if(likedStatus===1){
                console.log("increase like")
                await quizMysql.increaseLikedCounts(quizId)
            }
            else if(likedStatus===0){
                console.log("increase dislike")
                await quizMysql.increaseDislikedCounts(quizId)
            }
        }
        let response = await quizMysql.createLikedQuiz(userId, quizId, likedStatus)
        res.status(201).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteTakeLater = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.params.quizId
        let response = await quizMysql.deleteTakeLater(userId, quizId)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

deleteLikedQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let quizId = req.params.quizId
        let response = await quizMysql.deleteLikedQuiz(userId, quizId)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getSubscriptionQuiz = async(req, res)=>{
    try{
        const userId = res.locals.decodedToken[BODY.UID]
        let row = req.query.row
        let body = {
            [BODY.UID]: userId,
            [BODY.ROW]: row
        }
        console.log(body)
        let response = await quizMysql.getSubscriptionQuiz(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getMoreQuizByCategoryById = async(req, res)=>{
    try{
        const category = req.body[BODY.QUIZCATEGORY]
        const quizId = req.body[BODY.QUIZID]
        let response = await quizMysql.getMoreQuizByCategoryById(category, quizId)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500) 
    }
}

getMoreSearchQuiz = async(req, res)=>{
    try{
        let search = req.query.search
        let row = req.query.row
        if(search!==undefined && row!==undefined){
            let response = await quizMysql.getMoreSearchQuiz(search, row)
            res.status(200).json(response)
        }else{
            res.sendStatus(400)
        }
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

createQuizHistory = async(req, res)=>{
    try {
        console.log(res.locals.decodedToken[BODY.UID])
        let payload = {
            [BODY.QUIZID]: req.body[BODY.QUIZID],
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.HISTORYTIME]: req.body[BODY.HISTORYTIME]
        }
        let response = await quizMysql.createQuizHistory(payload)
        res.sendStatus(201)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizHistory = async(req, res)=>{
    try {
        let payload = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.ROW]: req.body[BODY.ROW]
        }
        let response = await quizMysql.getQuizHistory(payload)
        res.status(200).json(response)
    } catch(e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizWithUser = async(req, res)=>{
    try{
        let id = req.params.quizId;
        let result = await quizMysql.getQuizWithUser(id);
        res.status(200).json(result);
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserQuizAuthenticated = async(req, res)=>{
    try{
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.ROW]: req.query.row
        }
        let response = await quizMysql.getUserQuizAuthenticated(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

publishQuiz = async(req,res)=>{
    try{
        if(req.body[BODY.ISPUBLISHED]!==1 && req.body[BODY.ISPUBLISHED]!==0){
            return res.sendStatus(400)
        }
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.body[BODY.QUIZID],
            [BODY.ISPUBLISHED]: req.body[BODY.ISPUBLISHED]
        }
        await quizMysql.publishQuiz(body)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

adminBlockQuiz = async(req, res)=>{
    try{
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.body[BODY.QUIZID],
            [BODY.ISPUBLISHED]: req.body[BODY.ISPUBLISHED]
        }
        await quizMysql.adminBlockQuiz(body)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getUserQuizAdmin = async(req, res)=>{
    try {
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.params.quizId
        } 
        let response = await quizMysql.getUserQuizAdmin(body)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

adminRemoveQuiz = async(req, res)=>{
    try{
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.params.quizId
        }
        await quizMysql.adminRemoveQuiz(body)
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

getLikedStatusOnQuiz = async(req, res)=>{
    try {
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.params[BODY.QUIZID],
        }
        let response = await quizMysql.getLikedStatusOnQuiz(body)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

checkTakeLaterStatus = async(req, res)=>{
    try {
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.params.quizId
        }
        let response = await quizMysql.checkTakeLaterStatus(body)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

getQuizCommentByCommentId = async(req, res)=>{
    try {
        let id = req.params.quizCommentId
        let response = await quizMysql.getQuizCommentByCommentId(id)
        res.status(200).json(response)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
        
    }
}

getSingleUserQuizAuthenticated = async(req, res)=>{
    try{
        let body = {
            [BODY.UID]: res.locals.decodedToken[BODY.UID],
            [BODY.QUIZID]: req.params.quizId
        }
        let response = await quizMysql.getSingleUserQuizAuthenticated(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }


}

getRelevantQuiz = async(req, res)=>{        
    try{
        if(req.query.userId === 'undefined' || req.query.quizName === 'undefined'){
            res.sendStatus(400)
        }
        let body = {
            [BODY.UID]: req.query.userId,
            [BODY.QUIZNAME]: req.query.quizName
        }

        let response = await quizMysql.getRelevantQuiz(body)
        res.status(200).json(response)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}


checkQuizAnswer = async(req, res)=>{
    try{    
        let quizId = req.body[BODY.QUIZID]
        let userId = res.locals.decodedToken[BODY.UID]
        let answers = req.body["answers"]
        let took = false;
        let quizGrade = await quizMysql.getQuizGrade(quizId, userId)

        if(quizGrade.length>0){
            took = true
        }

        let response = await quizMysql.getQuestionChoicesByQuizId(quizId)
        let dict = {}
        for(let i = 0; i < response.length; i++){
            if(response[i][BODY.ISRIGHTCHOICE]==1){
                dict[response[i][BODY.QUESTIONID]] = response[i][BODY.CHOICE]
            }
        }

        let correct = 0
        for(var i = 0; i < answers.length; i++){
            if(answers[i][2] !== -1 && answers[i][1] === dict[answers[i][2]]){
                correct++;
            }
        }

        let grade = (correct/answers.length).toFixed(2)
        await quizMysql.createQuizGrade(quizId, userId, grade)
        await quizMysql.increaseQuizTakeCounts(quizId)
        if(took){
            console.log("user took quiz more than once")
            return res.sendStatus(200)
        }

        let quiz = await quizMysql.getQuizByQuizId(quizId)
        let updateCLB = {
            [BODY.USERID]: userId,
            [BODY.CHANNELOWNER]: quiz[0][BODY.USERID],
            [BODY.SCORE]: correct*10
        }
        await userMysql.updateChannelLeaderboard(updateCLB)

        console.log(quiz[0][BODY.ISADMIN])
        if(quiz[0][BODY.ISADMIN]===1){
            let globalLB = {
                [BODY.USERID]: userId,
                [BODY.CATEGORY]: quiz[0][BODY.QUIZCATEGORY],
                [BODY.SCORE]: correct*10
            }
            await userMysql.updateGlobalLeaderboard(globalLB)
        }

        let user = await userMysql.getUserInfo(userId)

        calculateUserLevel(userId, user[0][BODY.USERLEVEL], user[0][BODY.EXPNEEDED], calculateQuizPoints(correct))
        console.log("point added for user")
        res.sendStatus(200)
    }catch(e){
        console.log(e)
        res.sendStatus(500)
    }
}

const calculateUserLevel = async (userId, newLevel, expNeeded, expGained) =>{  
    const LEVELCUTOFF = require("../constant/levelPointsCutoff")
    if(expNeeded - expGained <= 0){
        //Level up
        //calculate the new exp Needed
        let newExpNeeded = expNeeded - expGained;
        //Gets the data needed for the new level
        let levelObj = LEVELCUTOFF.LEVELS[newLevel + 1];   //level constant has a level 0 object. So level 1 corresponds to ARRAY[1]
        console.log("this level neeeded this amount of exp" + levelObj.experience);
        newExpNeeded = levelObj.experience + newExpNeeded; //new Exp Needed is a negative number
        //set the new values
        await userMysql.updateUserLevel(userId, newLevel + 1, newExpNeeded)
    }else{
        //same level
        //just new value for the exp needed
        await userMysql.updateUserLevel(userId, newLevel, expNeeded - expGained)
    }
}

const calculateQuizPoints = (correct) => {
    //the points gained after taking completing the quiz
    return 100 * correct;
}

const addNewQuestions = async(req, res)=>{
    let payload = req.body[BODY.QUESTION]
    let quizId = req.body[BODY.QUIZID]
    let userId = res.locals.decodedToken[BODY.UID]
    let getQuiz = await quizMysql.getQuizInternal(quizId)
    if(getQuiz.length>0 && userId === getQuiz[0][BODY.USERID]){
        //checking later
        //check number of questions
        let numOfQuestions = await quizMysql.countQuestions(quizId)
        if(numOfQuestions[0]['count']>49){
            return res.sendStatus(400)
        }
        let questionType = payload[BODY.QUESTIONTYPE]
        let numberOfChoice = payload[BODY.NUMBEROFCHOICE]
        let question = payload[BODY.QUESTION]
        let result = await quizMysql.createQuestion(quizId, questionType, numberOfChoice, question)
        let questionId = result[MYSQL_CONSTANT.INSERTID]
        let choices = payload[BODY.CHOICES]
        for(let i = 0; i < choices.length; i++){
            const is_right_choice = choices[i][BODY.ISRIGHTCHOICE]
            const choice = choices[i][BODY.CHOICE]
            await quizMysql.createQuestionChoice(questionId, quizId, is_right_choice, choice)
        }
    }
    else{
        console.log("not valid user")
        return res.sendStatus(400)
    }
    res.sendStatus(200)
}

module.exports = {
    getQuiz,
    getQuizByQuizId,
    getQuestion,
    getQuestionChoice,
    getQuestionChoicesByQuizId,
    getCategoryQuiz,
    getUserQuiz,
    createQuiz,
    createQuestion,
    createQuestionChoice,
    createMutipleQuestionChoice,
    createQuizGrade,
    deleteQuiz,
    deleteQuestion,
    deleteAllQuestionInQuiz,
    deleteQuestionChoice,
    deleteAllQuestionChoiceInQuiz,
    setQuizWithThumbnail,
    getTheMostPopularQuiz,
    getQuizThumbnail,
    createQuizWithQuestions,
    deleteQuizWithQuestions,
    getUserTopFeatureQuiz,
    setUserTopFeatureQuiz,
    updateQuiz,
    getChoicesInAQuestion,
    getChoicesInAQuestionWithAnswer,
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
    createQuizHistory,
    getMoreSearchQuiz,
    getQuizHistory,
    getQuizWithUser,
    getUserQuizAuthenticated,
    publishQuiz,
    adminBlockQuiz,
    getUserQuizAdmin,
    adminRemoveQuiz,
    getLikedStatusOnQuiz,
    checkTakeLaterStatus,
    getQuizCommentByCommentId,
    getSingleUserQuizAuthenticated,
    getRelevantQuiz,
    checkQuizAnswer,
    addNewQuestions
}