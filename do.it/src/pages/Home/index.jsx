import { Container, Content } from "./styles";

function Home() {
  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <p>Organize-se de forma fácil e efetiva</p>
        <div>
          <button>Cadastre-se</button>
          <button>Login</button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
