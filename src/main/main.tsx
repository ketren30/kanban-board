import { ToDo } from '../toDo/toDo';
import { InProgress } from '../inProgress/inProgress';
import { Done } from '../done/done';
import { useState, useEffect} from 'react';
import './main.css';

export const Main = () => {
  const [toDo, setToDo] = useState(['Сравнительная таблица', 'Картинки','SEO','Редактирование','Публикация']);
  const [inProgress, setInProgress] = useState(['Введение', 'Черновик']);
  const [done, setDone] = useState(['Выбор приложений','Тестирование приложений','Ключевые особенности']);
  const [replacingToProgress, setReplacingToProgress] = useState<number|null>(null);
  const [replacingToDone, setReplacingToDone] = useState<number|null>(null);
  const [deleting, setDeleting] = useState<number|null>(null);
  
  const ReplaceToProgress = (index:number)=>{
    setReplacingToProgress(index)
  }
  const ReplaceToDone = (index:number)=>{
    setReplacingToDone(index)
  }
  const Delete = (index:number)=>{
    setDeleting(index)
  }
  useEffect (()=>{
    if (replacingToProgress!==null) {
      const temp=toDo[replacingToProgress]
      setInProgress(prev=>prev.concat(temp))
      setToDo((prev)=> prev.filter(elem=>elem!==temp))
      setReplacingToProgress(null)
    }
  }, [replacingToProgress])

  useEffect(()=>{
    if (replacingToDone!==null) {
      const temp=inProgress[replacingToDone];
      setDone(prev=>prev.concat(temp));
      setInProgress((prev)=> prev.filter(elem=>elem!==temp))
      setReplacingToDone(null)
    }
  }, [replacingToDone])

  useEffect(()=>{
    if (deleting!==null) {
      setDone((prev)=> prev.filter(elem=>elem!==done[deleting]))
      setReplacingToDone(null)
    }
  }, [deleting])


  return (
    <div>
      <ToDo list={toDo} replaceToProgress={ReplaceToProgress}/>
      <InProgress list={inProgress} replaceToDone={ReplaceToDone}/>
      <Done list={done} toDelete={Delete}/>
    </div>
  )
}


