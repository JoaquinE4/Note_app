 
import connectDB  from "@/utils/nogoose"
import  {taskModel}  from "@/models/tasks.model"
import TaskCard from '@/components/TaskCard';

async function loadTask() {
  try {
    // Conectar a la base de datos
    await connectDB();

    // Consultar las tareas (suponiendo que taskModel.find() devuelve una Promise)
    const tasks = await taskModel.find().lean();

    return tasks;
  } catch (error) {
    console.error('Error loading tasks:', error);
    throw new Error('Error loading tasks'); // Puedes personalizar este mensaje de error según sea necesario
  }
}



export default async function page() {
  const tasks = await loadTask()
  return (
   <div className="grid md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  )
}
