import React from 'react';
import Menu from '../../Menu/Menu';
import './App.css';

const menuProps = {
  activeClassname: "active",
  containerAttributes: { className: "container", },
  activatorAttributes: { className: "activator item clickable", },
  menuContainerAttributes: { className: "submenu" },
  menuTerminalItemAttributes: { className: "item clickable", },
  menuNonterminalItemAttributes: { className: "clickable", },
};

function createMenuItem(item) {
  return ( 
    <div {...item.attributes}>
      { item.img ? <img src={`${item.img}`}></img> : null }
      <span>{`${item.text ? item.text : ""}`}</span>
    </div>
  );
}
export default function MultilevelDashboard(props) {
  return (
    <div className={`${props.type} noselect`}>
    <h2 className="menu-title">Dashboard</h2>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/post.png", text: "Posts",})}
      menuItems={[
        createMenuItem({  text: "New", img: "/icons/new.png", attributes: { id: "new-post", },  }),
        <Menu
          {...menuProps}
          activatorContents={createMenuItem({ img: "/icons/all.png", text: "All",})}
          menuItems={[
            <Menu
              {...menuProps}
              activatorContents={createMenuItem({ img: "/icons/new.png", text: "New",})}
              menuItems={[
                createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
                createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
              ]}
              {...props}
            >
            </Menu>,
            createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
            createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
          ]}
          {...props}
        >
        </Menu>,
        createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
        createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
      ]}
      {...props}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/file.png", text: "Files",})}
      menuItems={[
        createMenuItem({  text: "Images", img: "/icons/image.png", attributes: { id: "file-manager-images", },  }),
        createMenuItem({  text: "Documents", img: "/icons/document.png", attributes: { id: "file-manager-documents", },  }),
        createMenuItem({  text: "Videos", img: "/icons/video.png", attributes: { id: "file-manager-videos", },  }),
      ]}
      {...props}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/user.png", text: "Users" })}
      menuItems={[
        createMenuItem({  text: "All", img: "/icons/all.png", attributes: { id: "read-users", },  }),

      ]}
      {...props}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/stats.png", text: "Statistics",})}
      menuItems={[
        createMenuItem({  text: "Day", attributes: { id: "stats-day", },  }),
        createMenuItem({  text: "Week", attributes: { id: "stats-week", },  }),
        createMenuItem({  text: "Month", attributes: { id: "stats-month", },  }),
      ]}
      {...props}
    >
    </Menu>

    </div>
  );
}