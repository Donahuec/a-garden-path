import React, { useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { Map, Home, Info, ScrollText } from "lucide-react";
import { default as Dragon } from "../assets/dragon.svg";
import {
  surface,
  navbar,
  siteLink,
  siteTitle,
  content,
  navButton,
  navMenu,
  navMenuItem,
  navMenuTitle,
  triangle,
  open,
  container,
} from "./layout.module.css";

const Layout = ({ pageTitle, children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  function tabbable() {
    return menuOpen ? "0" : "-1";
  }

  return (
    <div className={container}>
      <button className={navButton} onClick={() => setMenuOpen(!menuOpen)}>
        <img src={Dragon} alt="dragon logo" />
      </button>
      <span
        id="nav-triangle"
        className={`${triangle} ${menuOpen ? open : ""}`}
      ></span>
      <nav
        id="nav-menu"
        className={`${navMenu} ${menuOpen ? open : ""}`}
        aria-hidden={!menuOpen}
      >
        <Link to="/" className={navMenuItem} tabIndex={tabbable()}>
          <Home size={24} />
          <span className={navMenuTitle}>Home</span>
        </Link>
        <Link to="/notes/atlas" className={navMenuItem} tabIndex={tabbable()}>
          <Map size={24} />
          <span className={navMenuTitle}>Atlas</span>
        </Link>
        <Link to="/about" className={navMenuItem} tabIndex={tabbable()}>
          <Info size={24} />
          <span className={navMenuTitle}>About</span>
        </Link>
        <Link to="/notes" className={navMenuItem} tabIndex={tabbable()}>
          <ScrollText size={24} />
          <span className={navMenuTitle}>Notes</span>
        </Link>
      </nav>
      <nav className={navbar}>
        <div className={siteTitle}>{data.site.siteMetadata.title}</div>
        <Link to="/" className={siteLink}>
          <Home /> Home
        </Link>
        <Link to="/notes/atlas" className={siteLink}>
          <Map />
          Atlas
        </Link>
        <Link to="/about" className={siteLink}>
          <Info />
          About
        </Link>
        <Link to="/notes" className={siteLink}>
          <ScrollText />
          Notes
        </Link>
      </nav>
      <main className={`${surface} ${content}`}>{children}</main>
    </div>
  );
};

export default Layout;
