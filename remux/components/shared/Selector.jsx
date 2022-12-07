import React, { useEffect, useRef } from "react";

import styles from "../../styles/shared.module.css";

const Selector = (props) => {
  const ref = useRef();

  const open = props.option.type == props.selector;

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 1);
  });

  const init = () => {
    window.addEventListener("click", handleOutsideClick);
  };

  const handleOutsideClick = () => {
    if (open) {
      window.removeEventListener("click", handleOutsideClick);

      props.setSelectorOpen(null);
    }
  };

  return (
    <div ref={ref} className={`${styles.selector} ${open && styles.open}`}>
      <div
        className={styles.selection}
        onClick={() => {
          props.setRemuxBackgroundTexture("none");
        }}
      >
        None
      </div>
      <div
        className={styles.selection}
        onClick={() => {
          props.setRemuxBackgroundTexture("dotted");
        }}
      >
        Dotted
      </div>
      <div
        className={styles.selection}
        onClick={() => {
          props.setRemuxBackgroundTexture("boxes");
        }}
      >
        Boxes
      </div>
      <div
        className={styles.selection}
        onClick={() => {
          props.setRemuxBackgroundTexture("crosses");
        }}
      >
        Crosses
      </div>
    </div>
  );
};

export default Selector;
