"use client";
import { SxProps } from "@mui/material";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "@mui/material/styles";
import { useState, MouseEvent } from "react";

type RoomMenuProps = {
  text: string;
  roomCount: number;
  stats?: boolean;
  sx?: SxProps<Theme>;
};

const RoomMenu = ({ text, roomCount, stats, sx }: RoomMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const route = stats ? "stats" : "scores";

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getMenuItems = () => {
    const items = [];
    for (let i = 0; i < roomCount; i++) {
      items.push(
        <MenuItem
          key={i + 1}
          onClick={() => (window.location.href = `/toasties/${route}/${i + 1}`)}
        >
          Room {i + 1}
        </MenuItem>,
      );
    }
    if (stats)
      items.push(
        <MenuItem
          key="combined"
          onClick={() => (window.location.href = `/toasties/${route}`)}
        >
          Combined
        </MenuItem>,
      );
    return items;
  };

  return (
    <div>
      <Button
        id="header-button"
        aria-controls={open ? "rooms-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
        color="secondary"
        sx={sx}
      >
        {text}
      </Button>
      <Menu
        id="rooms-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {getMenuItems()}
      </Menu>
    </div>
  );
};

export default RoomMenu;
