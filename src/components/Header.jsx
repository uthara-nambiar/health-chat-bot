import React from "react";
import bot from "../assets/Icons/bot.png";

function Header() {
  return (
    <>
      <div className="header-image">
        <img
          src={bot}
          style={{
            width: "25px",
            height: "25px",
            borderRadius: "50%",
            marginTop: "4px",
            marginLeft: "4px",
            marginRight: "4px",
          }}
        />
      </div>
      <div className="header-text">
        <div>MediBot</div>
        <div style={{ fontSize: "x-small", fontFamily: "monospace", color: "gray" }}>
          Online
        </div>
      </div>
    </>
  );
}

export default Header;
