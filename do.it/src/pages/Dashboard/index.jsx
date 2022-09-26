import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Dashboard({ authenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      return navigate("/login");
    }
  }, [authenticated, navigate]);

  return (
    <Container>
      <h1>Dashboard</h1>
    </Container>
  );
}

export default Dashboard;
