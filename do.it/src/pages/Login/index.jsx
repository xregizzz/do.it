import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import api from "../../services/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login({ authenticated, setAuthenticated }) {
  const schema = yup.object().shape({
    email: yup.string().email("Email invalido").required("Campo Obrigatorio!"),
    password: yup.string().required("Campo Obrigatorio!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  function onSubmitFunction(data) {
    api
      .post("/user/login", data)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("@Doit:token", JSON.stringify(token));

        setAuthenticated(true);

        return navigate("/dashboard");
      })
      .catch((_) => toast.error("Email ou senha invalidos, tente novamente"));
  }

  useEffect(() => {
    if (authenticated) {
      return navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, navigate]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <form onSubmit={handleSubmit(onSubmitFunction)}>
            <h1>Login</h1>
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
            <Button type="submit">Enviar</Button>
            <p>
              N??o possui uma conta? Fa??a seu <Link to="/signup">cadastro</Link>
            </p>
          </form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}

export default Login;
