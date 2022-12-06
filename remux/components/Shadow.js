import React, { useState } from "react";
import Image from "next/image";

import styles from "../styles/border.module.css";

const Shadow = (props) => {
  const [oldShadow, setOldShadow] = useState(null);

  return (
    <div
      className={`${styles.item} ${props.selected && styles.selected}`}
      onClick={() => props.setRemuxSelected()}
    >
      <div className={styles.row}>
        {props.item.active !== undefined && (
          <div
            className={`${styles.checkbox} ${
              props.remuxShadow && styles.checked
            }`}
            onClick={() => {
              if (props.remuxShadow) {
                setOldShadow(props.remuxShadow);
                props.setRemuxShadow("");
              } else {
                props.setRemuxShadow(oldShadow);
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
          value={props.remuxShadow}
          onChange={(e) => props.setRemuxShadow(e.target.value)}
          style={{ maxWidth: 200 }}
        />
      </div>
    </div>
  );
};

export default Shadow;
