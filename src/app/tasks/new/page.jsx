'use client'
import { useEffect, useState} from "react";
import { useRouter, useParams } from "next/navigation";

export default function Page() {
    const [newTask, setNewTask] = useState({
        title: "",
        descripcion: ""
    });
    const router = useRouter()
    const params = useParams()


    const createTask=async()=>{
            try {
                
                const res = await fetch('/api/tasks', {
                    method: "POST",
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if(res.status=== 200){
                    router.push("/")
                    router.refresh()

                }
            } catch (error) {
                console.log(error)
            }
     }

     const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`,
            {
                method:"GET"
            }
        );
        const data = await res.json()
        setNewTask({ title: data.title, descripcion: data.descripcion });
       
      };

     const updateTask = async ()=>{
        try {
            const res =  await fetch(`/api/tasks/${params.id}`,
            {
                method:"PUT",
                body:JSON.stringify(newTask),
                headers:{
                    "Content-Type": "application/json"
                }
            }
        )

        const data = await res.json()
        router.push("/")
        router.refresh()
        } catch (error) {
            console.log(error)
        }
     }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if(!params.id){

            await createTask()
        }else{
            updateTask()
        }

     
        
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value
        });
    }

    const handleDelete=()=>{
        if(window.confirm("Desea eliminar la tarea")){
             fetch(`/api/tasks/${params.id}`,
                {
                    method:"DELETE"
                }
             )
             router.push("/")
             router.refresh()
        }

    }
    useEffect(()=>{
        console.log(params)
        if(params.id){
            getTask()
        }

    },[])
    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
            <form   onSubmit={handleSubmit} >
                <header className="flex justify-between">
                <h1 className="font-bold text-3xl">
                    {
                        !params.id? "Crear Tarea": "Editar Tarea"
                    }
                 </h1>

                    <button type="button" className={`bg-red-500 px-3 py-1 rounded-md ${!params.id ? "hidden" : "block"} `} onClick={handleDelete }>
                    Eliminar
                    </button>
                </header>

                <input
                    type="text"
                    name="title"
                    placeholder="Titulo"
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
                    onChange={handleChange}
                    value={newTask.title}
                />
                <textarea
                    name="descripcion"
                    placeholder="Descripcion"
                    rows={3}
                    className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4 "
                    onChange={handleChange}
                    value={newTask.descripcion}
                ></textarea>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg  ">
                    {
                        !params.id ? "Crear": "Actualizar"
                    }</button>
            </form>
        </div>
    );
}
