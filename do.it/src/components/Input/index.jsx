import { Container, InputContainer } from "./styles";

function Input({ label, icon: Icon, ...rest }) {
  return (
    <Container>
      <div>{label}</div>
      <InputContainer>
        {Icon && <Icon />}
        <input {...rest} />
      </InputContainer>
    </Container>
  );
}

export default Input;
