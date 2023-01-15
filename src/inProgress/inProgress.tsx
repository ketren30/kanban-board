import './inProgress.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

type Props = {
    list: string[]
    replaceToDone: (index:number) => void
}

export const InProgress: React.FC<Props> = ({list, replaceToDone})=>{
    return (
        <div className='block'>
            <h4 className='header' >В процессе</h4>
            <TransitionGroup component='ul'>
                {list.map((task, index)=>{
                    return <CSSTransition timeout={500}
                    classNames="tasks"
                    key={index}>
                    <li key={index} className='progress-tasks'> 
                    {task}
                    <span className='action' onClick={()=>replaceToDone(index)}>&#9203;</span> 
                    </li>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    )
}