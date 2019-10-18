import React, { useState, useReducer } from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import createMenu from '../Menu/MenuFactory';
import Choicer from '../examples/Choicer';
import { shallow, mount, render as enzymeRender } from 'enzyme';

let mainContainer = null;

const menuDefaultOpts = {
  container: {
    attributes: { className: "container", },
  },
  activator: {
    attributes: { className: "activator" },
  },
  submenu: {
    attributes: { className: "submenu" },
  },
  terminalItemsInfo: {
    attributes: { className: "menu-item" },
  },
  nonterminalItemsInfo: {
    attributes: { className: "menu-item" },
  },
  items: [
    { text: "Item1", attributes: {id : "item1", }, },
    { text: "Item2", attributes: {id : "item2", },},
    { text: "Item3", attributes: {id : "item3", },},
  ],
};

const menuDefaultMultilevelOpts = {
  container: {
    attributes: { className: "container", },
  },
  activator: {
    attributes: { className: "activator" },
  },
  submenu: {
    attributes: { className: "submenu" },
  },
  terminalItemsInfo: {
    attributes: { className: "menu-item" },
  },
  nonterminalItemsInfo: {
    attributes: { className: "menu-item" },
  },
  items: [
    { 
      text: "Item1",
      attributes: {id : "item1", },
    },
    { 
      activator: {
        text: "Item2",
        attributes: {
          id : "item2", 
          className: "activator",
        },
      },
      items: [
        { 
          text: "Item4", 
          attributes: {id : "item4", },
        },
        { 
          activator: {
            text: "Item5", 
            attributes: {
              id : "item5", 
              className: "activator",
            },
          },
          items
          : [
            {text: "Item6", attributes: {id : "item6", },},
            
          ]
        }
      ],
    },
    { 
      text: "Item3",
      attributes: {id : "item3", },
    },
  ],
};

function setup() {
  // setup a DOM element as a render target
  mainContainer = document.createElement("div");
  document.body.appendChild(mainContainer);
  mainContainer.classList.add("main-container");
  mainContainer.style.position = "absolute";
  mainContainer.style.left = "200px";
  mainContainer.style.top = "300px";
  mainContainer.style.width = "100px";
  mainContainer.style.height = "100px";
}

function cleanup() {
  // cleanup on exiting
  unmountComponentAtNode(mainContainer);
  mainContainer.remove();
  mainContainer = null;
}

beforeEach(() => {
  setup();
});

afterEach(() => {
  cleanup();
});


describe("<Menu />", () => {

  it("renders simple menu correctly", () => {
    act(() => {
      render(createMenu(menuDefaultOpts), mainContainer);
    });
    expect(document.querySelectorAll(".main-container").length).toEqual(1);
    expect(document.querySelectorAll(".activator").length).toEqual(1);
    expect(document.querySelectorAll(".submenu").length).toEqual(1);
    expect(document.querySelectorAll(".menu-item").length).toEqual(3);
    expect(document.querySelectorAll(".ababa").length).toEqual(0);

    // rendering without unnecessary options
    act(() => {
      cleanup();
      setup();
      render(createMenu({
        container: {},
        activator: {},
        submenu: {},
        itemsInfo: {},
        items: [
          { text: "Item1", },
          { text: "Item2", },
          { text: "Item3", },
        ],
      }), mainContainer);
    });
    expect(document.querySelectorAll(".main-container").length).toEqual(1);
    expect(document.querySelectorAll(".activator").length).toEqual(0);
    expect(document.querySelectorAll(".submenu").length).toEqual(0);
    expect(document.querySelectorAll(".menu-item").length).toEqual(0);
  });

  it("renders multilevel menu correctly", () => {
    act(() => {
      render(createMenu(menuDefaultMultilevelOpts), mainContainer);
    });
    expect(document.querySelectorAll(".main-container").length).toEqual(1);
    expect(document.querySelectorAll(".activator").length).toEqual(3);
    expect(document.querySelectorAll(".submenu").length).toEqual(3);
    expect(document.querySelectorAll(".menu-item").length).toEqual(6);
    expect(document.querySelectorAll(".ababa").length).toEqual(0);

    // finding all items
    const menuItems = [...document.querySelectorAll(".menu-item")];
    [1,2,3,4,5,6].forEach(number => {
      expect(
        menuItems.find((menuItem) => menuItem.innerHTML.includes("Item" + number) )
      ).toBeTruthy();
    });

    // checking relashionships
    expect(document.querySelector("#item1").closest('.container').querySelectorAll(".menu-item").length).toEqual(6);
    expect(document.querySelector("#item4").closest('.container').querySelectorAll(".menu-item").length).toEqual(3);
    expect(document.querySelector("#item6").closest('.container').querySelectorAll(".menu-item").length).toEqual(1);
  });

  it("check activateOn", () => {
    // click
    const choicer = mount(<Choicer />);
    choicer.find("#activateOn-click").simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(1).simulate("click");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(1).simulate("click");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");

    // hover(can be checked only with enzyme)
    choicer.find("#activateOn-hover").simulate("click");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(2).simulate("mouseenter");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("");
  });

  it("check onShow(), onClose()", () => {
    let a = 0;
    act(() => {
      render(createMenu(
        {
          ...menuDefaultOpts, 
          activateOn: "click",
          onShow: () => { a = 1; },
          onClose:() => { a = 2; }
        }), mainContainer);
    });
    let activator = mainContainer.querySelector(".activator");
    expect(a).toEqual(0);
    act(() => {
      activator.click();
    });
    expect(a).toEqual(1);
    act(() => {
      activator.click();
    });
    expect(a).toEqual(2);
    act(() => {
      activator.click();
    });
    expect(a).toEqual(1);
    act(() => {
      activator.click();
    });
    expect(a).toEqual(2);
  });

  it("check defaultShow true", () => {
    act(() => {
      render(createMenu(
        {
          ...menuDefaultOpts, 
          activateOn: "click",
          defaultShow: true,
        }), mainContainer);
    });
    let activator = mainContainer.querySelector(".activator");
    let items = mainContainer.querySelectorAll(".menu-item");
    expect(activator).toBeTruthy();
    expect([...items].every((menuItem) => window.getComputedStyle(menuItem).display !== "none"));
    act(() => {
      activator.click();
    });
    expect([...items].every((menuItem) => window.getComputedStyle(menuItem).display === "none"));
  });

  it("check showAt, customShowPos", () => {
    // left
    act(() => {
      render(createMenu(
        {
          ...menuDefaultOpts, 
          activateOn: "click",
          defaultShow: true,
          showAt: "left",
        }), mainContainer);
    });
    // we are setting position exactly for submenu
    // because we are not doing full render here, we are just checking css properties
    let submenu = mainContainer.querySelector(".submenu");
    let submenuStyle = window.getComputedStyle(submenu);
    expect(submenuStyle.top).toEqual("0px");
    expect(submenuStyle.right).toEqual("100%");

    // right
    act(() => {
      cleanup();
      setup();
      render(createMenu(
        {
          ...menuDefaultOpts, 
          activateOn: "click",
          defaultShow: true,
          showAt: "right",
        }), mainContainer);
    });
    // we are setting position exactly for submenu
    // because we are not doing full render here, we are just checking css properties
    submenu = mainContainer.querySelector(".submenu");
    submenuStyle = window.getComputedStyle(submenu);
    expect(submenuStyle.top).toEqual("0px");
    expect(submenuStyle.left).toEqual("100%");

    // custom
    act(() => {
      cleanup();
      setup();
      render(createMenu(
        {
          ...menuDefaultOpts, 
          activateOn: "click",
          defaultShow: true,
          showAt: "custom",
          customShowPos: {
            top: "50%",
            left: "50%",
          }
        }), mainContainer);
    });
    // we are setting position exactly for submenu
    // because we are not doing full render here, we are just checking css properties
    submenu = mainContainer.querySelector(".submenu");
    submenuStyle = window.getComputedStyle(submenu);
    expect(submenuStyle.top).toEqual("50%");
    expect(submenuStyle.left).toEqual("50%");

    // don't checking natural, because it just adds menu in dom, also don't checking cursor because we are not rendering
  }); 

  it("closeOn none", () => {
    // none - closing only on click by activator
    const choicer = mount(<Choicer />);
    choicer.find("#activateOn-click").simulate("click");
    choicer.find("#closeOn-none").simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(1).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(1).simulate("click");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");

    // not closing if onClose == 'none' and activateOn == 'hover' - because we are still hovering, it is expected behaviour
    choicer.find("#activateOn-hover").simulate("click");
    choicer.find(".activator").at(3).simulate("mouseenter");
    expect(choicer.find(".submenu").at(3).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(2).simulate("mouseenter");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("");
  }); 

  it("closeOn click", () => {
    const map = {};
    // doing map of array, as one element can have more than 1 event listeners
    document.addEventListener = jest.fn((event, cb) => {
      map[event] ? map[event].push(cb) : map[event] = [cb];
    });
    // click OUTSIDE
    const choicer = mount(<Choicer />);
    choicer.find("#activateOn-click").simulate("click");
    choicer.find("#closeOn-click").simulate("click");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(1).simulate("click");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(2).simulate("click");
    // need to wrap in act because we are simulating pure DOM action
    act(() => {
      map["click"].forEach((clickEL) => {
        clickEL({bubbles: true, target: choicer.find(".activator").at(2).getDOMNode()});
      })
    });
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("");
    // 1 menu is hidden now
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(3).simulate("click");
    act(() => {
      map["click"].forEach((clickEL) => {
        clickEL({bubbles: true, target: document.body});
      })
    });
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(3).getDOMNode().style.display).toEqual("none");
  })

  it("closeOn hover, close timeout", (done) => {
    const map = {};
    const choicer = mount(<Choicer />);
    // doing map of array, as one element can have more than 1 event listeners
    choicer.find(".container").at(2).getDOMNode().addEventListener = jest.fn((event, cb) => {
      map[event] ? map[event].push(cb) : map[event] = [cb];
    });
    choicer.find("#activateOn-hover").simulate("click");
    choicer.find("#closeOn-hover").simulate("click");
    choicer.find("#closeTimeout-500").simulate("click");
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("none");
    // to show element
    choicer.find(".activator").at(2).simulate("mouseenter");
    act(() => {
      // to trigger useHoveredOutside
      map['mouseenter'][0]();
    });
    expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("");
    act(() => {
       // to trigger useHoveredOutside - close element
      map['mouseleave'][0]({relatedTarget: document.body});
    });
    // timeout not passed
    setTimeout(() => {
      expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("");
    }, 100);  
    // timeout passed
    setTimeout(() => {
      expect(choicer.find(".submenu").at(2).getDOMNode().style.display).toEqual("none");
      done();
    }, 600);  

  })

  it("ciohoami", (done) => {
    const choicer = mount(<Choicer />);
    const docmap = {};
    const cont0map = {};
    const cont1map = {};
    document.addEventListener = jest.fn((event, cb) => {
      docmap[event] ? docmap[event].push(cb) : docmap[event] = [cb];
    });
    choicer.find(".container").at(0).getDOMNode().addEventListener = jest.fn((event, cb) => {
      cont0map[event] ? cont0map[event].push(cb) : cont1map[event] = [cb];
    });
    // we can have max 1 event listener here, so can just clear
    choicer.find(".container").at(0).getDOMNode().removeEventListener = jest.fn((event, cb) => {
      cont0map[event] = [];
    });
    choicer.find(".container").at(1).getDOMNode().addEventListener = jest.fn((event, cb) => {
      cont1map[event] ? cont1map[event].push(cb) : cont1map[event] = [cb];
    });
    choicer.find(".container").at(1).getDOMNode().removeEventListener = jest.fn((event, cb) => {
      cont1map[event] = [];
    });

    choicer.find("#activateOn-hover").simulate("click");
    choicer.find("#showAt-right").simulate("click");
    choicer.find("#closeOn-click").simulate("click");
    choicer.find("#closeTimeout-1000").simulate("click");
    choicer.find("#ciohoami-true").simulate("click");

    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("mouseenter");
    act(() => {
      cont0map['mouseenter'][0]();
    });
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");

    choicer.find(".activator").at(0).simulate("mouseleave");
    choicer.find(".activator").at(1).simulate("mouseenter");
    act(() => {
      cont0map['mouseleave'][0]({relatedTarget: choicer.find(".activator").at(1).getDOMNode()});
      cont1map['mouseenter'][0]();
    });
    setTimeout(() => {
      expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
      done();
    }, 50);
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
  });

  it("ciocoami", done => {
    const choicer = mount(<Choicer />);
    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] ? map[event].push(cb) : map[event] = [cb];
    });
    choicer.find("#activateOn-click").simulate("click");
    choicer.find("#showAt-cursor").simulate("click");
    choicer.find("#closeOn-hover").simulate("click");
    choicer.find("#closeTimeout-1000").simulate("click");
    choicer.find("#ciocoami-true").simulate("click");

    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("none");
    choicer.find(".activator").at(0).simulate("click");
    expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("");
    choicer.find(".activator").at(1).simulate("click");
    act(() => {
      map['click'][0]({target: choicer.find(".activator").at(1).getDOMNode()});
    });
    expect(choicer.find(".submenu").at(1).getDOMNode().style.display).toEqual("");
    setTimeout(() => {
      expect(choicer.find(".submenu").at(0).getDOMNode().style.display).toEqual("none");
      done();
    }, 50);
  }); 

  it("multilevel menu also works", done => {

    const map = {};
    document.addEventListener = jest.fn((event, cb) => {
      map[event] ? map[event].push(cb) : map[event] = [cb];
    });
    
    const choicer = mount(<Choicer />);
    choicer.find("#type-menu-list-multilevel-left").simulate("click");
    choicer.find("#activateOn-click").simulate("click");
    choicer.find("#closeOn-click").simulate("click");

    expect(choicer.find(".submenu").length).toEqual(6);
    choicer.find(".submenu").forEach(submenu => {
      expect(submenu.getDOMNode().style.display).toEqual("none");
    });

    choicer.find(".activator").forEach(activator => {
      activator.simulate("click");
    });

    choicer.find(".submenu").forEach(submenu => {
      expect(submenu.getDOMNode().style.display).toEqual("");
    });
    

    // trying to close all menus by clicking outside
    act(() => {
      map['click'].forEach((clickAction) => {
        clickAction({target: document.body});
      })
    });

    setTimeout(() => {
      choicer.find(".submenu").forEach(submenu => {
        expect(submenu.getDOMNode().style.display).toEqual("none");
      });
      done();
    }, 50);
  });
});