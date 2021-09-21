import * as ROUTES from "./constants/routes";
import { Link } from "react-router-dom";
import { useMainContext } from "../context/MainContext";
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faHome,
  faQuestion,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const StyledNav = styled.nav`
    ul {
    z-index: 10;
    padding: 10px;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: black;
    border: 5px solid green;
  }
  li {
    list-style: none;
    margin: 5px 10px;
    padding: 5px;
    font-size: 1.2rem;
  }

  li a {
    text-decoration: none;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  li p {
    text-align: center;
    color: white;
    margin-top: 10px;
    font-size: 14px;
  }

  li:hover a {
    text-decoration: underline;
  }

  @media (min-width: 700px) {
    ul {
      top: 0;
      bottom: auto;
    }
  }
`;

const Navigation = () => {
  const { currentUser } = useMainContext();

  return (currentUser && (
    <StyledNav>
      <ul>
        <li>
          <Link to={ROUTES.DASHBOARD}>
            <FontAwesomeIcon icon={faHome} />
            <p>Annonser</p>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ADD}>
            <FontAwesomeIcon icon={faPlus} />
            <p>Annons</p>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>
            <FontAwesomeIcon icon={faQuestion} />
            <p>Hur funkar det?</p>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.PROFILE}>
            <FontAwesomeIcon icon={faUser} />
            <p>Profil</p>
          </Link>
        </li>
      </ul>
    </StyledNav>
  )
  );
};

export default Navigation;
