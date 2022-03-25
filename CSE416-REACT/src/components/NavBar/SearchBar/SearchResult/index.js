import React from 'react'
import { useStyles } from './style'
import Card from "react-bootstrap/Card";
import { useHistory } from 'react-router';

const SearchResult = ({searchInput,setSearchInput}) => {
    const classes = useStyles();
    let history = useHistory()
    return (
        <div>
            <div>
                <Card className={classes.searchResultContainer} onClick={()=>history.push('/QuizTaking')}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Quiz Title</Card.Title>
                        <Card.Text>
                            Quiz View : 0 <br />
                            Quiz Author : John Schmo <br />
                            Likes: 0    Dislikes: 0
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
            <div>
                <Card className={classes.cardContainer} onClick={()=>history.push('/QuizTaking')}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Quiz Title</Card.Title>
                        <Card.Text>
                            Quiz View : 0 <br />
                            Quiz Author : John Schmo <br />
                            Likes: 0    Dislikes: 0
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div>
                <Card className={classes.cardContainer} onClick={()=>history.push('/QuizTaking')}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Title>Quiz Title</Card.Title>
                        <Card.Text>
                            Quiz View : 0 <br />
                            Quiz Author : John Schmo <br />
                            Likes: 0    Dislikes: 0
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default SearchResult