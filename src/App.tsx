import {
  InvalidEvent,
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useRef,
} from "react"
import { Check, ClipboardText, PlusCircle, Trash } from "@phosphor-icons/react"

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
  const ref = useRef(null)

  const [todo, setTodo] = useState("")
  const [finished, setFinished] = useState(0)
  const [toDoList, setToDoList] = useState<List[]>([])

  function handleNewToDoChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("")

    console.log("event change", event)
    console.log("event.target.value change", event.target.value, "\n")

    setTodo(event.target.value)
  }

  function handleCreateNewToDo(event: FormEvent) {
    event.preventDefault()

    if (todo.trim()) {
      setToDoList([...toDoList, { todo, isFinished: false }])
      setTodo("")
      return
    }

    const element:
      | InvalidEvent<HTMLInputElement>
      | ChangeEvent<HTMLInputElement>
      | null = ref.current
    console.log("element", element)
    // element.setCustomValidity("sdsd")

    if (element) {
      handleNewToDoInvalid(element)
    }
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

  function handleNewToDoInvalid(
    event: InvalidEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
  ) {
    console.log("event invalid", event)
    console.log("event.target.value invalid", event.target.value)

    event.target.setCustomValidity("Campo obrigatório!")

    if (event.target.value) {
      event.target.setCustomValidity("Campo obrigatório!")
    }
  }

  useEffect(() => {
    const total = toDoList.reduce((acumulador, valorAtual) => {
      if (valorAtual.isFinished) {
        return (acumulador += 1)
      }
      return acumulador
    }, 0)

    setFinished(total)
  }, [todo, toDoList])

  return (
    <>
      <header className={styles.header}>
        <img src={todoLogo} className={styles.logo} />

        {/* FORM / INPUT */}
        <form onSubmit={handleCreateNewToDo} className={styles.form}>
          <input
            min="3"
            required
            ref={ref}
            type="text"
            value={todo}
            id="inpuText"
            onChange={handleNewToDoChange}
            onInvalid={handleNewToDoInvalid}
            placeholder="Adicione uma nova tarefa"
          />
          <button type="submit">
            Criar <PlusCircle size={18} weight="bold" />
          </button>
        </form>
      </header>

      <main className={styles.main}>
        {/* INFO */}
        <div className={styles.info}>
          <div className={styles.criadas}>
            <span>Tarefas criadas</span>
            <span className={styles.info_text_count}>{toDoList.length}</span>
          </div>

          <div className={styles.concluidas}>
            <span>Concluídas</span>
            <span className={styles.info_text_count}>
              {finished}
              {finished > 0 && ` de ${toDoList.length}`}
            </span>
          </div>
        </div>

        <div>
          {toDoList.length > 0 ? (
            <div className={styles.tasks_container}>
              {/* TASK */}
              {toDoList.map((e, index) => (
                <div key={index} className={styles.task}>
                  <div className={styles.checkbox_container}>
                    <input
                      type="checkbox"
                      checked={e.isFinished}
                      onChange={() => handleCheckToDo(index)}
                    />
                    <Check size={12} weight="bold" />
                  </div>
                  <p className={e.isFinished ? styles.finishedTask : ""}>
                    {e.todo}
                  </p>
                  <button type="button" onClick={() => handleDeleteToDo(index)}>
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* EMPTY */
            <div className={styles.empty_tasks}>
              <ClipboardText size={56} weight="light" color="#333333" />
              <span>Você ainda não tem tarefas cadastradas.</span>
              <span>Crie tarefas e organize seus itens a fazer</span>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App
