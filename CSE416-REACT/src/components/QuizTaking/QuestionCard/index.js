import React from 'react';
import { userStyles} from "./style";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import BODY from '../../../constant/body';
import { Col, Row } from 'react-bootstrap';
import Countdown from 'react-countdown';

const QuestionCard = (props) => {
    const classes = userStyles();
    const questions = props.questions;
    const answers = props.answers;
    const answerChoices = props.answerChoices;
    const index = props.index;

    const changeQuestionHandler = (event) =>{
        if (event.target.name === 'next'){
            props.changeIndex(0, 1);
        }
        if (event.target.name === 'prev'){
            props.changeIndex(0, -1);
        }
    }

    const renderImage = () => {
        if(questions === undefined){
            return
        }
        if (questions.image !== null){
            return(<Card.Img variant="bottom" src={questions.image} className={classes.image} alt="No image Found"/>)
        }
    }

    const answerHandler = (event) => {
        props.changeAnswerChoice(event.target.value, questions[BODY.QUESTIONID]);
    }

    const buttonRender = (choice, index) => {
        if (index === parseInt(answerChoices[props.index][0])){
            return(
                <div key={choice.choiceId}>
                    <Button variant="success btn-lg" className={classes.buttonMarginNoBG} onClick={answerHandler} value={[index, choice.choice]}>
                        {choice.choice}
                    </Button>
                    <br />
                </div>
            );
        }else{
            return (
                <div key={choice.choiceId}>
                    <Button variant="success btn-lg" className={classes.buttonMargin} onClick={answerHandler} value={[index, choice.choice]}>
                        {choice.choice}
                    </Button>
                    <br />
                </div>
            );
        }    
    }

    const nextButtonRender = () =>{
        if(questions === undefined){
            return
        }
        if ((index + 1) === answerChoices.length){
            return(<Button variant="contained" className={classes.nextButton} name='submit' onClick={props.changeFlag}>Submit</Button>)
        }else{
            return(<Button variant="contained" className={classes.nextButton} name='next' onClick={changeQuestionHandler}>Next Question</Button>)
        }  
    }

    const prevButtonRender = () =>{
        if (index === 0){
            return(<Button variant="contained" className={classes.warningButton} name='prev'>Previous Question</Button>)
        }else{
            return(<Button variant="contained" className={classes.previousButton} name='prev' onClick={changeQuestionHandler}>Previous Question</Button>)
        }
    }

    const renderQuestion = () =>{
        if(questions === undefined){
            return
        }
        return(
            <div>
                <Card.Text className={classes.quizTextFont}> 
                    {questions.question}
                </Card.Text>
            </div>
        );
    }

    const renderAnswer = () =>{
        if(answers === undefined){
            return
        }
        return(answers.map((choice, index) => buttonRender(choice, index)));
    }

    const renderer = ({minutes, seconds}) => {
        return <span>{minutes}:{seconds}</span>;
    }

    return(
        // <div>

        // </div>
        <div>
            <Card className={classes.questionCardContainer}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title className={classes.titleFont}>
                    <Row>
                        <Col>Question {props.index + 1}</Col>
                        <Col className={classes.timer}>
                            {!props.flag &&
                                <Countdown
                                    key={props.quizTime.toString()}
                                    date={Date.now() + props.quizTime}
                                    renderer={renderer}
                                    onTick={() => props.setQuizTime(props.quizTime - 1000)}
                                    onComplete={() => props.changeFlag()}
                                />
                            }
                        </Col>
                    </Row>
                    </Card.Title>
                    {renderQuestion()}
                    {renderImage()}
                    {renderAnswer()}
                    <Row>
                        {index !==0 && <Col>{prevButtonRender()}</Col>}
                        <Col>{nextButtonRender()}</Col>
                    </Row>
    

                </Card.Body>
            </Card>
        </div>
    )
}


export default QuestionCard;