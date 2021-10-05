import * as ROUTES from "./constants/routes";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
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
    font-family: 'Roboto';
    z-index: 10;
    padding: 10px;
    overflow: hidden;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
    background-color: black;
  }

  .img-wrapper {
    position: absolute;
  }

  ul img {
    display: none;
    height: 50px;
    cursor: pointer;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    margin: 5px 5px;
    padding: 5px;
    font-size: 1rem;
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
    font-size: 12px;
  }

  li:hover a {
    text-decoration: underline;
  }

  /* ============== Desktop view ============== */

  @media (min-width: 700px) {
    ul {
      top: 0;
      bottom: auto;
    }

    .img-wrapper {
      position: relative;
      flex-grow: 1;
    }

    ul img {
    display: block;
    height: 50px;
    }

    li a {
      outline: 1px solid white;
      border-radius: 3px;
      padding: 8px;
      flex-direction: row;
    }

    li p {
    font-size: 16px;
    margin: 0;
    padding:0;

    }
    li svg {
      font-size: 12px;
      margin-right: 5px;
    /* display: none; */
    }
  }
`;

const Navigation = () => {
  const { currentUser } = useMainContext();
  const history = useHistory();

  const toStartPage = () => {
    history.push('/')
  }

  return (currentUser && (
    <StyledNav>
      <ul>
        <div className="img-wrapper">
          <img src="/img/logo.png" alt="logo" onClick={toStartPage} />
        </div>
        <li>
          <Link to={ROUTES.DASHBOARD}>
            <FontAwesomeIcon icon={faHome} />
            <p>Annonser</p>
          </Link>
        </li>
        <li>
          <Link to={ROUTES.NEWAD}>
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
