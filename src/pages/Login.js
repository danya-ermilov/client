import { AppContext } from "../components/AppContext.js";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Card, Form, Button } from "react-bootstrap";
import { login } from "../http/userAPI.js";
import { observer } from "mobx-react-lite";

const Login = observer(() => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  // если пользователь авторизован — ему здесь делать нечего
  useEffect(() => {
    if (user.isAdmin) navigate("/admin", { replace: true });
    if (user.isAuth) navigate("/user", { replace: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.login.value.trim();
    const password = event.target.password.value.trim();
    const data = await login(email, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate("/admin");
      if (user.isAuth) navigate("/user");
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: "50%" }} className="p-2 mt-5 bg-light">
        <h3 className="m-auto">authorization</h3>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control
            name="login"
            className="mt-3"
            placeholder="enter the login..."
          />
          <Form.Control
            name="password"
            className="mt-3"
            placeholder="enter the password..."
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button type="submit">log in</Button>
            <p>
              Does not have an account yet?
              <Link to="/signup">Register!</Link>
            </p>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Login;
