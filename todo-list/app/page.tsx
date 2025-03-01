import TodoApp from "@/components/todo-app"

export default function Home() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Tasks</h1>
      <TodoApp />
    </div>
  )
}

