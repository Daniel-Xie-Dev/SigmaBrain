import React from 'react';
import Button from 'react-bootstrap/Button'
import { useStyles } from './style';

const QuizSideBar = (props) => {
    const classes = useStyles()
    const index = props.index;
    const num = props.num;
    const array = [];

    for(let i = 0 ; i < num; i++){
        array.push(i);
    }
    // setShowModal(new Array(array.length).fill(false));


    const changeQuestions = (event) =>{
        props.changeIndex(-1, parseInt(event.target.value));
    }

    const buttonRender = (questionNum) => {
        return(
            <div className={classes.sideBarSelect} key={questionNum}>
                <Button className={classes.buttonDefault}variant={index === questionNum ? "success" : "light text-dark btn-outline-success"} onClick={changeQuestions} value={questionNum}>
                    Question {questionNum + 1}
                </Button>
            </div>
        )
    }

    return (
        <div className={classes.sideBarContainer}>
            {array.map((questionNum) => buttonRender(questionNum))}  
        </div>
    )
}

export default QuizSideBar
