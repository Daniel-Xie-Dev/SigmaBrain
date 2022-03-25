import React from 'react';
import { userStyles, useStyles } from "./style";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {QuestionContext} from '../QuizTaking';



const QuestionCard = (props) => {
    const classes = userStyles();
    const object = React.useContext(QuestionContext);
    const questions = object.questions;
    const answers = object.answers;

    const changeQuestionHandler = (event) =>{
        if (event.target.name === 'next'){
            props.changeIndex(0, 1);
        }
        if (event.target.name === 'prev'){
            props.changeIndex(0, -1);
        }
    }

    const answerHandler = (event) => {
        props.changeAnswerChoice(questions.questionNum, event.target.value);
    }

    const nextButtonRender = () =>{
        if ((questions.questionNum + 1) === object.num){
            return(<Button variant="danger" className={classes.buttonMargin} name='submit' onClick={props.changeFlag}>Submit</Button>)
        }else{
            return(<Button variant="info" className={classes.buttonMargin} name='next' onClick={changeQuestionHandler}>Next Question</Button>)
        }
    }

    const prevButtonRender = () =>{
        if (questions.questionNum !== 0){
            return(<Button variant="info" className={classes.buttonMargin} name='prev' onClick={changeQuestionHandler}>Previous Question</Button>)
        }
    }

    return(
        <div>
            <Card className={classes.questionCardContainer}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title className={classes.titleFont}>Question {questions.questionNum + 1}</Card.Title>
                    <Card.Text className={classes.quizTextFont}>
                        {questions.question}
                    </Card.Text>
                    {answers.answerChoices
                        .map((choice) => 
                            <div key={answers.answerChoices.indexOf(choice)}>
                                <Button variant="primary btn-lg btn-block" className={classes.buttonMargin} onClick={answerHandler} value={answers.answerChoices.indexOf(choice)}>
                                    {choice}
                                </Button>
                                <br />
                            </div>)}
                    {prevButtonRender()}
                    {nextButtonRender()}
                </Card.Body>
            </Card>
        </div>
    )
}


export default QuestionCard;