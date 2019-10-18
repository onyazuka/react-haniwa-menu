import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useClickedOutside, useHoveredOutside } from '../Hooks';

// set element's 'elem' position at 'coords'
function positionElementAt(elem, coords) {
    elem.style.position = "absolute";
    ["left", "right", "top", "bottom"].forEach(coord => {
      if(coords[coord]) elem.style[coord] = coords[coord];
      else elem.style[coord] = "";
    });
}

function cancelPositionElementAt(elem) {
  elem.style.position = "";
  elem.style.left = "";
  elem.style.top = "";
  elem.style.right = "";
  elem.style.bottom = "";
}

/*
  Builds menu.
*/
export default function Menu(props) {
  const { activeClassname, activatorAttributes, activatorContents, containerAttributes,
     menuItems, menuContainerAttributes, menuTerminalItemAttributes, menuNonterminalItemAttributes,
     activateOn, onShow, onClose, showAt, customShowPos, defaultShow,
     closeOn, closeTimeout, closeImmediatelyOnHoverOnAnotherMenuItem,
     closeImmediatelyOnClickOnAnotherMenuItem,
      openAnimation, closeAnimation } = props;

  const container = useRef(null);
  const activator = useRef(null);
  const menu = useRef(null);
  const [active, setActive] = useState(defaultShow);
  useClickedOutside(
    container, 
    closeOn === "click" || (closeOn === 'hover' && closeImmediatelyOnClickOnAnotherMenuItem) ? deactivate : () => {},
    );
  // we should not use hoveredOutside if menu is not active
  useHoveredOutside(
    container, 
    active && (closeOn === "hover") || ((closeOn === 'click') && closeImmediatelyOnHoverOnAnotherMenuItem) ? deactivate : () => {}, 
    closeTimeout, 
    closeImmediatelyOnHoverOnAnotherMenuItem ? [activatorAttributes.className, containerAttributes.className] : [],
  );

  function positionMenuAt(event) {
    if(!container.current) return;
    switch (showAt) {
    case "natural":
      {
        cancelPositionElementAt(menu.current);
        break;
      }
    case "left": 
      positionElementAt(menu.current, {
        top: "0",
        right: "100%",
      });
      break;
    case "right":
    {
      positionElementAt(menu.current, {
        top: "0",
        left: "100%",
      });
      break;
    }
    case "cursor": {
      if(!event) {
        throw new Error("WARNING! Menu 'cursor' position has no sense with 'defaultShow' = true");
      }
      const contRect = container.current.getBoundingClientRect();
      positionElementAt(menu.current, {
        left: (event.clientX - contRect.left) + "px",
        top: (event.clientY - contRect.top) + "px",
      });
      break;
    }
    case "custom":
      positionElementAt(menu.current, {
        ...customShowPos,
      });
      break;
    default:  // natural
      // stays in dom
      return; 
    }
  }

  function activate(event) {
    positionMenuAt(event);
    menu.current.style.display = "";
    if(menu.current && openAnimation) openAnimation(menu.current);
    if(activeClassname) container.current.classList.add(activeClassname);
    setActive(true);
    if (onShow) onShow();
  }

  function deactivate() {
    function onEnd () {
      // callback, so current may already not exist when calling this
      if(menu.current) menu.current.style.display = "none";
      if(container.current && activeClassname) container.current.classList.remove(activeClassname);
      setActive(false);
      if (onClose) onClose();
    }
    if(menu.current && closeAnimation) {
      closeAnimation(menu.current, onEnd);
    }
    else onEnd();
  }

  function toggle(event) {
    if(active) deactivate();
    else activate(event);
  }

  function buildMenu() {
    return ( 
      <div 
        style={{display: "none"}}
        ref={menu}
        {...menuContainerAttributes}
      >
        {
          menuItems.map((item, index) => { 
            const isTerminal = item.type !== Menu;
            return isTerminal ? 
              <div key={index} {...menuTerminalItemAttributes}>{item}</div> :
              <div key={index} {...menuNonterminalItemAttributes}>{item}</div>;
          })
        }
      </div>
    );
  }

  useEffect(() => {
    if(defaultShow) activate();
  }, [defaultShow])


  return (
    <div 
      ref={container}
      style={{
        position: "relative",
      }}
      {...containerAttributes}
    >
      <div
        onClick={ activateOn === "click" ? (event) => toggle(event) : null }
        onMouseEnter={ activateOn === "hover" ? (event) => activate(event) : null }
        ref={activator}
        {...activatorAttributes}
      >
        {activatorContents}
      </div>
      {buildMenu()}
    </div>
  );
}


Menu.propTypes = {
  activeClassname: PropTypes.string,
  activatorAttributes: PropTypes.object,
  activatorContents: PropTypes.node.isRequired,
  containerAttributes: PropTypes.object,
  menuItems: PropTypes.arrayOf(PropTypes.node).isRequired,
  menuContainerAttributes: PropTypes.object,
  menuTerminalItemAttributes: PropTypes.object,
  menuNonterminalItemAttributes: PropTypes.object,  // another menu
  activateOn: PropTypes.oneOf(["click", "hover"]),
  onShow: PropTypes.func,
  onClose: PropTypes.func,
  showAt: PropTypes.oneOf(["left", "right", "cursor", "natural", "custom"]),
  customShowPos: PropTypes.shape({
    left: PropTypes.string,
    right: PropTypes.string,
    top: PropTypes.string,
    bottom: PropTypes.string,
  }),
  defaultShow: PropTypes.bool,
  // in any case it closes when clicking on activator, and 'click' mode is click OUTSIDE menu
  closeOn: PropTypes.oneOf(["click", "hover", "none"]),
  // ms after closeOn (and if 'hover' if menu is still unhovered) before it will be closed
  closeTimeout: PropTypes.number,
  closeImmediatelyOnHoverOnAnotherMenuItem: PropTypes.bool,
  closeImmediatelyOnClickOnAnotherMenuItem: PropTypes.bool,

  // functions that accept menu element and play some animation
  openAnimation: PropTypes.func,
  closeAnimation: PropTypes.func,
}

Menu.defaultProps = {
  activateOn: "click",
  showAt: "natural",
  defaultShow: false,
  closeOn: "none",
  closeTimeout: 0,
  closeImmediatelyOnHoverOnAnotherMenuItem: false,
  closeImmediatelyOnClickOnAnotherMenuItem: false,
}