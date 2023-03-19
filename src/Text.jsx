import styles from './Text.module.scss'

const status = true

function Welcome() {
  return (
    <p className={status ? styles.connected : styles.disconnected}>
      {status ? 'Connecté' : 'Déconnecté'}
    </p>
  )
}

export default Welcome
