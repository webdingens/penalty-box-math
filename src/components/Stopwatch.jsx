import { useEffect, useRef, useContext } from "react";
import SettingsContext from "../SettingsContext";
import stopwatch from "../assets/stopwatch.png";
import classNames from "classnames";
import styles from "./Stopwatch.module.scss";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";

function Stopwatch({ time, zoomable = true, smallStopwatch = null }) {
  const moduleDOM = useRef();
  const settings = useContext(SettingsContext.Context);

  useEffect(() => {
    let raf;
    const onResize = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        moduleDOM.current.style.setProperty(
          "--watch-width",
          moduleDOM.current.clientWidth + "px"
        );
        raf = null;
      });
    };
    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [settings.smallStopwatch]);

  const showSmallStopwatch =
    !zoomable && typeof smallStopwatch === "boolean"
      ? smallStopwatch
      : settings.smallStopwatch;

  return (
    <div
      className={classNames(styles.stopwatch, {
        [styles.smallStopwatch]: showSmallStopwatch,
      })}
      ref={moduleDOM}
    >
      {!showSmallStopwatch ? (
        <img
          src={stopwatch}
          alt=""
          width="300px"
          style={{
            aspectRatio: 335 / 394,
          }}
        />
      ) : (
        <div className={styles.lcdDisplay}></div>
      )}

      <p className={styles.timeOverlay}>
        <span className={styles.timeOverlay__left}>
          {Math.floor(time / 60)}
        </span>
        :
        <span className={styles.timeOverlay__right}>
          {String(time % 60).padStart(2, "0")}
          <span className={styles.timeOverlay__milliseconds}>00</span>
        </span>
      </p>

      {zoomable ? (
        <button
          type="button"
          onClick={() => settings.setSmallStopwatch(!settings.smallStopwatch)}
          title="Toggle between LCD only and full smartwatch"
        >
          {settings.smallStopwatch ? <FiZoomOut /> : <FiZoomIn />}
        </button>
      ) : null}
    </div>
  );
}

export default Stopwatch;
