import './toDo.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

type Props = {
    list: string[]
    replaceToProgress: (index: number) => void 
}

export const ToDo: React.FC<Props> = ({list, replaceToProgress})=>{
    return (
        <div className='block'>
            <h4 className='header' >Нужно сделать</h4>
            <TransitionGroup component='ul'>
                {list.map((task, index)=>{
                    return <CSSTransition timeout={500}
                    classNames="tasks"
                    key={index}>
                    <li key={index} className='toDo-tasks'> 
                    {task}
                    <span className='action' onClick={()=>replaceToProgress(index)}>&#8594;</span> 
                    </li>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    )
}