import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './tasks.css';
import { keysOfList } from '../main/main';
import { useState } from 'react';

type Props = {
    list: string[]
    handleChange: (componentName: keysOfList, index: number)=> void,
    properties: string[],
    component: keysOfList,
    addNew: (task: string, component: keysOfList) => void,
    deleteAll: (component: keysOfList) => void
}

export const Tasks: React.FC<Props> = ({list, handleChange, properties, component, addNew, deleteAll})=>{
    const [adding, setAdding] = useState(false);
    const [newTask, setNewTask] = useState('');

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setNewTask(e.currentTarget.value)
    }
    const handleKeys = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
            addNew(newTask, component);
            setAdding(false);
            setNewTask('');
        }
    }
    return (
        <div className='block'>
            <h4 className='header'>{properties[0]}</h4>
            <TransitionGroup component='ul'>
                {list.map((task, index)=>{
                    return <CSSTransition timeout={500}
                    classNames="tasks"
                    key={index}>
                    <li key={index} className='tasks-list' style={{backgroundColor: `${properties[1]}`}}> 
                    <p>{task}</p>
                    <span className='action' onClick={()=>handleChange(component, index)}>{properties[2]}</span> 
                    </li>
                    </CSSTransition>
                })}
            </TransitionGroup>
            {adding? 
                <input className='add-task' value={newTask} onChange={handleInput} onKeyDown={handleKeys}/>
                :<br/>
            }
            <div className='editing'>
                <button className='add' onClick={() => setAdding(true)}>+</button>
                <button className='delete-all' onClick={() => deleteAll(component)}>Очистить задачи</button>
            </div>
        </div>
    )
}