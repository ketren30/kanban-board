import { Tasks } from '../tasks/tasks';
import { useState, useEffect} from 'react';
import './main.css';
interface List {
  toDo: string[],
  inProgress: string[],
  done: string[]
}
type Entries = [keysOfList, string[]]
export type keysOfList = keyof List;

export const Main = () => {
  const [list, setList] = useState<List>({
    toDo: [],
    inProgress: [],
    done: []
  });
  const [properties] = useState<List>({
    toDo: ['Нужно сделать', 'rgb(241, 89, 89)', `→`],
    inProgress: ['В процессе', 'black', '⌛'],
    done: ['Сделано', 'rgba(29, 214, 29, 0.788)', '✔']
  })
  const [changingIndex, setChangingIndex] = useState<number|null>(null);
  const [componentName, setComponentName] = useState<keysOfList|null>(null);
  const [newTask, setNewTask] = useState('');
  const [deleteAll, setDeleteAll] = useState(false);

  useEffect(()=> {
    fetch('https://api.jsonbin.io/v3/b/64984c199d312622a3755c9a')
      .then(res => res.json())
      .then(result => setList(result.record))
  }, [])
  

  const addNew = (task: string, component: keysOfList) => {
    setNewTask(task);
    setComponentName(component);
  }

  const deleteAllColumn = (component: keysOfList) => {
    setDeleteAll(true);
    setComponentName(component);
  }
  useEffect(()=> {
    if (newTask && componentName && list.toDo) setList((prev) => {
      const temp = list[componentName].concat(newTask);
      return {...prev, [componentName]: temp}
    })
    setComponentName(null)
  }, [newTask])
  
  const changeBoard = (componentName:keysOfList, index:number) => {
    setChangingIndex(index);
    setComponentName(componentName);
  }
  useEffect (()=> {
    if (changingIndex!==null && componentName && list) {
      const replacingItem = list[componentName][changingIndex];
      setList((prev: List) => {
        const filtered = list[componentName].filter((item, index) => index!==changingIndex);
        return {...prev, [componentName]: filtered}
      })
      if (componentName==='toDo') setList(prev => {
        return {...prev, inProgress: list.inProgress.concat(replacingItem)}
      })
      if (componentName==='inProgress') setList(prev => {
        return {...prev, done: list.done.concat(replacingItem)}
      })
      setChangingIndex(null);
      setComponentName(null);
    }
  }, [changingIndex]);

  useEffect(()=> {
    if (deleteAll && componentName) {
      setList(prev=> {
        return {...prev, [componentName]: []}
      })
    }
    setComponentName(null);
    setDeleteAll(false);
  }, [deleteAll])

  useEffect(()=> {
    fetch('https://api.jsonbin.io/v3/b/64984c199d312622a3755c9a', {
                method: 'PUT',
                headers: {
                    'X-Master-Key': '$2b$10$oxBixTfm91bCooJQkMVgqe2pAnvfRW3.CENARse2lulF/f3HZB7gq',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(list)
        });
  }, [list])
  

  if (list) return (
    <div className='container'>
      <h1>My KANBAN BOARD</h1>
      <div className='blocks'>
        {(Object.entries(list) as Entries[]).map((item)=> <Tasks 
          list={item[1]} 
          handleChange={changeBoard} 
          properties={properties[item[0]]} 
          component={item[0]}
          addNew={addNew}
          deleteAll={deleteAllColumn}
        />)}
      </div>  
    </div>
  )
  return <div></div>
}
