import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Signup({ authenticated }) {
  const schema = yup.object().shape({
    name: yup.string().required("Campo Obrigatorio!"),
    email: yup.string().email("Email invalido").required("Campo Obrigatorio!"),
    password: yup
      .string()
      .min(8, "Minimo de 8 digitos")
      .required("Campo Obrigatorio!"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password")], "Senhas nao conferem")
      .required("Campo obrigatorio!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  if (authenticated) {
    return navigate("/dashboard");
  }

  function onSubmitFunction({ name, email, password }) {
    const user = { name, email, password };
    api
      .post("/user/register", user)
      .then((_) => {
        toast.success("Sucesso ao criar a conta!");
        return navigate("/login");
      })
      .catch((_) => toast.error("Erro ao criar a conta, tente outro email"));
  }

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Cadastro</h1>
            <Input
              error={errors.name?.message}
              register={register}
              name="name"
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome"
              type="text"
            />
            <Input
              error={errors.email?.message}
              register={register}
              name="email"
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              type="text"
            />
            <Input
              error={errors.password?.message}
              register={register}
              name="password"
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
            />
            <Input
              error={errors.passwordConfirm?.message}
              register={register}
              name="passwordConfirm"
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmção de senha"
              type="password"
            />
            <Button type="submit">Enviar</Button>
            <p>
              Já tem uma conta? Faça seu <Link to="/login">login</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
    </Container>
  );
}

export default Signup;
