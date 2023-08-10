import Container from "react-bootstrap/Container";
import CreateNews from "../components/CreateNews";
import { get as fetchNews } from "../http/newsAPI.js";
import { useEffect, useState } from "react";

const News = () => {
  const [text, setText] = useState(null);
  const [time, setTime] = useState(null);
  useEffect(() => {
    fetchNews().then((data) => {
      setText(data.text);
      setTime(data.createdAt.slice(0, 10));
    });
  }, []);
  return (
    <Container>
      <h2>News</h2>
      <p style={{ wordWrap: "break-word", width: "auto" }}>
        {text}
        <br />
        {time}
      </p>
      <CreateNews />
    </Container>
  );
};

export default News;
