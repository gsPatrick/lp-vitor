// /app/components/BrazilExpansion/CopacabanaWave.js
import styles from './BrazilExpansion.module.css';

const CopacabanaWave = ({ waveRef }) => (
  <svg
    className={styles.waveDivider}
    width="100%"
    height="30"
    viewBox="0 0 100 10"
    preserveAspectRatio="none"
  >
    <path
      ref={waveRef}
      d="M 0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5"
      fill="none"
      stroke="var(--accent-color)"
      strokeWidth="0.3"
      strokeLinecap="round"
    />
  </svg>
);

export default CopacabanaWave;