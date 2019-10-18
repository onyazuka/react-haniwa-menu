import animations from '../animations';

export function appearFromLeft(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `translate(${-30 + progress*30}px, 0px)`;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}
export function appearFromTop(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `translate(0px, ${-30 + progress*30}px)`;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}

export function scaleHor(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `scaleX(${progress})`;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}

export function unscaleHor(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `scaleX(${1 - progress})`;
    }, 
    endCallback: () => {
      elem.style.transform = "";
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}

export function scaleVer(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `scaleY(${progress})`;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}

export function unscaleVer(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `scaleY(${1 - progress})`;
    }, 
    endCallback: () => {
      elem.style.transform = "";
      if(onFinish) onFinish();
    },
  });
}

export function rotate(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.transform = `rotate(${30 - progress * 30}deg)`;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.transform = "";
    },
  });
}


export function appear(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.opacity = progress;
    }, 
    endCallback: () => {
      if(onFinish) onFinish();
      elem.style.opacity = "";
    },
  });
}

export function disappear(elem, onFinish) {
  animations.animate({
    timing: animations.Timings.makeEaseOut(animations.Timings.quad),
    duration: 500,
    draw: (progress) => {
      elem.style.opacity = 1 - progress;
    }, 
    endCallback: () => {
      elem.style.opacity = 1;
      if(onFinish) onFinish();
    },
  });
}