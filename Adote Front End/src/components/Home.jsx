import { useState } from 'react';
import styles from '../Home.module.css';
import { login, api } from '../services/api';
import { Link, useNavigate } from 'react-router-dom'; // Importe o useNavigate hook

export default function Home() {
  const navigate = useNavigate(); // Inicializa o hook de navegação

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function fazerLogin() {
    if (!email || !senha) {
      alert("Preencha email e senha");
      return;
    }

    setLoading(true);

    try {
      const dados = await login(email, senha);

      console.log("Resposta do Backend:", dados);

      if (dados.token) {
        localStorage.setItem('token', dados.token);
        api.defaults.headers.common['Authorization'] = dados.token;

        // Tenta extrair informações do token (se for JWT)
        try {
          const parseJwt = (token) => {
            try {
              return JSON.parse(atob(token.split('.')[1]));
            } catch (e) {
              return null;
            }
          };

          const decoded = parseJwt(dados.token);
          console.log("Token Decodificado:", decoded);

          if (decoded) {
            // Verifica se é admin pelo token ou pela resposta direta
            // Ajuste os campos conforme o seu backend retorna (ex: .admin, .role, .tipo)
            const isAdmin = decoded.admin || decoded.tipo === 'admin' || dados.admin || dados.tipo === 'admin';
            const nome = decoded.nome || dados.nome || decoded.sub || "Usuário"; // Fallback

            localStorage.setItem('usuarioAdmin', isAdmin ? 'true' : 'false');
            localStorage.setItem('usuarioNome', nome);

            // Se tiver ID no token ou na resposta
            if (dados.usuarioId || decoded.id) {
              localStorage.setItem('usuarioId', dados.usuarioId || decoded.id);
            }
          }
        } catch (error) {
          console.error("Erro ao processar token:", error);
        }

        navigate('/homepage');
      } else {
        alert("Erro: O servidor não retornou o token.");
      }
    } catch (error) {
      console.error("Erro no login:", error);

      if (error.response) {
        alert(error.response.data.mensagem || "Erro ao realizar login");
      } else if (error.request) {
        alert("Erro de conexão com o servidor.");
      } else {
        alert("Ocorreu um erro inesperado.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className={styles.containerImg}>
        <div className={styles.container}>
          <div className={styles.containerGeral}>
            <div className={styles.logoImg}></div>
            <div className={styles.containerLogin}>
              <div className={styles.containerTitle}>
                <h1>Bem Vindo</h1>
                <p>Entre para achar seu Pet!</p>
              </div>

              <div className={styles.containerInput}>
                <div className={styles.inputs}>
                  <p>Endereço de Email</p>
                  <input
                    type="email"
                    placeholder='example@email.com'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className={styles.inputs}>
                  <div className={styles.separador}>
                    <p>Senha</p>
                    <p><Link to="/recuperar-senha" style={{ textDecoration: 'none', color: 'inherit' }}>Esqueceu sua senha?</Link></p>
                  </div>
                  <input
                    type="password"
                    placeholder='senha12345'
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.containerButton}>
                <button onClick={fazerLogin} disabled={loading}>
                  {loading ? 'Carregando...' : 'Entrar'}
                </button>
              </div>

              <div className={styles.criarConta}>
                <p>Você não tem uma conta? <Link to="/criar-conta">Criar uma conta</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
