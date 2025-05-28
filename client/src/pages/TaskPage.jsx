import { useEffect } from "react";
import { useTasks } from "../context/TasksContext";
import TaskCard from "../components/TaskCard";

function TaskPage() {
  const { tasks, getTasks } = useTasks();

  useEffect(() => {
    getTasks()
  }, []);

  if (tasks.length === 0) return (<h1>No tasks</h1>);

  return (
    <div >//OJO AQUI className="grid grid-cols-3 gap-2"
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TaskPage;  
