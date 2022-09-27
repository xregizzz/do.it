import { Container, InputContainer, TasksContainer } from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { FiEdit2 } from "react-icons/fi";
import Button from "../../components/Button";
import Card from "../../components/Card";
import { useState } from "react";
import api from "../../services/api";
import { toast } from "react-toastify";

function Dashboard({ authenticated }) {
  const [tasks, setTasks] = useState([]);
  const [token] = useState(
    JSON.parse(localStorage.getItem("@Doit:token")) || ""
  );

  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  function loadTasks() {
    api
      .get("/task", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          completed: false,
        },
      })
      .then((response) => {
        const apiTasks = response.data.data.map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }),
        }));
        setTasks(apiTasks);
      })
      .catch((err) => console.log(err));
  }

  const onSubmit = ({ task }) => {
    if (!task) {
      return toast.error("Complete o campo para enviar uma tarefa");
    }
    api
      .post(
        "/task",
        {
          description: task,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => loadTasks());
  };

  const handleCompleted = (id) => {
    const newTasks = tasks.filter((task) => task._id !== id);
    console.log("oi " + id);
    api
      .put(
        `/task/${id}`,
        { completed: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => setTasks(newTasks));
  };

  useEffect(() => {
    if (!authenticated) {
      return navigate("/login");
    }
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, navigate]);

  function getDate() {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const dataAtual = dia + "/" + mes + "/" + ano;
    return dataAtual;
  }

  return (
    <Container>
      <InputContainer onSubmit={handleSubmit(onSubmit)}>
        <time> {getDate()}</time>
        <section>
          <Input
            icon={FiEdit2}
            placeholder="Nova Tarefa"
            register={register}
            name="task"
          />
          <Button type="submit">Adicionar</Button>
        </section>
      </InputContainer>
      <TasksContainer>
        {tasks.map((task) => (
          <Card
            key={task._id}
            title={task.description}
            date={task.createdAt}
            onClick={() => handleCompleted(task._id)}
          />
        ))}
      </TasksContainer>
    </Container>
  );
}

export default Dashboard;
