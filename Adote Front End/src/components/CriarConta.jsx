import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../CriarConta.module.css'; 
import { criarUsuario } from '../services/api'; 

export default function CriarConta() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        cpf: '',
        telefone: '',
        tipo: 'usuario'
    });

    const [erro, setErro] = useState('');
    const [sucesso, setSucesso] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setSucesso('');

        // --- Validações Locais (Frontend) ---
        if (!formData.nome || !formData.email || !formData.senha || !formData.cpf || !formData.telefone) {
            setErro('Preencha todos os campos obrigatórios');
            return;
        }

        if (formData.senha !== formData.confirmarSenha) {
            setErro('As senhas não coincidem');
            return;
        }

        if (formData.senha.length < 6) {
            setErro('A senha deve ter no mínimo 6 caracteres');
            return;
        }

        try {
            setLoading(true);

            // Prepara o objeto exatamente como o backend espera
            const payload = {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                cpf: formData.cpf,
                telefone: formData.telefone,
                tipo: formData.tipo
            };

            // --- CHAMADA DA API VIA AXIOS ---
            // A função criarUsuario já faz o POST e retorna os dados
            const dadosRetorno = await criarUsuario(payload);

            // Se chegou aqui, deu sucesso (201)
            setSucesso('Conta criada com sucesso! Redirecionando...');
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            // --- TRATAMENTO DE ERRO DO AXIOS ---
            // O Axios joga o erro do backend em error.response.data
            if (error.response && error.response.data && error.response.data.mensagem) {
                setErro(error.response.data.mensagem);
            } else {
                setErro('Erro ao conectar com o servidor. Tente novamente.');
            }
            console.error("Erro detalhado:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Bem Vindo</h1>
                <p className={styles.subtitle}>Entre para achar o seu Pet!</p>

                {erro && <div className={`${styles.mensagem} ${styles.erro}`}>{erro}</div>}
                {sucesso && <div className={`${styles.mensagem} ${styles.sucesso}`}>{sucesso}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome" className={styles.label}>Seu nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            className={styles.input}
                            value={formData.nome}
                            onChange={handleChange}
                            placeholder="Ex: João da Silva"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Endereço de Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="cpf" className={styles.label}>Seu CPF</label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            className={styles.input}
                            value={formData.cpf}
                            onChange={handleChange}
                            placeholder="000.000.000-00"
                            maxLength="14"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="telefone" className={styles.label}>Telefone Celular</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            className={styles.input}
                            value={formData.telefone}
                            onChange={handleChange}
                            placeholder="(11) 99999-9999"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="tipo" className={styles.label}>Eu quero:</label>
                        <select 
                            id="tipo" 
                            name="tipo" 
                            className={styles.input} 
                            value={formData.tipo} 
                            onChange={handleChange}
                        >
                            <option value="usuario">Adotador</option>
                            <option value="admin">Administrar</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="senha" className={styles.label}>Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            className={styles.input}
                            value={formData.senha}
                            onChange={handleChange}
                            placeholder="Crie uma senha"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="confirmarSenha" className={styles.label}>Confirmar Senha</label>
                        <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            className={styles.input}
                            value={formData.confirmarSenha}
                            onChange={handleChange}
                            placeholder="Repita a senha"
                        />
                    </div>

                    <div className={styles.botaoWrapper}>
                        <button type="submit" className={styles.btnCriar} disabled={loading}>
                            {loading ? 'Criando...' : 'Criar Conta'}
                        </button>
                    </div>
                </form>

                <p className={styles.footerLink}>
                    Já tem uma conta? <Link to="/login">Faça Login</Link>
                </p>
            </div>
        </div>
    );
}