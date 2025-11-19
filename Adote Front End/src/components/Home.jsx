import { useState } from 'react'
import styles from '../App.module.css'

export default function Home() {

  return (
    <>
      <div className={styles.containerImg}>
        <div className={styles.container}>
          <div className={styles.containerGeral}>
            <div className={styles.logoImg}>
            </div>
            <div className={styles.containerLogin}>
              <div className={styles.containerTitle}>
                <h1>Bem Vindo</h1>
                <p>Entre para achar seu Pet!</p>
              </div>
              <div className={styles.containerInput}>
                <div className={styles.inputs}>
                  <p>Endereço de Email</p>
                  <input type="text" placeholder='example@email.com' />
                </div>
                <div className={styles.inputs}>
                  <div className={styles.separador}>
                    <p>Senha</p>
                    <p><a href="">Esqueceu sua senha?</a></p>
                  </div>
                  <input type="password" placeholder='senha12345' />
                </div>
              </div>
              <div className={styles.containerButton}>
                <button>
                  Entrar
                </button>
              </div>
              <div className={styles.criarConta}>
                <p>Você não tem uma conta? <a href="">Crie uma conta</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

