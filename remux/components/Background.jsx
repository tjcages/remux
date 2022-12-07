import React, { useState, useRef } from "react";

import styles from "../styles/background.module.css";

import Selector from "./shared/Selector";

const Background = (props) => {
  const baseHeight = 43;
  const optionsHeight = 57;

  const [selectorOpen, setSelectorOpen] = useState(null);

  const options = [
    {
      title: "Texture",
      type: "selector",
    },
    {
      title: "Texture Color",
      type: "color",
    },
    // {
    //   title: "Blur",
    //   type: "filter",
    // },
  ];

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div
      className={`${styles.item} ${props.selected && styles.selected}`}
      style={{
        maxHeight: props.remuxSelectedExpanded
          ? baseHeight + optionsHeight * options.length
          : baseHeight,
      }}
      onClick={() => props.setRemuxSelected()}
    >
      <div className={styles.itemMain}>
        <div className={styles.row}>
          <div
            className={`${styles.expand} ${
              props.remuxSelectedExpanded && styles.open
            }`}
            onClick={() =>
              props.setRemuxSelectedExpanded(!props.remuxSelectedExpanded)
            }
          >
            ▼
          </div>
          <div className={styles.title}>{props.item.title}</div>
        </div>
        <div className={styles.row}>
          <input
            className={styles.selector}
            value={props.remuxBackgroundColor}
            onChange={(e) => props.setRemuxBackgroundColor(e.target.value)}
            style={{ maxWidth: 90 }}
          />
        </div>
      </div>
      <div
        className={`${styles.itemOptions} ${
          props.remuxSelectedExpanded && styles.open
        }`}
      >
        {options.map((option, index) => {
          return (
            <div key={`background-options-${index}`} className={styles.option}>
              <div className={styles.row}>{option.title}</div>
              {option.type == "selector" && (
                <>
                  <div
                    className={styles.selector}
                    onClick={() => setSelectorOpen(option.type)}
                  >
                    <div className={styles.value}>
                      {capitalizeFirstLetter(props.remuxBackgroundTexture)}
                    </div>
                    <div className={styles.divider}>▼</div>
                  </div>
                  {selectorOpen == option.type && (
                    <Selector
                      option={option}
                      selector={selectorOpen}
                      setSelectorOpen={setSelectorOpen}
                      setRemuxBackgroundTexture={(value) => {
                        props.setRemuxBackgroundTexture(value);
                        setSelectorOpen(null);
                      }}
                    />
                  )}
                </>
              )}
              {option.type !== "selector" && (
                <input
                  className={styles.selector}
                  value={props.remuxBackgroundTextureColor}
                  onChange={(e) =>
                    props.setRemuxBackgroundTextureColor(e.target.value)
                  }
                  style={{ maxWidth: 90 }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Background;
