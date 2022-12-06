import React, { useState } from "react";
import Image from "next/image";

import styles from "../styles/border.module.css";

const Corner = (props) => {
  const [oldCorner, setOldCorner] = useState(null);

  return (
    <div
      className={`${styles.item} ${props.selected && styles.selected}`}
      onClick={() => props.setRemuxSelected()}
    >
      <div className={styles.row}>
        {props.item.active !== undefined && (
          <div
            className={`${styles.checkbox} ${
              props.remuxCornerRadius && styles.checked
            }`}
            onClick={() => {
              if (props.remuxCornerRadius) {
                setOldCorner(props.remuxCornerRadius);
                props.setRemuxCornerRadius(0);
              } else {
                props.setRemuxCornerRadius(oldCorner);
              }
            }}
          >
            <Image
              className={styles.check}
              src="/check.svg"
              alt="Check icon"
              width={12}
              height={12}
            />
          </div>
        )}
        <div className={styles.title}>{props.item.title}</div>
      </div>
      <div className={styles.row}>
        <input
          className={styles.selector}
          value={props.remuxCornerRadius}
          onChange={(e) => props.setRemuxCornerRadius(e.target.value)}
          style={{ maxWidth: 90 }}
        />
      </div>
    </div>
  );
};

export default Corner;
