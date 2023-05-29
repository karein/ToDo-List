import { ChangeEvent, FormEvent, useState } from "react"

import "./global.css"
import styles from "./App.module.css"

import todoLogo from "./assets/todo-logo.png"

interface List {
  todo: string
  isFinished: boolean
}

const list = [
  {
    todo: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isFinished: false,
  },
  {
    todo: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isFinished: true,
  },
  {
    todo: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isFinished: false,
  },
  {
    todo: "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isFinished: true,
  },
]

function App() {
  const [todo, setTodo] = useState("")
  const [toDoList, setToDoList] = useState<List[]>([])

  function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
    setTodo(event.target.value)
  }

  function handleCreateNewToDo(event: FormEvent) {
    event.preventDefault()

    setToDoList([...toDoList, { todo, isFinished: false }])
    setTodo("")
  }

  function handleCheckToDo(index: number) {
    const changedFlag = toDoList.filter((el, i) => {
      if (i === index) {
        el.isFinished = !el.isFinished
        return el
      }
      return el
    })

    setToDoList(changedFlag)
  }

  function handleDeleteToDo(index: number) {
    const newListWithoutTodo = toDoList.filter((_, i) => {
      return i !== index
    })

    setToDoList(newListWithoutTodo)
  }

  return (
    <>
      <header className={styles.header}>
        <img src={todoLogo} className={styles.logo} />

        <form onSubmit={handleCreateNewToDo} className={styles.form}>
          <input
            type="text"
            value={todo}
            onChange={handleNewToDoChange}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="button">Criar</button>
        </form>
      </header>

      <main className={styles.main}>
        <div className={styles.info}>
          <span>Tarefas criadas 0</span>
          <span>Concluídas 0</span>
        </div>

        <div className={styles.divider} />

        <div>
          {toDoList.length > 0 ? (
            toDoList.map((e, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={e.isFinished}
                  onChange={() => handleCheckToDo(index)}
                />
                <p>{e.todo}</p>
                <button type="button" onClick={() => handleDeleteToDo(index)}>
                  excluir
                </button>
              </div>
            ))
          ) : (
            <p>
              Você ainda não tem tarefas cadastradas.
              <br />
              Crie tarefas e organize seus itens a fazer
            </p>
          )}
        </div>
      </main>
    </>
  )
}

export default App
