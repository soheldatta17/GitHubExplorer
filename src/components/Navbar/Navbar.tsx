import "./Navbar.css";
import { useState } from "react";
import { ImCross } from "react-icons/im";

function Navbar() {
  const [navlinksvalue, setnavlinks] = useState("navlinks");

  const navbarActive = () => {
    if (navlinksvalue === "navlinks") {
      setnavlinks("navlinks activenavlinks");
    } else {
      setnavlinks("navlinks");
    }
  };

  return (
    <>
      <nav style={{marginTop: "4px"}}>
        <a href="/">
          <div className="navlogo">
            <img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" />
            <h1>GitExplorer</h1>
          </div>
        </a>
        {navlinksvalue === "navlinks" ? (
          <div className="hamberger" onClick={navbarActive}>
            <div className="ham-lines"></div>
            <div className="ham-lines"></div>
            <div className="ham-lines"></div>
          </div>
        ) : (
          <div className="hamberger" onClick={navbarActive}>
            <ImCross className="cross-icon" />
          </div>
        )}
        <div className={navlinksvalue}>
          <a href="/">Home</a>
          <a href="https://portfolio-steel-seven-84.vercel.app" target="_blank">
            Developer
          </a>
          <a>
            Repostiory
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
