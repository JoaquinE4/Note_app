 
import { connectDB } from "@/utils/nogoose"
import { taskModel } from "@/models/tasks.model"
import {TaskCard} from "@/components/taskCard"

async function loadTask(){
  connectDB()
  const task = await taskModel.find().lean()
console.log(task)
return task
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
