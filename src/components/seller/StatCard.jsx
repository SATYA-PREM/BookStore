import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./StatCard.module.css";

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  isPositive = true,
  icon: Icon,
  color = "indigo"
}) {
  return (
    <div className={styles.statCard}>
      <div className={styles.topRow}>
        <div>
          <span className={styles.title}>
            {title}
          </span>
          <div className={styles.value}>
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`${styles.iconContainer} ${styles[color] || styles.indigo}`}>
            <Icon style={{ width: 24, height: 24 }} />
          </div>
        )}
      </div>

      <div className={styles.bottomRow}>
        <div className={styles.subtitle}>{subtitle}</div>

        {change && (
          <div className={`${styles.changeIndicator} ${isPositive ? styles.positive : styles.negative}`}>
            {isPositive ? <TrendingUp style={{ width: 14, height: 14 }} /> : <TrendingDown style={{ width: 14, height: 14 }} />}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
