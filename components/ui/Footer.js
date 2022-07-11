import useSizes from "../util/use-sizes";
import styles from "./Footer.module.css";

const Footer = () => {
  const sizeUtils = useSizes();

  return (
    <div
      className={styles.container1}
      style={{ height: sizeUtils.sizes.footerHeight }}
    >
      <div className={styles.container2}>Footer</div>
    </div>
  );
};

export default Footer;
