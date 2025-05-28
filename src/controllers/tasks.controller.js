import Task from '../models/task.model.js'

export const getTasks = async (req, res)  => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) =>{
    const { title, description, date } = req.body;

    const newTask = new Task({
        title,
        description,
        date,
    });
    const savedTask = await newTask.save();
    res.json(savedTask);
};
export const getTask = async (req, res) =>{
  try {  
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.json(task);
   }catch (error){
    return res.status(404).json({ message: "Tarea no encontrada"});
   }
};

export const deleteTask = async (req, res) =>{
    const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
};
export const updateTask = async (req, res) =>{
    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
       new: true
    })
    if (!task) return res.status(404).json({message: 'Task not found'})
    res.json(task)
}
