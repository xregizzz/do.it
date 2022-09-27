import { Container } from "./styles";
import { FiClipboard, FiCalendar } from "react-icons/fi";
import Button from "../../components/Button";

function Card({ title, date, onClick }) {
  return (
    <Container>
      <span>
        <FiClipboard /> {title}
      </span>
      <hr />
      <time>
        <FiCalendar /> {date}
      </time>
      <Button onClick={onClick}>Concluir</Button>
    </Container>
  );
}

export default Card;
