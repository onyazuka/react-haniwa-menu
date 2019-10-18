## React menu
Highly customizable menu component for React.

With it you can create all kinds of menu!

## Installation 
npm i react-haniwa-menu

## Live Demo
https://onyazuka.github.io/ 

## Features
- Clear and convenient for customization menu structure;
- Multilevel menu support;
- Can appear on close or on hover;
- Can disappear on close on activator element, on close outside or on hover ouside;
- Close timeout;
- Highly customizable menu position;
- Open and close animations;
- And much more...

## Menu structure
Let's look how our multilevel menu will look inside.
It has similiar structure:
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

Activator is an element by clicking on which menu is rendered.

## Usage examples 
Please look src/examples

## Basic menu creation
You can use createMenu function from MenuFactory to create multilevel menu. 
You can create a simple multilevel menu like this:
```javascript
// simple facade to not write same classes each time we need to create a menu
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
        },
...
```
You can also provide different menu creating functions to the createMenu() factory.

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
| showAt | position where menu will be showed: "left" - on left side, "right" - on right side, "cursor" - on click place, "natural" - just adds menu in dom, sometimes it can be used, for example, for dashboards, "custom" - custom relative to container position, described by customShowPos prop | "left", "right", "cursor", "natural", "custom" | "natural" |
| customShowPos | custom position for case when "showAt" is "custom" | object like { "top": "50%", "left": "50%", } | |
| defaultShow | show the menu by default | bool | false |
| closeOn | type of event on which the menu will be closed | "none", "click", "hover" | "none" |
| closeTimeout | timeout before the menu will really be closed, can be used only with "hover" | number | 0 |
| closeImmediatelyOnHoverOnAnotherMenuItem | can be useful if using 'closeOn' = 'hover' with timeoutm showAt = 'hover' | bool | false |
| closeImmediatelyOnClickOnAnotherMenuItem | can be useful if using 'closeOn' = 'hover' with timeout, showAt = 'click' | bool | false |
| openAnimation | menu open animation | func | |
| close Animation | menu close animation | func | | 

## Animations
You can find some basic animations in MenuAnimations.js. You can also write your own. It is quite simple - animation function accepts two arguments: element itself and onFinish callback. They should call this callback when all the work is finished.




