"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { NextResponse } from "next/server";

export default function Page() {
  const [newTask, setNewTask] = useState({
    title: "",
    descripcion: "",
  });
  const router = useRouter();
  const params = useParams();

  const createTask = async () => {
    try {
      const res = await fetch("/api/tasks", {
        cache:"no-store",
        method: "POST",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status === 200) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      return NextResponse.json(error.message, { status: 409 });
    }
  };

  const getTask = useCallback(async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        cache:"no-store",
        method: "GET",
      });
      const data = await res.json();
      setNewTask({ title: data.title, descripcion: data.descripcion });
    } catch (error) {
      return NextResponse.json(
        { error: "No se encontro la nota" },
        { status: 409 }
      );
    }
  }, [params.id]);

  const updateTask = async () => {
    try {
      const res = await fetch(`/api/tasks/${params.id}`, {
        cache:"no-store",
        method: "PUT",
        body: JSON.stringify(newTask),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      router.push("/");
      router.refresh();
    } catch (error) {
      return NextResponse.json(error.message, { status: 409 });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!params.id) {
      await createTask();
    } else {
      updateTask();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleDelete = () => {
    if (window.confirm("Desea eliminar la tarea")) {
      fetch(`/api/tasks/${params.id}`, {
        method: "DELETE",
      });
      router.push("/");
      router.refresh();
    }
  };
  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, [getTask, params.id]);
  return (
    <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Crear Nota" : "Editar Nota"}
          </h1>

          <button
            type="button"
            className={`bg-red-500 px-3 py-1 rounded-md ${
              !params.id ? "hidden" : "block"
            } `}
            onClick={handleDelete}
          >
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
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg  "
        >
          {!params.id ? "Crear" : "Actualizar"}
        </button>
      </form>
    </div>
  );
}
