import React from 'react';
import createMenu from '../../Menu/MenuFactory';
import './Navbar.css';

function createNavbar(opts) {
  const { activator, items } = opts;
  return createMenu({
    ...opts,
    container: { attributes: { className: "container-nav", }, },
    activator: {
      ...activator,
    },
    menuContainer: { attributes: { className: "submenu-nav", }, },
    terminalItemsInfo: { attributes: { className: "item-nav clickable", }, },
    nonterminalItemsInfo: { attributes: { className: "nonterm-item-nav clickable", }, },
    items,
  });
}

export default function Dashboard(props) {
  return (
    <div className={`${props.type} noselect`}>
    <span className="menu-title-nav">Navbar</span>
    { 
      createNavbar({
        activator: {
          img: "/icons/post.png",
          attributes: { className: "activator-nav item-nav clickable top-level", },
        },
        items: [
          { 
            text: "New", 
            img: "/icons/new.png",
            attributes: {
              id: "new-post",
            }, 
          },
          { 
            activator: {
              text: "All",
              img: "/icons/all.png",
              attributes: {
                id: "read-users",
                className: "activator inner-activator item clickable",
              }
            },
            items: [
              { 
                activator: {
                  text: "New",
                  img: "/icons/new.png",
                  attributes: {
                    id: "read-users",
                    className: "activator inner-activator item clickable",
                  },
                },
                items: [
                  { 
                    text: "Update",
                    img: "/icons/update.png",
                    attributes: {
                      id: "update-posts",
                    }
                  },
                  { 
                    text: "Delete",
                    img: "/icons/delete.png",
                    attributes: {
                      id: "delete-posts",
                    }
                  },
                ],
                activeClassname: "active",
                ...props,
                showAt: "right",
              },
              { 
                text: "Update",
                img: "/icons/update.png",
                attributes: {
                  id: "update-posts",
                }
              },
              { 
                text: "Delete",
                img: "/icons/delete.png",
                attributes: {
                  id: "delete-posts",
                }
              },
            ],
            activeClassname: "active",
            ...props,
            showAt: "right",
          },
          { 
            text: "Update",
            img: "/icons/update.png",
            attributes: {
              id: "update-posts",
            }
          },
          { 
            text: "Delete",
            img: "/icons/delete.png",
            attributes: {
              id: "delete-posts",
            }
          },
        ],
        ...props,
        showAt: "custom",
        customShowPos: {
          top: "100%",
          left: "0%",
        }
    }) }
    { createNavbar({
      activator: {
        img: "/icons/file.png",
        attributes: { className: "activator-nav item-nav clickable top-level", },
      },
      items: [
        { 
          text: "Images",
          img: "/icons/image.png",
          attributes: {
            id:"file-manager-images",
          },
        },
        { 
          text: "Documents", 
          img: "/icons/document.png",
          attributes: {
            id:"file-manager-documents",
          },
        },
        { 
          text: "Videos", 
          img: "/icons/video.png",
          attributes: {
            id:"file-manager-videos",
          },
        },
      ],
      ...props,
      showAt: "custom",
        customShowPos: {
          top: "100%",
          left: "0%",
        }
    }) }
    { createNavbar({
      activator: {
        img: "/icons/user.png",
        attributes: { className: "activator-nav item-nav clickable top-level", },
      },
      items: [
        { 
          text: "All",
          img: "/icons/all.png",
          attributes: {
            id: "read-users",
          }
        },
      ],
      ...props,
      showAt: "custom",
        customShowPos: {
          top: "100%",
          left: "0%",
        }
    }) }
    { createNavbar({
      activator: {
        img: "/icons/stats.png",
        attributes: { className: "activator-nav item-nav clickable top-level", },
      },
      items: [
        { 
          text: "Day",
          attributes: {
            id: "stats-day",
          }
        },
        { 
          text: "Week",
          attributes: {
            id: "stats-day",
          }
        },
        { 
          text: "Month",
          attributes: {
            id: "stats-day",
          }
        },
      ],
      ...props,
      showAt: "custom",
        customShowPos: {
          top: "100%",
          left: "0%",
        }
    }) }
  </div>
  );
}