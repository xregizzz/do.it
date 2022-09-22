import { Container, Background, Content, AnimationContainer } from "./styles";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

function Signup() {
  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <form action="">
            <h1>Cadastro</h1>
            <Input
              icon={FiUser}
              label="Nome"
              placeholder="Seu nome"
              type="text"
            />
            <Input
              icon={FiMail}
              label="Email"
              placeholder="Seu melhor email"
              type="text"
            />
            <Input
              icon={FiLock}
              label="Senha"
              placeholder="Uma senha bem segura"
              type="password"
            />
            <Input
              icon={FiLock}
              label="Confirmação da senha"
              placeholder="Confirmção de senha"
              type="password"
            />
            <Button>Enviar</Button>
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
