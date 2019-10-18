import React from 'react';
import Menu from "./Menu";

// renders single menu item as div
function createMenuItem(item) {
  return ( 
    <div {...item.attributes}>
      { item.img ? <img src={`${item.img}`}></img> : null }
      <span>{`${item.text ? item.text : ""}`}</span>
    </div>
  );
}

export default function createMenu(opts) {
  const { activator, container, menuContainer, terminalItemsInfo, nonterminalItemsInfo, items, itemCreator=createMenuItem } = opts;
  return (
    <Menu
      {...opts}
      activatorContents={
        <>
          { activator.img ? <img src={`${activator.img}`}></img> : null }
          <span>{`${activator.text ? activator.text : ""}`}</span>
        </>
      }
      activatorAttributes={activator ? activator.attributes : undefined}
      containerAttributes={container ? container.attributes : undefined}
      menuContainerAttributes={menuContainer ? menuContainer.attributes : undefined}
      menuTerminalItemAttributes={terminalItemsInfo ? terminalItemsInfo.attributes : undefined}
      menuNonterminalItemAttributes={nonterminalItemsInfo ? nonterminalItemsInfo.attributes : undefined}
      menuItems={
        items.map(item => {
          if(!item.items) {
            return itemCreator(item);
          }
          else {
            return createMenu({
              activator: item.activator,
              container,
              menuContainer,
              terminalItemsInfo,
              nonterminalItemsInfo,
              ...item,
            });
          }
        })
      }
    >
    </Menu>
  );
}