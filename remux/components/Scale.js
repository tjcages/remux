import React, { useEffect, useRef } from "react";

import styles from "../styles/scale.module.css";

const Scale = (props) => {
  const ref = useRef();
  const progress = useRef();

  useEffect(() => {
    const clientWidth = ref.current.clientWidth;
    const maxWidth = ref.current.offsetParent.clientWidth - clientWidth / 2;
    const left = maxWidth * props.remuxScale;
    ref.current.style.left = `${left}px`;
  });

  function dragMove(event) {
    let mouseX;

    if (event.type == "touchstart") {
      mouseX = event.touches[0].pageX;
    } else {
      mouseX = event.screenX;
    }

    const onMove = (e) => {
      let x;

      if (event.type == "touchstart") {
        if (e.touches && e.touches.length > 0) {
          x = e.touches[0].pageX;
        } else {
          x = 0;
        }
      } else {
        x = e.screenX;
      }

      let dx = x - mouseX;

      let style = getComputedStyle(ref.current);
      const clientWidth = event.target.clientWidth;
      const maxWidth = event.target.offsetParent.clientWidth - clientWidth / 2;
      // window bounds
      let left = parseInt(style.left, 10) + dx;
      if (left < 0) left = 0;
      if (left > maxWidth) left = maxWidth;

      if (left > window.innerWidth - 200) left = window.innerWidth - 200;

      ref.current.style.left = `${left}px`;

      // declare scale variables
      let scale = left / maxWidth;
      const minScale = 0.5;
      const maxScale = 1.0;

      // set progress indicator
      progress.current.style.width = `${scale * 100}%`;

      // set min & max
      if (scale < minScale) scale = minScale;
      if (scale > maxScale) scale = maxScale;
        
      // set scale
      props.setRemuxScale(scale);

      mouseX = x;
    };

    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
    };

    // listeners
    window.addEventListener("mousemove", onMove, {
      passive: false,
    });
    window.addEventListener("touchmove", onMove, {
      passive: false,
    });
    window.addEventListener("mouseup", onUp, { passive: true });
    window.addEventListener("touchend", onUp, { passive: true });
  }

  return (
    <div
      className={`${styles.item} ${props.selected && styles.selected}`}
      onClick={() => props.setRemuxSelected()}
    >
      <div className={styles.option}>
        <div className={styles.title}>{props.item.title}</div>
      </div>
      <div className={styles.slider}>
        <div className={styles.track} />
        <div className={styles.progress} ref={progress} />
        <div
          className={styles.thumb}
          ref={ref}
          onMouseDown={(e) => dragMove(e)}
          onTouchStart={(e) => dragMove(e)}
        />
      </div>
    </div>
  );
};

export default Scale;
