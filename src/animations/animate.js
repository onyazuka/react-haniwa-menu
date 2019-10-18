export default function animate({timing, draw, duration, endCallback}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    let progress = timing(timeFraction);

    draw(progress); 

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }
    else {
      if(endCallback) endCallback();
    }

  });
}