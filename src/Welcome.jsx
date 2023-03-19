import styles from './Welcome.module.scss'

function Welcome() {
  return (
    <div className={styles.parent}>
      <p className={styles.enfant}>Bienvenue !</p>
    </div>
  )
}

export default Welcome
