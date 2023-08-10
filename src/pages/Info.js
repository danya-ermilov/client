import { Link } from "react-router-dom";
import { Container, Image } from "react-bootstrap";

const Info = () => {
  return (
    <Container>
      <h1>botogInvest - Discover and Share Trading Strategies</h1>
      <p>
        At botogInvest, we offer you a unique platform to share and explore
        trading strategies for financial markets. Whether you are an experienced
        trader or a newcomer seeking new ideas, our website is designed to cater
        to all your trading needs.
      </p>
      <h3 style={{ color: "OrangeRed" }}>Publish Your Trading Strategies</h3>
      <p>
        Share your successful trading strategies with our community by uploading
        your ZIP file containing the detailed trading plan, charts, and
        analysis. Additionally, you can provide a link to your external
        resources for further reference. By publishing your strategies, you can
        help others learn from your expertise and foster a collaborative trading
        environment.
      </p>
      <Image
        width={1100}
        height={500}
        src={process.env.REACT_APP_IMG_URL + "first_art.jpg"}
      />
      <h3 style={{ color: "OrangeRed" }}>Discover a Variety of Strategies</h3>
      <p>
        Explore a wide range of trading strategies contributed by experienced
        traders from different markets. Analyze their effectiveness, understand
        their methodologies, and gain insights into the diverse approaches used
        in financial trading. Our platform enables you to learn from the best
        and enhance your own trading skills.
      </p>
      <Image
        width={1100}
        height={500}
        src={process.env.REACT_APP_IMG_URL + "second_art.jpg"}
      />
      <h3 style={{ color: "OrangeRed" }}>Evaluate and Comment</h3>
      <p>
        Rate and review the published strategies to help others make informed
        decisions. Provide constructive feedback and share your thoughts on the
        performance and applicability of the strategies. By engaging in
        discussions, you can actively contribute to the community and receive
        valuable insights from fellow traders.
      </p>
      <Image
        width={1100}
        height={500}
        src={process.env.REACT_APP_IMG_URL + "third_art.jpg"}
      />
      <h3 style={{ color: "OrangeRed" }}>Join Our Trading Community</h3>
      <p>
        Register now to become part of our active trading community. Share your
        own strategies, engage in discussions, and collaborate with traders
        worldwide. botogInvest is the ideal place for traders of all levels to
        learn, grow, and exchange knowledge in the exciting world of financial
        markets.
      </p>
      <Image
        width={1100}
        height={500}
        src={process.env.REACT_APP_IMG_URL + "fourth_art.jpg"}
      />
      <br />
      <Link to="/signup" style={{ color: "Blue" }}>
        Register now!
      </Link>
      <h5>Remember, your success is our priority. Happy trading!</h5>
      <footer>
        <div>
          <p>
            &copy; 2023 botogInvest. All rights reserved. For any questions,
            contact us on{" "}
            <a href="https://t.me/Daniil_tel" target="_blank" rel="noreferrer">
              Telegram
            </a>
            .
          </p>
        </div>
      </footer>
    </Container>
  );
};

export default Info;
