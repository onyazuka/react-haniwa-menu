function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import Menu from "./Menu"; // renders single menu item as div

function createMenuItem(item) {
  return React.createElement("div", item.attributes, item.img ? React.createElement("img", {
    src: `${item.img}`
  }) : null, React.createElement("span", null, `${item.text ? item.text : ""}`));
}

export default function createMenu(opts) {
  const {
    activator,
    container,
    menuContainer,
    terminalItemsInfo,
    nonterminalItemsInfo,
    items,
    itemCreator = createMenuItem
  } = opts;
  return React.createElement(Menu, _extends({}, opts, {
    activatorContents: React.createElement(React.Fragment, null, activator.img ? React.createElement("img", {
      src: `${activator.img}`
    }) : null, React.createElement("span", null, `${activator.text ? activator.text : ""}`)),
    activatorAttributes: activator ? activator.attributes : undefined,
    containerAttributes: container ? container.attributes : undefined,
    menuContainerAttributes: menuContainer ? menuContainer.attributes : undefined,
    menuTerminalItemAttributes: terminalItemsInfo ? terminalItemsInfo.attributes : undefined,
    menuNonterminalItemAttributes: nonterminalItemsInfo ? nonterminalItemsInfo.attributes : undefined,
    menuItems: items.map(item => {
      if (!item.items) {
        return itemCreator(item);
      } else {
        return createMenu({
          activator: item.activator,
          container,
          menuContainer,
          terminalItemsInfo,
          nonterminalItemsInfo,
          ...item
        });
      }
    })
  }));
}