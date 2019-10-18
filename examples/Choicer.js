import React, { useState } from 'react';
import {appearFromLeft, appearFromTop, scaleHor, unscaleHor, scaleVer, unscaleVer, rotate, appear, disappear} from '../Menu/MenuAnimations';
import Dashboard from "./Dashboard/Dashboard";
import MultilevelDashboard from './MultilevelDashboard/MultilevelDashboard';
import Navbar from './Navbar/Navbar'


export default function Choicer() {

  const [activateOn, setActivateOn] = useState("click");
  const [showAt, setShowAt] = useState("natural");
  const [customShowPos, setCustomShowPos] = useState({
    top: "0%",
    left: "0%",
  });
  const [defaultShow, setDefaultShow] = useState(false);
  const [closeOn, setCloseOn] = useState("click");
  const [closeTimeout, setCloseTimeout] = useState(0);
  const [openAnimationFuncName, setOpenAnimationFuncName] = useState(undefined);
  const [closeAnimationFuncName, setCloseAnimationFuncName] = useState(undefined);
  const [closeImmediatelyOnHoverOnAnotherMenuItem, setCloseImmediatelyOnHoverOnAnotherMenuItem] = useState(false);
  const [closeImmediatelyOnClickOnAnotherMenuItem, setCloseImmediatelyOnClickOnAnotherMenuItem] = useState(true);
  const [type, setType] = useState("menu-list-left");
  const choicer = 
    <div className="choicer">
      <div className="choicer-group">
        <p>Type</p>
        <input type="radio" id="type-menu-list-left" name="type" value="" onClick={() => setType("menu-list-left")}></input>
        <label htmlFor="type-menu-list-left">Left Dashboard</label>
        <input type="radio" id="type-menu-list-right" name="type" value="" onClick={() => setType("menu-list-right")}></input>
        <label htmlFor="type-menu-list-right">Right Dashboard</label>
        <input type="radio" id="type-menu-list-multilevel-left" name="type" value="" onClick={() => setType("menu-list-multilevel-left")}></input>
        <label htmlFor="type-menu-list-multilevel-left">Multilevel Left Dashboard</label>
        <input type="radio" id="type-menu-list-navbar" name="type" value="" onClick={() => setType("menu-list-navbar")}></input>
        <label htmlFor="type-menu-list-navbar">Navbar</label>
      </div>
      <div className="choicer-group">
        <p>Activate On</p>
        <input type="radio" id="activateOn-click" name="activateOn" value="" onClick={() => setActivateOn("click")}></input>
        <label htmlFor="activateOn-click">Click</label>
        <input type="radio" id="activateOn-hover" name="activateOn" value="" onClick={() => setActivateOn("hover")}></input>
        <label htmlFor="activateOn-hover">Hover</label>
      </div>
      {
      type !== "menu-list-navbar" ?
      <div className="choicer-group">
        <p>Show At</p>
        <input type="radio" id="showAt-natural" name="showAt" value="" onClick={() => setShowAt("natural")}></input>
        <label htmlFor="showAt-natural">Natural</label>
        <input type="radio" id="showAt-left" name="showAt" value="" onClick={() => setShowAt("left")}></input>
        <label htmlFor="showAt-left">Left</label>
        <input type="radio" id="showAt-right" name="showAt" value="" onClick={() => setShowAt("right")}></input>
        <label htmlFor="showAt-right">Right</label>
        <input type="radio" id="showAt-bottom" name="showAt" value="" onClick={() => { setShowAt("custom"); setCustomShowPos({top: "100%%", left: "0%"}) }}></input>
        <label htmlFor="showAt-bottom">Bottom</label>
        <input type="radio" id="showAt-cursor" name="showAt" value="" onClick={() => setShowAt("cursor")}></input>
        <label htmlFor="showAt-cursor">Cursor</label>
        <input type="radio" id="showAt-custom50x50" name="showAt" value="" onClick={() => { setShowAt("custom"); setCustomShowPos({top: "50%", left: "50%"}) } }></input>
        <label htmlFor="showAt-custom50x50">Custom top 50% left 50%</label>
      </div>
      : null}
      <div className="choicer-group">
        <p>Default Show</p>
        <input type="radio" id="defaultShow-true" name="defaultShow" value="" onClick={() => setDefaultShow(true)}></input>
        <label htmlFor="defaultShow-true">True</label>
        <input type="radio" id="defaultShow-false" name="defaultShow" value="" onClick={() => setDefaultShow(false)}></input>
        <label htmlFor="defaultShow-false">False</label>
      </div>
      <div className="choicer-group">
        <p>Close On</p>
        <input type="radio" id="closeOn-none" name="closeOn" value="" onClick={() => setCloseOn("none")}></input>
        <label htmlFor="closeOn-none">None</label>
        <input type="radio" id="closeOn-click" name="closeOn" value="" onClick={() => setCloseOn("click")}></input>
        <label htmlFor="closeOn-click">Click</label>
        <input type="radio" id="closeOn-hover" name="closeOn" value="" onClick={() => setCloseOn("hover")}></input>
        <label htmlFor="closeOn-hover">Hover</label>
      </div>
      <div className="choicer-group">
        <p>Close Timeout, ms</p>
        <input type="radio" id="closeTimeout-0" name="closeTimeout" value="" onClick={() => setCloseTimeout(0)}></input>
        <label htmlFor="closeTimeout-0">0</label>
        <input type="radio" id="closeTimeout-500" name="closeTimeout" value="" onClick={() => setCloseTimeout(500)}></input>
        <label htmlFor="closeTimeout-500">500</label>
        <input type="radio" id="closeTimeout-1000" name="closeTimeout" value="" onClick={() => setCloseTimeout(1000)}></input>
        <label htmlFor="closeTimeout-1000">1000</label>
        <input type="radio" id="closeTimeout-2000" name="closeTimeout" value="" onClick={() => setCloseTimeout(2000)}></input>
        <label htmlFor="closeTimeout-2000">2000</label>
      </div>
      <div className="choicer-group">
        <p>Animation Open</p>
        <input type="radio" id="animation-appear-from-left" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("appear-from-left");
        }}>
        </input>
        <label htmlFor="animation-appear-from-left">Appear from left</label>
        <input type="radio" id="animation-appear-from-top" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("appear-from-top");
        }}>
        </input>
        <label htmlFor="animation-appear-from-top">Appear from top</label>
        <input type="radio" id="animation-scale-hor" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("scale-hor");
        }}>
        </input>
        <label htmlFor="animation-scale-hor">Scale horizontal</label>
        <input type="radio" id="animation-scale-ver" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("scale-ver");
        }}>
        </input>
        <label htmlFor="animation-scale-ver">Scale vertical</label>
        <input type="radio" id="animation-rotate" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("rotate");
        }}>
        </input>
        <label htmlFor="animation-rotate">Rotate</label>
        <input type="radio" id="animation-appear" name="animation-open" value="" onClick={() => {
          setOpenAnimationFuncName("appear");
        }}>
        </input>
        <label htmlFor="animation-appear">Appear</label>
      </div>
      <div className="choicer-group">
        <p>Animation Close</p>
        <input type="radio" id="animation-unscale-hor" name="animation-close" value="" onClick={() => {
          setCloseAnimationFuncName("unscale-hor");
        }}>
        </input>
        <label htmlFor="animation-unscale-hor">Unscale Horizontal</label>
        <input type="radio" id="animation-unscale-ver" name="animation-close" value="" onClick={() => {
          setCloseAnimationFuncName("unscale-ver");
        }}>
        </input>
        <label htmlFor="animation-unscale-ver">Unscale Vertical</label>
        <input type="radio" id="animation-disappear" name="animation-close" value="" onClick={() => {
          setCloseAnimationFuncName("disappear");
        }}>
        </input>
        <label htmlFor="animation-disappear">Disappear</label>
      </div>
      <div className="choicer-group">
        <p>Close immediately on hover on another menu item</p>
        <input type="radio" id="ciohoami-false" name="ciohoami" value="" onClick={() => setCloseImmediatelyOnHoverOnAnotherMenuItem(false)}></input>
        <label htmlFor="ciohoami-false">False</label>
        <input type="radio" id="ciohoami-true" name="ciohoami" value="" onClick={() => setCloseImmediatelyOnHoverOnAnotherMenuItem(true)}></input>
        <label htmlFor="ciohoami-true">True</label>
      </div>
      <div className="choicer-group">
        <p>Close immediately on click on another menu item</p>
        <input type="radio" id="ciocoami-false" name="ciocoami" value="" onClick={() => setCloseImmediatelyOnClickOnAnotherMenuItem(false)}></input>
        <label htmlFor="ciocoami-false">False</label>
        <input type="radio" id="ciocoami-true" name="ciocoami" value="" onClick={() => setCloseImmediatelyOnClickOnAnotherMenuItem(true)}></input>
        <label htmlFor="ciocoami-true">True</label>
      </div>
    </div>

  const openAnimation = 
    openAnimationFuncName === "appear-from-left" ? appearFromLeft :
    openAnimationFuncName === "appear-from-top" ? appearFromTop :
    openAnimationFuncName === "scale-hor" ? scaleHor :
    openAnimationFuncName === "scale-ver" ? scaleVer :
    openAnimationFuncName === "rotate" ? rotate :
    openAnimationFuncName === "appear" ? appear :
     undefined;

  const closeAnimation = 
    closeAnimationFuncName === "unscale-hor" ? unscaleHor :
    closeAnimationFuncName === "unscale-ver" ? unscaleVer :
    closeAnimationFuncName === "disappear" ? disappear : undefined;

  const contents = type === "menu-list-left" || type === "menu-list-right" ?
    <Dashboard
      type={type}
      activateOn={activateOn}
      showAt={showAt}
      customShowPos={customShowPos}
      defaultShow={defaultShow}
      closeOn={closeOn}
      closeTimeout={closeTimeout}
      openAnimation={openAnimation}
      closeAnimation={closeAnimation}
      closeImmediatelyOnHoverOnAnotherMenuItem={closeImmediatelyOnHoverOnAnotherMenuItem}
      closeImmediatelyOnClickOnAnotherMenuItem={closeImmediatelyOnClickOnAnotherMenuItem}
    >
    </Dashboard> : 
    type === "menu-list-multilevel-left" ? 
    <MultilevelDashboard
      type={type}
      activateOn={activateOn}
      showAt={showAt}
      customShowPos={customShowPos}
      defaultShow={defaultShow}
      closeOn={closeOn}
      closeTimeout={closeTimeout}
      openAnimation={openAnimation}
      closeAnimation={closeAnimation}
      closeImmediatelyOnHoverOnAnotherMenuItem={closeImmediatelyOnHoverOnAnotherMenuItem}
      closeImmediatelyOnClickOnAnotherMenuItem={closeImmediatelyOnClickOnAnotherMenuItem}
    >
    </MultilevelDashboard> :
    type === "menu-list-navbar" ?
    <Navbar
      type={type}
      activateOn={activateOn}
      showAt={showAt}
      customShowPos={customShowPos}
      defaultShow={defaultShow}
      closeOn={closeOn}
      closeTimeout={closeTimeout}
      openAnimation={openAnimation}
      closeAnimation={closeAnimation}
      closeImmediatelyOnHoverOnAnotherMenuItem={closeImmediatelyOnHoverOnAnotherMenuItem}
      closeImmediatelyOnClickOnAnotherMenuItem={closeImmediatelyOnClickOnAnotherMenuItem}
    >
    </Navbar> :
    null;
  
  return (
    <>
      {choicer}
      {contents}
    </>
  );
}

