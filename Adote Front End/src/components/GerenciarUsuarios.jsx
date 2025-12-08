import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { listarUsuarios, deletarUsuario } from '../services/api'
import styles from './GerenciarUsuarios.module.css'

export default function GerenciarUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [idParaDeletar, setIdParaDeletar] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        carregarUsuarios()
    }, [])

    const carregarUsuarios = async () => {
        try {
            setLoading(true)
            const dados = await listarUsuarios()
            // Se a API retornar um array, uso ele. Se não, tento achar onde está a lista.
            if (Array.isArray(dados)) {
                setUsuarios(dados)
            } else if (dados.mensagem && Array.isArray(dados.mensagem)) {
                setUsuarios(dados.mensagem)
            } else if (dados.usuarios && Array.isArray(dados.usuarios)) {
                setUsuarios(dados.usuarios)
            } else {
                // Se não conseguir listar, deixo vazio mas não dou erro fatal, pois pode ser que a rota de listar não exista
                console.warn("Formato de lista de usuários desconhecido ou rota inexistente", dados)
            }
        } catch (err) {
            console.error("Erro ao listar usuários:", err)
            setError("Não foi possível carregar a lista de usuários. Talvez você não tenha permissão ou a rota não exista.")
        } finally {
            setLoading(false)
        }
    }

    const handleDeletar = async (id) => {
        if (!confirm("Tem certeza que deseja excluir este usuário?")) return

        try {
            await deletarUsuario(id)
            alert("Usuário excluído com sucesso!")
            carregarUsuarios() // Recarrega a lista
            setIdParaDeletar('')
        } catch (err) {
            console.error("Erro ao deletar:", err)
            alert("Erro ao excluir usuário. Verifique se o ID está correto e se você tem permissão.")
        }
    }

    const handleDeletarPorInput = (e) => {
        e.preventDefault()
        if (!idParaDeletar) return
        handleDeletar(idParaDeletar)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Gerenciar Usuários</h1>

                <button onClick={() => navigate('/homepage')} className={styles.btnVoltar}>
                    Voltar para Home
                </button>

                <div className={styles.deleteSection}>
                    <h2>Excluir Usuário por ID</h2>
                    <form onSubmit={handleDeletarPorInput} className={styles.formDelete}>
                        <input
                            type="text"
                            placeholder="ID do usuário"
                            value={idParaDeletar}
                            onChange={(e) => setIdParaDeletar(e.target.value)}
                            className={styles.input}
                        />
                        <button type="submit" className={styles.btnDelete}>Excluir</button>
                    </form>
                </div>

                <div className={styles.listSection}>
                    <h2>Lista de Usuários</h2>
                    {loading ? (
                        <p>Carregando...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : usuarios.length === 0 ? (
                        <p>Nenhum usuário encontrado ou lista indisponível.</p>
                    ) : (
                        <ul className={styles.userList}>
                            {usuarios.map(user => (
                                <li key={user.id} className={styles.userItem}>
                                    <span>
                                        <strong>{user.nome}</strong> ({user.email}) - ID: {user.id} - Tipo: {user.tipo || 'User'}
                                    </span>
                                    <button
                                        onClick={() => handleDeletar(user.id)}
                                        className={styles.btnDeleteSmall}
                                    >
                                        Excluir
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}
