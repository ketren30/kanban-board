import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './done.css'

type Props = {
    list: string[]
    toDelete: (index: number)=> void
}

export const Done: React.FC<Props> = ({list, toDelete})=>{

    return (
        <div className='block'>
            <h4 className='header'> Сделано</h4>
            <TransitionGroup component='ul'>
                {list.map((task, index)=>{
                    return <CSSTransition timeout={500}
                    classNames="tasks"
                    key={index}>
                    <li key={index} className='done-tasks'> 
                    {task}
                    <span className='action' onClick={()=>toDelete(index)}>&#10004;</span> 
                    </li>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    )
}