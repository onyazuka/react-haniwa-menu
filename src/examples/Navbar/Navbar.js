import React from 'react';
import Menu from '../../Menu/Menu';
import './Navbar.css';


const menuProps = {
  activatorAttributes: { className: "activator-nav item-nav clickable top-level", },
  containerAttributes: { className: "container-nav", },
  menuContainerAttributes: { className: "submenu-nav" },
  menuTerminalItemAttributes: { className: "item-nav clickable", },
  menuNonterminalItemAttributes: { className: "nonterm-item-nav clickable", },
};

function createMenuItem(item) {
  return ( 
    <div {...item.attributes}>
      { item.img ? <img src={`${item.img}`}></img> : null }
      <span>{`${item.text ? item.text : ""}`}</span>
    </div>
  );
}

export default function Navbar(props) {
  return (
    <div className={`${props.type} noselect`}>
    <span className="menu-title-nav">Navbar</span>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/post.png" })}
      menuItems={[
        createMenuItem({  text: "New", img: "/icons/new.png", attributes: { id: "new-post", },  }),
        <Menu
          {...menuProps}
          activatorContents={createMenuItem({ img: "/icons/all.png", text: "All",})}
          activatorAttributes={{ className: "activator inner-activator item clickable", }}
          menuItems={[
            <Menu
              {...menuProps}
              activatorContents={createMenuItem({ img: "/icons/new.png", text: "New",})}
              activatorAttributes={{ className: "activator inner-activator item clickable", }}
              menuItems={[
                createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
                createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
              ]}
              {...props}
              showAt="right"
            >
            </Menu>,
            createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
            createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
          ]}
          {...props}
          showAt="right"
        >
        </Menu>,
        createMenuItem({  text: "Update", img: "/icons/update.png", attributes: { id: "update-posts", },  }),
        createMenuItem({  text: "Delete", img: "/icons/delete.png", attributes: { id: "delete-posts", },  }),
      ]}
      {...props}
      showAt="custom"
      customShowPos={{
        top: "100%",
        left: "0%",
      }}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/file.png" })}
      menuItems={[
        createMenuItem({  text: "Images", img: "/icons/image.png", attributes: { id: "file-manager-images", },  }),
        createMenuItem({  text: "Documents", img: "/icons/document.png", attributes: { id: "file-manager-documents", },  }),
        createMenuItem({  text: "Videos", img: "/icons/video.png", attributes: { id: "file-manager-videos", },  }),
      ]}
      {...props}
      showAt="custom"
      customShowPos={{
        top: "100%",
        left: "0%",
      }}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/user.png" })}
      menuItems={[
        createMenuItem({  text: "All", img: "/icons/all.png", attributes: { id: "read-users", },  }),

      ]}
      {...props}
      showAt="custom"
      customShowPos={{
        top: "100%",
        left: "0%",
      }}
    >
    </Menu>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/stats.png" })}
      menuItems={[
        createMenuItem({  text: "Day", attributes: { id: "stats-day", },  }),
        createMenuItem({  text: "Week", attributes: { id: "stats-week", },  }),
        createMenuItem({  text: "Month", attributes: { id: "stats-month", },  }),
      ]}
      {...props}
      showAt="custom"
      customShowPos={{
        top: "100%",
        left: "0%",
      }}
    >
    </Menu>

    </div>
  );
}