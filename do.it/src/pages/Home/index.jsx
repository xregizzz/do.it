import { Container, Content } from "./styles";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

function Home({ authenticated }) {
  const navigate = useNavigate();

  if (authenticated) {
    return navigate("/dashboard");
  }

  function handleNavigation(path) {
    return navigate(path);
  }

  return (
    <Container>
      <Content>
        <h1>
          do<span>.</span>it
        </h1>
        <p className="sub__title">Organize-se de forma fácil e efetiva</p>
        <div>
          <Button onClick={() => handleNavigation("/signup")} whiteSchema>
            Cadastre-se
          </Button>
          <Button onClick={() => handleNavigation("/login")}>Login</Button>
        </div>
      </Content>
    </Container>
  );
}

export default Home;
