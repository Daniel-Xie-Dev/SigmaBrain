import { useStyles } from './style'
import HistoryResultCard from './HistoryResultCard'
const HistoryResult = ({results})=>{

    return(
        <div>
            {results.map((r, i)=>{
                return <div key={i}>
                        <HistoryResultCard result={r}/>
                    </div>
            })}
        </div>
    )
}

export default HistoryResult