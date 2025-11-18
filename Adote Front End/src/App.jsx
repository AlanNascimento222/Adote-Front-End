import { useState } from 'react'
import styles from './App.module.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className={styles.containerImg}>
        <div className={styles.container}>
          <div className={styles.containerGeral}>
            <div className={styles.logoImg}>
            </div>
            <div className={styles.containerLogin}>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
