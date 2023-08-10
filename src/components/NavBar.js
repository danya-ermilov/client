import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
//import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./AppContext.js";
import { useContext } from "react";
import { observer } from "mobx-react-lite";
import CheckAuth from "./CheckAuth.js";
import FetchBasket from "./FetchBasket.js";
//{!!basket.count && <span>({basket.count})</span>}
const NavBar = observer(() => {
  const { user } = useContext(AppContext);
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">
          botogInvest
        </NavLink>
        <Nav className="ml-auto">
          <CheckAuth>
            {user.isAuth ? (
              <>
                <NavLink to="/market" className="nav-link">
                  market
                </NavLink>
                <NavLink to="/news" className="nav-link">
                  news
                </NavLink>
                <NavLink to="/user" className="nav-link">
                  account
                </NavLink>
                <FetchBasket>
                  <NavLink to="/basket" className="nav-link">
                    favorietes
                  </NavLink>
                </FetchBasket>
              </>
            ) : (
              <>
                <NavLink to="/market" className="nav-link">
                  market
                </NavLink>
                <NavLink to="/info" className="nav-link">
                  info
                </NavLink>
                <NavLink to="/login" className="nav-link">
                  log in
                </NavLink>
                <NavLink to="/signup" className="nav-link">
                  sign up
                </NavLink>
              </>
            )}
            {user.isAdmin && (
              <NavLink to="/admin" className="nav-link">
                admin
              </NavLink>
            )}
          </CheckAuth>
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
