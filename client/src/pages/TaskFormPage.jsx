import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TasksContext';
import { useNavigate, useParams } from 'react-router-dom';
import './TaskFormPage.css';
import { useEffect } from 'react';

function TaskFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task)
        setValue('title', task.title)
        setValue('description', task.description)
      }
    }
    loadTask()
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate('/tasks');
  });

  return (
    <div className="task-container">
      <form onSubmit={onSubmit} className="task-form">
        <input
          type="text"
          placeholder="Título"
          {...register("title")}
          className="task-input"
          autoFocus
        />

        <textarea
          rows="3"
          placeholder="Descripción"
          {...register("description")}
          className="task-textarea"
        ></textarea>

        <button className="task-button">Guardar</button>
      </form>
    </div>
  );
}

export default TaskFormPage;
