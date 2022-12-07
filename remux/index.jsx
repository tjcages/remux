import React, { useState, useRef, useEffect } from "react";

import styles from "./styles/preview.module.css";

import Background from "./components/Background";
import Border from "./components/Border";
import Shadow from "./components/Shadow";
import Corner from "./components/Corner";
import Scale from "./components/Scale";

const Remux = (props) => {
  const root = useRef();
  const [loaded, setLoaded] = useState(false);

  // Remux navigation
  const [remuxOpen, setRemuxOpen] = useState(false);
  const [remuxSelected, setRemuxSelected] = useState(null);
  const [remuxSelectedExpanded, setRemuxSelectedExpanded] = useState(false);

  // Components
  const [remuxBackgroundColor, setRemuxBackgroundColor] = useState("#F7F6F3");
  const [remuxBackgroundTexture, setRemuxBackgroundTexture] =
    useState("dotted");
  const [remuxBackgroundTextureColor, setRemuxBackgroundTextureColor] =
    useState("#cfc7b5");
  const [remuxBorder, setRemuxBorder] = useState(
    "2px solid rgba(255,255,255,0.1)"
  );
  const [remuxShadow, setRemuxShadow] = useState(
    "rgba(0, 0, 0, 0.2) 0px 30px 40px -7px"
  );
  const [remuxCornerRadius, setRemuxCornerRadius] = useState("10px");
  const [remuxScale, setRemuxScale] = useState(0.9);

  const items = [
    {
      title: "Background",
      type: "#f7f6f3",
      active: true,
    },
    {
      title: "Border",
      type: "dots #dfdace",
      active: true,
    },
    {
      title: "Shadow",
      type: "checkbox",
      active: true,
    },
    {
      title: "Corner radius",
      type: "checkbox",
      active: true,
    },
    {
      title: "Scale",
      type: "progress",
    },
  ];

  useEffect(() => {
    // only init if dev mode
    if (props.preview) {
      setLoaded(true);

      var backgroundColor =
        props.backgroundColor ??
        window.sessionStorage.getItem("remuxBackgroundColor");
      if (backgroundColor) {
        setRemuxBackgroundColor(backgroundColor);
      }
      var backgroundTexture =
        props.backgroundTexture ??
        window.sessionStorage.getItem("remuxBackgroundTexture");
      if (backgroundTexture) {
        setRemuxBackgroundTexture(backgroundTexture);
      }
      var backgroundTextureColor =
        props.backgroundTextureColor ??
        window.sessionStorage.getItem("remuxBackgroundTextureColor");
      if (backgroundTextureColor) {
        setRemuxBackgroundTextureColor(backgroundTextureColor);
      }
      var border = props.border ?? window.sessionStorage.getItem("remuxBorder");
      if (border) {
        if (border == "null") {
          setRemuxBorder("");
        } else {
          setRemuxBorder(border);
        }
      } else {
        setRemuxBorder("");
      }

      var shadow = props.shadow ?? window.sessionStorage.getItem("remuxShadow");
      if (shadow) {
        if (shadow == "null") {
          setRemuxShadow("");
        } else {
          setRemuxShadow(shadow);
        }
      } else {
        setRemuxShadow("");
      }

      var cornerRadius =
        props.cornerRadius ??
        window.sessionStorage.getItem("remuxCornerRadius");
      if (cornerRadius) {
        if (cornerRadius == "null") {
          setRemuxCornerRadius(0);
        } else {
          setRemuxCornerRadius(cornerRadius);
        }
      } else {
        setRemuxCornerRadius(0);
      }

      var scale = props.scale ?? window.sessionStorage.getItem("remuxScale");
      if (scale) {
        setRemuxScale(scale);
      }
    }
  }, [props]);

  const setStorage = () => {
    window.sessionStorage.setItem("remuxBackgroundColor", remuxBackgroundColor);
    window.sessionStorage.setItem(
      "remuxBackgroundTexture",
      remuxBackgroundTexture
    );
    window.sessionStorage.setItem(
      "remuxBackgroundTextureColor",
      remuxBackgroundTextureColor
    );
    window.sessionStorage.setItem("remuxBorder", remuxBorder);
    window.sessionStorage.setItem("remuxShadow", remuxShadow);
    window.sessionStorage.setItem("remuxCornerRadius", remuxCornerRadius);
    window.sessionStorage.setItem("remuxScale", remuxScale);
  };

  const getPreviewStyle = () => {
    let style = {};

    // Background
    if (root.current) {
      root.current.style.setProperty(
        "--previewBackgroundColor",
        remuxBackgroundColor
      );

      root.current.style.setProperty(
        "--previewBackgroundTint",
        remuxBackgroundTextureColor
      );
    }

    if (loaded) setStorage();

    return style;
  };

  const getContentStyle = () => {
    let style = {};

    // Border
    style.border = remuxBorder;

    // Shadow
    style.boxShadow = remuxShadow;

    // Corner radius
    style.borderRadius = remuxCornerRadius ?? "0px";

    // Scale
    const percentage = remuxScale * 100;
    style.transform = `scale(${remuxScale})`;
    style.zoom = remuxScale;
    style.maxWidth = `clamp(300px, ${percentage}%, calc(${percentage}vh * 4 / 3))`;
    style.maxHeight = `clamp(100px, ${percentage}%, ${percentage}vh)`;

    if (loaded) setStorage();

    return style;
  };

  const renderItem = (item, index) => {
    switch (item.title) {
      case "Background":
        return (
          <Background
            key={index}
            item={item}
            selected={remuxSelected == index}
            remuxSelected={remuxSelected}
            remuxSelectedExpanded={remuxSelectedExpanded}
            setRemuxSelectedExpanded={setRemuxSelectedExpanded}
            setRemuxSelected={() => setRemuxSelected(index)}
            remuxBackgroundColor={remuxBackgroundColor}
            setRemuxBackgroundColor={setRemuxBackgroundColor}
            remuxBackgroundTexture={remuxBackgroundTexture}
            setRemuxBackgroundTexture={setRemuxBackgroundTexture}
            remuxBackgroundTextureColor={remuxBackgroundTextureColor}
            setRemuxBackgroundTextureColor={setRemuxBackgroundTextureColor}
          />
        );
      case "Border":
        return (
          <Border
            key={index}
            item={item}
            selected={remuxSelected == index}
            remuxSelected={remuxSelected}
            setRemuxSelected={() => setRemuxSelected(index)}
            remuxBorder={remuxBorder}
            setRemuxBorder={setRemuxBorder}
          />
        );
      case "Shadow":
        return (
          <Shadow
            key={index}
            item={item}
            selected={remuxSelected == index}
            remuxSelected={remuxSelected}
            setRemuxSelected={() => setRemuxSelected(index)}
            remuxShadow={remuxShadow}
            setRemuxShadow={setRemuxShadow}
          />
        );
      case "Corner radius":
        return (
          <Corner
            key={index}
            item={item}
            selected={remuxSelected == index}
            remuxSelected={remuxSelected}
            setRemuxSelected={() => setRemuxSelected(index)}
            remuxCornerRadius={remuxCornerRadius}
            setRemuxCornerRadius={setRemuxCornerRadius}
          />
        );
      case "Scale":
        return (
          <Scale
            key={index}
            item={item}
            selected={remuxSelected == index}
            remuxSelected={remuxSelected}
            setRemuxSelected={() => setRemuxSelected(index)}
            remuxScale={remuxScale}
            setRemuxScale={setRemuxScale}
          />
        );
    }
  };

  return props.preview ? (
    // Page
    <div
      ref={root}
      className={`${styles.preview} ${remuxOpen && styles.open} ${
        remuxSelectedExpanded && styles.expanded
      } ${remuxBackgroundTexture == "dotted" && styles.dotted} ${
        remuxBackgroundTexture == "boxes" && styles.boxes
      } ${remuxBackgroundTexture == "crosses" && styles.crosses}`}
      style={getPreviewStyle()}
    >
      {/* Preview */}
      <div className={styles.content} style={getContentStyle()}>
        {props.children}
      </div>
      <div
        className={`${styles.navigation} ${remuxOpen && styles.open} ${
          remuxSelectedExpanded && styles.expanded
        }`}
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.title}>Remux</div>
          <button
            className={styles.button}
            onClick={() => {
              setRemuxOpen(!remuxOpen);
              setRemuxSelected(null);
              setRemuxSelectedExpanded(false);
            }}
          >
            {remuxOpen ? "Close" : "Open"}
          </button>
        </div>

        {/* Options */}
        <div className={styles.options}>
          {items.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </div>
  ) : (
    props.children
  );
};

export default Remux;
