import usePasswordStrength from "@/hooks/use-password-strength";

import styles from "./PasswordStrength.module.scss";

const PasswordStrength = ({ password }: { password?: string }) => {
  const strength = usePasswordStrength(password);
  const width: string =
    strength === "very weak"
      ? "10%"
      : strength === "weak"
      ? "25%"
      : strength === "moderate"
      ? "50%"
      : strength === "strong"
      ? "80%"
      : strength === "powerfull"
      ? "100%"
      : "2%";

  return (
    <div
      className={`${styles.wrapper} ${styles[strength.replaceAll(" ", "-")]}`}
    >
      <div className={styles.bar}>
        <span className={styles["bar-item"]} style={{ width }}></span>
      </div>
      <span className={styles.text}>{strength}</span>
    </div>
  );
};

export default PasswordStrength;
