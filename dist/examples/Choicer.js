import React, { useState } from 'react';
import { appearFromLeft, appearFromTop, scaleHor, unscaleHor, scaleVer, unscaleVer, rotate, appear, disappear } from '../Menu/MenuAnimations';
import Dashboard from "./Dashboard/Dashboard";
import MultilevelDashboard from './MultilevelDashboard/MultilevelDashboard';
import Navbar from './Navbar/Navbar';
export default function Choicer() {
  const [activateOn, setActivateOn] = useState("click");
  const [showAt, setShowAt] = useState("natural");
  const [customShowPos, setCustomShowPos] = useState({
    top: "0%",
    left: "0%"
  });
  const [defaultShow, setDefaultShow] = useState(false);
  const [closeOn, setCloseOn] = useState("click");
  const [closeTimeout, setCloseTimeout] = useState(0);
  const [openAnimationFuncName, setOpenAnimationFuncName] = useState(undefined);
  const [closeAnimationFuncName, setCloseAnimationFuncName] = useState(undefined);
  const [closeImmediatelyOnHoverOnAnotherMenuItem, setCloseImmediatelyOnHoverOnAnotherMenuItem] = useState(false);
  const [closeImmediatelyOnClickOnAnotherMenuItem, setCloseImmediatelyOnClickOnAnotherMenuItem] = useState(true);
  const [type, setType] = useState("menu-list-left");
  const choicer = React.createElement("div", {
    className: "choicer"
  }, React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Type"), React.createElement("input", {
    type: "radio",
    id: "type-menu-list-left",
    name: "type",
    value: "",
    onClick: () => setType("menu-list-left")
  }), React.createElement("label", {
    htmlFor: "type-menu-list-left"
  }, "Left Dashboard"), React.createElement("input", {
    type: "radio",
    id: "type-menu-list-right",
    name: "type",
    value: "",
    onClick: () => setType("menu-list-right")
  }), React.createElement("label", {
    htmlFor: "type-menu-list-right"
  }, "Right Dashboard"), React.createElement("input", {
    type: "radio",
    id: "type-menu-list-multilevel-left",
    name: "type",
    value: "",
    onClick: () => setType("menu-list-multilevel-left")
  }), React.createElement("label", {
    htmlFor: "type-menu-list-multilevel-left"
  }, "Multilevel Left Dashboard"), React.createElement("input", {
    type: "radio",
    id: "type-menu-list-navbar",
    name: "type",
    value: "",
    onClick: () => setType("menu-list-navbar")
  }), React.createElement("label", {
    htmlFor: "type-menu-list-navbar"
  }, "Navbar")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Activate On"), React.createElement("input", {
    type: "radio",
    id: "activateOn-click",
    name: "activateOn",
    value: "",
    onClick: () => setActivateOn("click")
  }), React.createElement("label", {
    htmlFor: "activateOn-click"
  }, "Click"), React.createElement("input", {
    type: "radio",
    id: "activateOn-hover",
    name: "activateOn",
    value: "",
    onClick: () => setActivateOn("hover")
  }), React.createElement("label", {
    htmlFor: "activateOn-hover"
  }, "Hover")), type !== "menu-list-navbar" ? React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Show At"), React.createElement("input", {
    type: "radio",
    id: "showAt-natural",
    name: "showAt",
    value: "",
    onClick: () => setShowAt("natural")
  }), React.createElement("label", {
    htmlFor: "showAt-natural"
  }, "Natural"), React.createElement("input", {
    type: "radio",
    id: "showAt-left",
    name: "showAt",
    value: "",
    onClick: () => setShowAt("left")
  }), React.createElement("label", {
    htmlFor: "showAt-left"
  }, "Left"), React.createElement("input", {
    type: "radio",
    id: "showAt-right",
    name: "showAt",
    value: "",
    onClick: () => setShowAt("right")
  }), React.createElement("label", {
    htmlFor: "showAt-right"
  }, "Right"), React.createElement("input", {
    type: "radio",
    id: "showAt-bottom",
    name: "showAt",
    value: "",
    onClick: () => {
      setShowAt("custom");
      setCustomShowPos({
        top: "100%%",
        left: "0%"
      });
    }
  }), React.createElement("label", {
    htmlFor: "showAt-bottom"
  }, "Bottom"), React.createElement("input", {
    type: "radio",
    id: "showAt-cursor",
    name: "showAt",
    value: "",
    onClick: () => setShowAt("cursor")
  }), React.createElement("label", {
    htmlFor: "showAt-cursor"
  }, "Cursor"), React.createElement("input", {
    type: "radio",
    id: "showAt-custom50x50",
    name: "showAt",
    value: "",
    onClick: () => {
      setShowAt("custom");
      setCustomShowPos({
        top: "50%",
        left: "50%"
      });
    }
  }), React.createElement("label", {
    htmlFor: "showAt-custom50x50"
  }, "Custom top 50% left 50%")) : null, React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Default Show"), React.createElement("input", {
    type: "radio",
    id: "defaultShow-true",
    name: "defaultShow",
    value: "",
    onClick: () => setDefaultShow(true)
  }), React.createElement("label", {
    htmlFor: "defaultShow-true"
  }, "True"), React.createElement("input", {
    type: "radio",
    id: "defaultShow-false",
    name: "defaultShow",
    value: "",
    onClick: () => setDefaultShow(false)
  }), React.createElement("label", {
    htmlFor: "defaultShow-false"
  }, "False")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Close On"), React.createElement("input", {
    type: "radio",
    id: "closeOn-none",
    name: "closeOn",
    value: "",
    onClick: () => setCloseOn("none")
  }), React.createElement("label", {
    htmlFor: "closeOn-none"
  }, "None"), React.createElement("input", {
    type: "radio",
    id: "closeOn-click",
    name: "closeOn",
    value: "",
    onClick: () => setCloseOn("click")
  }), React.createElement("label", {
    htmlFor: "closeOn-click"
  }, "Click"), React.createElement("input", {
    type: "radio",
    id: "closeOn-hover",
    name: "closeOn",
    value: "",
    onClick: () => setCloseOn("hover")
  }), React.createElement("label", {
    htmlFor: "closeOn-hover"
  }, "Hover")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Close Timeout, ms"), React.createElement("input", {
    type: "radio",
    id: "closeTimeout-0",
    name: "closeTimeout",
    value: "",
    onClick: () => setCloseTimeout(0)
  }), React.createElement("label", {
    htmlFor: "closeTimeout-0"
  }, "0"), React.createElement("input", {
    type: "radio",
    id: "closeTimeout-500",
    name: "closeTimeout",
    value: "",
    onClick: () => setCloseTimeout(500)
  }), React.createElement("label", {
    htmlFor: "closeTimeout-500"
  }, "500"), React.createElement("input", {
    type: "radio",
    id: "closeTimeout-1000",
    name: "closeTimeout",
    value: "",
    onClick: () => setCloseTimeout(1000)
  }), React.createElement("label", {
    htmlFor: "closeTimeout-1000"
  }, "1000"), React.createElement("input", {
    type: "radio",
    id: "closeTimeout-2000",
    name: "closeTimeout",
    value: "",
    onClick: () => setCloseTimeout(2000)
  }), React.createElement("label", {
    htmlFor: "closeTimeout-2000"
  }, "2000")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Animation Open"), React.createElement("input", {
    type: "radio",
    id: "animation-appear-from-left",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("appear-from-left");
    }
  }), React.createElement("label", {
    htmlFor: "animation-appear-from-left"
  }, "Appear from left"), React.createElement("input", {
    type: "radio",
    id: "animation-appear-from-top",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("appear-from-top");
    }
  }), React.createElement("label", {
    htmlFor: "animation-appear-from-top"
  }, "Appear from top"), React.createElement("input", {
    type: "radio",
    id: "animation-scale-hor",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("scale-hor");
    }
  }), React.createElement("label", {
    htmlFor: "animation-scale-hor"
  }, "Scale horizontal"), React.createElement("input", {
    type: "radio",
    id: "animation-scale-ver",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("scale-ver");
    }
  }), React.createElement("label", {
    htmlFor: "animation-scale-ver"
  }, "Scale vertical"), React.createElement("input", {
    type: "radio",
    id: "animation-rotate",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("rotate");
    }
  }), React.createElement("label", {
    htmlFor: "animation-rotate"
  }, "Rotate"), React.createElement("input", {
    type: "radio",
    id: "animation-appear",
    name: "animation-open",
    value: "",
    onClick: () => {
      setOpenAnimationFuncName("appear");
    }
  }), React.createElement("label", {
    htmlFor: "animation-appear"
  }, "Appear")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Animation Close"), React.createElement("input", {
    type: "radio",
    id: "animation-unscale-hor",
    name: "animation-close",
    value: "",
    onClick: () => {
      setCloseAnimationFuncName("unscale-hor");
    }
  }), React.createElement("label", {
    htmlFor: "animation-unscale-hor"
  }, "Unscale Horizontal"), React.createElement("input", {
    type: "radio",
    id: "animation-unscale-ver",
    name: "animation-close",
    value: "",
    onClick: () => {
      setCloseAnimationFuncName("unscale-ver");
    }
  }), React.createElement("label", {
    htmlFor: "animation-unscale-ver"
  }, "Unscale Vertical"), React.createElement("input", {
    type: "radio",
    id: "animation-disappear",
    name: "animation-close",
    value: "",
    onClick: () => {
      setCloseAnimationFuncName("disappear");
    }
  }), React.createElement("label", {
    htmlFor: "animation-disappear"
  }, "Disappear")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Close immediately on hover on another menu item"), React.createElement("input", {
    type: "radio",
    id: "ciohoami-false",
    name: "ciohoami",
    value: "",
    onClick: () => setCloseImmediatelyOnHoverOnAnotherMenuItem(false)
  }), React.createElement("label", {
    htmlFor: "ciohoami-false"
  }, "False"), React.createElement("input", {
    type: "radio",
    id: "ciohoami-true",
    name: "ciohoami",
    value: "",
    onClick: () => setCloseImmediatelyOnHoverOnAnotherMenuItem(true)
  }), React.createElement("label", {
    htmlFor: "ciohoami-true"
  }, "True")), React.createElement("div", {
    className: "choicer-group"
  }, React.createElement("p", null, "Close immediately on click on another menu item"), React.createElement("input", {
    type: "radio",
    id: "ciocoami-false",
    name: "ciocoami",
    value: "",
    onClick: () => setCloseImmediatelyOnClickOnAnotherMenuItem(false)
  }), React.createElement("label", {
    htmlFor: "ciocoami-false"
  }, "False"), React.createElement("input", {
    type: "radio",
    id: "ciocoami-true",
    name: "ciocoami",
    value: "",
    onClick: () => setCloseImmediatelyOnClickOnAnotherMenuItem(true)
  }), React.createElement("label", {
    htmlFor: "ciocoami-true"
  }, "True")));
  const openAnimation = openAnimationFuncName === "appear-from-left" ? appearFromLeft : openAnimationFuncName === "appear-from-top" ? appearFromTop : openAnimationFuncName === "scale-hor" ? scaleHor : openAnimationFuncName === "scale-ver" ? scaleVer : openAnimationFuncName === "rotate" ? rotate : openAnimationFuncName === "appear" ? appear : undefined;
  const closeAnimation = closeAnimationFuncName === "unscale-hor" ? unscaleHor : closeAnimationFuncName === "unscale-ver" ? unscaleVer : closeAnimationFuncName === "disappear" ? disappear : undefined;
  const contents = type === "menu-list-left" || type === "menu-list-right" ? React.createElement(Dashboard, {
    type: type,
    activateOn: activateOn,
    showAt: showAt,
    customShowPos: customShowPos,
    defaultShow: defaultShow,
    closeOn: closeOn,
    closeTimeout: closeTimeout,
    openAnimation: openAnimation,
    closeAnimation: closeAnimation,
    closeImmediatelyOnHoverOnAnotherMenuItem: closeImmediatelyOnHoverOnAnotherMenuItem,
    closeImmediatelyOnClickOnAnotherMenuItem: closeImmediatelyOnClickOnAnotherMenuItem
  }) : type === "menu-list-multilevel-left" ? React.createElement(MultilevelDashboard, {
    type: type,
    activateOn: activateOn,
    showAt: showAt,
    customShowPos: customShowPos,
    defaultShow: defaultShow,
    closeOn: closeOn,
    closeTimeout: closeTimeout,
    openAnimation: openAnimation,
    closeAnimation: closeAnimation,
    closeImmediatelyOnHoverOnAnotherMenuItem: closeImmediatelyOnHoverOnAnotherMenuItem,
    closeImmediatelyOnClickOnAnotherMenuItem: closeImmediatelyOnClickOnAnotherMenuItem
  }) : type === "menu-list-navbar" ? React.createElement(Navbar, {
    type: type,
    activateOn: activateOn,
    showAt: showAt,
    customShowPos: customShowPos,
    defaultShow: defaultShow,
    closeOn: closeOn,
    closeTimeout: closeTimeout,
    openAnimation: openAnimation,
    closeAnimation: closeAnimation,
    closeImmediatelyOnHoverOnAnotherMenuItem: closeImmediatelyOnHoverOnAnotherMenuItem,
    closeImmediatelyOnClickOnAnotherMenuItem: closeImmediatelyOnClickOnAnotherMenuItem
  }) : null;
  return React.createElement(React.Fragment, null, choicer, contents);
}