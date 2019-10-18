import React from 'react';
import createMenu from '../../Menu/MenuFactory';
import './App.css';

function createAdminDashboardMenu(opts) {
  const { activator, items } = opts;
  return createMenu({
    ...opts,
    container: { attributes: { className: "container", }, },
    activator: {
      ...activator,
      attributes: {
        ...activator.attributes,
        className: "activator item clickable",
      },
    },
    menuContainer: { attributes: { className: "submenu", }, },
    terminalItemsInfo: { attributes: { className: "item clickable", }, },
    nonterminalItemsInfo: { attributes: { className: "clickable", }, },
    items,
  });
}

export default function Dashboard(props) {
  return (
    <div className={`${props.type} noselect`}>
    <h2 className="menu-title">Dashboard</h2>
    { 
      createAdminDashboardMenu({
      activator: {
        img: "/icons/post.png",
        text: "Posts",
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
          text: "All",
          img: "/icons/all.png",
          attributes: {
            id: "read-posts",
          }
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
    }) }
    { createAdminDashboardMenu({
      activator: {
        img: "/icons/file.png",
        text: "Files",
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
    }) }
    { createAdminDashboardMenu({
      activator: {
        img: "/icons/user.png",
        text: "Users",
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
    }) }
    { createAdminDashboardMenu({
      activator: {
        img: "/icons/stats.png",
        text: "Statistics",
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
    }) }
  </div>
  );
}