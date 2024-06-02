import * as React from "react";
import { Link } from "react-router-dom";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { sections } from "../../helpers/config";

const linkStyle = {
  textDecoration: "inherit",
  color: "inherit",
};

export const items = function (handleTitle) {
  const sectionsArr = Object.entries(sections).slice(1);
  return (
    <React.Fragment>
      {sectionsArr.map((section, i) => (
        <Link key={i} style={linkStyle} to={section[1].link}>
          <ListItemButton onClick={() => handleTitle(section[1].headerTitle)}>
            <ListItemIcon>{section[1].getIcon()}</ListItemIcon>
            <ListItemText primary={section[1].sectionTitle} />
          </ListItemButton>
        </Link>
      ))}
    </React.Fragment>
  );
  // return <h1>Hi</h1>;
};
