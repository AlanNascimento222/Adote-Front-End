import { useState } from 'react'
import { login } from '../API/usuario'
import styles from '../App.module.css'

export default function Home() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')


  async function handleChange(email, senha) {
    if (!senha || !email) {
      alert("Preencha todos os campos.")
      return
    }
    try {
      const credentials = {
        email: email,
        password: senha
      }
      const resposta = await login(credentials)
      console.log("Login realizado com sucesso:", resposta)
      alert("Bem vindo!")
    }
    catch (err) {
      alert("erro na requisição")
      return
    }
  }

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
                  <input
                    type="text"
                    placeholder='example@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputs}>
                  <div className={styles.separador}>
                    <p>Senha</p>
                    <p><a href="">Esqueceu sua senha?</a></p>
                  </div>
                  <input
                    type="password"
                    placeholder='12345678'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)} />
                </div>
              </div>
              <div className={styles.containerButton}>
                <button onClick={() => {handleChange(email, senha)}}>
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

