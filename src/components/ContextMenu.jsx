import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function ContextMenu({options}) {
  const [contextMenu, setContextMenu] = React.useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
          }
        : 
          null,
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  return (
    <Box onContextMenu={handleContextMenu} style={{ cursor: 'context-menu' }}>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        {
            options.map(option =>
                <MenuItem onClick={option.func}>{option.text}</MenuItem>
            )
        }
      </Menu>
    </Box>
  );
}