import QuizSection from "../QuizSection";
import QuestionSection from "../QuestionSection";
const SectionWrapper = ({tag, quiz})=>{

    if(tag===0){
        return <QuizSection
                quiz={quiz}/>
    }

    if(tag===1){
        return <QuestionSection
                quiz={quiz}/>
    }
}

export default SectionWrapper