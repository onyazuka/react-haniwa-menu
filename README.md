## React menu
Highly customizable menu component for React.

With it you can create any kind of menu!

## Installation 
npm i react-haniwa-menu

## Live Demo
https://onyazuka.github.io/ 

## Features
- Clear and convenient menu structure;
- Multilevel menu support;
- Can appear on close or on hover;
- Can disappear on close on activator element, on close outside or on hover ouside;
- Close timeout;
- Customizable menu position;
- Open and close animations;
- And much more...

## Menu structure
The created menu will have similiar structure:
- Container
  - Activator
  - Menu container
    - Item 1(terminal)
    - Item 2(terminal)
    - Item 3(nonterminal)
      - Container
        - Activator
        - Menu container
          - Item 5(terminal)
          - Item 6(terminal)
    - Item 7(terminal)
    ...

'Activator' is the element that should be clicked to show/hide the menu.

## Usage examples 
Please look src/examples

## Basic menu creation
You can create a very basic single level menu like this:
```javascript
import React from 'react';
import Menu from 'react-haniwa-menu';

// common props for all submenus
const menuProps = {
  activeClassname: "active",
  containerAttributes: { className: "container", },
  activatorAttributes: { className: "activator item clickable", },
  menuContainerAttributes: { className: "submenu" },
  menuTerminalItemAttributes: { className: "item clickable", },
  menuNonterminalItemAttributes: { className: "clickable", },
};

// here we are creating a single menu item
function createMenuItem(item) {
  return ( 
    <div {...item.attributes}>
      { item.img ? <img src={`${item.img}`}></img> : null }
      <span>{`${item.text ? item.text : ""}`}</span>
    </div>
  );
}
export default function Dashboard(props) {
  return (
    <div className={`${props.type} noselect`}>
    <h2 className="menu-title">Dashboard</h2>
    <Menu
      {...menuProps}
      activatorContents={createMenuItem({ img: "/icons/post.png", text: "Posts",})}
      menuItems={[
        createMenuItem({  text: "New", img: "/icons/new.png", attributes: { id: "new-post", },  }),
        createMenuItem({  text: "All", img: "/icons/all.png", attributes: { id: "read-posts", },  }),
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
  	...
    </div>
  );
}

```

And how about multilevel menu? You can just use Menu component as a menu item. It is as simple as this:
```javascript
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

```

## Props

| Prop | Description | Acceptable values | Default |
| --- | --- | --- | --- |
| activeClassname | Class name that will be added to the currently active container | string | "" |
| activatorAttributes | | object | {} |
| activatorContents | Node that will be drawn as activator  | node | |
| containerAttributes | | object | {} |
| menuItems | | array of nodes | |
| menuContainerAttributes | | object | {} |
| menuTerminalItemAttributes | | object | {} |
| menuNonterminalItemAttributes | | object | {} |
| activateOn | type of event on which the menu will be activated | "click", "hover" | "click" |
| onShow | function that will be called on the menu shown | func | |
| onClose | function that will be called on the menu closed | func | |
| showAt | position where menu will be shown: "left" - on left side, "right" - on right side, "cursor" - on click place, "natural" - just adds menu in dom, sometimes it can be used, for example, for dashboards, "custom" - custom relative to container position, described by customShowPos prop | "left", "right", "cursor", "natural", "custom" | "natural" |
| customShowPos | custom position for case when "showAt" is "custom" | object like { "top": "50%", "left": "50%", } | |
| defaultShow | show the menu by default | bool | false |
| closeOn | type of event on which the menu will be closed | "none", "click", "hover" | "none" |
| closeTimeout | timeout before the menu will really be closed, can be used only with "hover" | number | 0 |
| closeImmediatelyOnHoverOnAnotherMenuItem | can be useful if using 'closeOn' = 'hover' with timeoutm showAt = 'hover' | bool | false |
| closeImmediatelyOnClickOnAnotherMenuItem | can be useful if using 'closeOn' = 'hover' with timeout, showAt = 'click' | bool | false |
| openAnimation | menu open animation | func | |
| close Animation | menu close animation | func | | 

## Animations
You can find some basic animations in MenuAnimations.js. You can also write your own ones. It is quite simple - animation function accepts two arguments: element itself and onFinish callback. It should call this callback when all work is finished.

All available animations can be obtained with:
```javascript
import {MenuAnimations} from 'react-haniwa-menu';
```




