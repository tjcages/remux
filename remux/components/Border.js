import React, { useState } from "react";
import Image from "next/image";

import styles from "../styles/border.module.css";

const Border = (props) => {
  const [oldBorder, setOldBorder] = useState(null);

  return (
    <div
      className={`${styles.item} ${props.selected && styles.selected}`}
      onClick={() => props.setRemuxSelected()}
    >
      <div className={styles.row}>
        {props.item.active !== undefined && (
          <div
            className={`${styles.checkbox} ${
              props.remuxBorder && styles.checked
            }`}
            onClick={() => {
              if (props.remuxBorder) {
                setOldBorder(props.remuxBorder);
                props.setRemuxBorder("");
              } else {
                props.setRemuxBorder(oldBorder);
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
          value={props.remuxBorder}
          onChange={(e) => props.setRemuxBorder(e.target.value)}
          style={{ maxWidth: 200 }}
        />
      </div>
    </div>
  );
};

export default Border;
