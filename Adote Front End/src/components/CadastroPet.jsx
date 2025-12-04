import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { criarPet } from '../services/api'
import styles from './CadastroPet.module.css'

export default function CadastroPet() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        nome: '',
        especie: '',
        raca: '',
        genero: '',
        idade: '',
        descricao: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await criarPet(formData)
            alert('Pet cadastrado com sucesso!')
            // Redireciono para a homepage após o cadastro com sucesso
            navigate('/homepage')
        } catch (err) {
            console.error(err)
            setError('Erro ao cadastrar pet. Verifique se você é admin e tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Vamos adicionar o PET para a Adoção</h1>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="nome">Nome do Pet</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="nome"
                            name="nome"
                            placeholder="Ex: Vina"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="especie">Espécie</label>
                        <select
                            className={styles.select}
                            id="especie"
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Cachorro">Cachorro</option>
                            <option value="Gato">Gato</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="raca">Raça</label>
                        <input
                            className={styles.input}
                            type="text"
                            id="raca"
                            name="raca"
                            placeholder="Ex: Golden Retriever"
                            value={formData.raca}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label} htmlFor="genero">Gênero</label>
                        <select
                            className={styles.select}
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Fêmea">Fêmea</option>
                        </select>
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="idade">Idade</label>
                    <input
                        className={styles.input}
                        type="text"
                        id="idade"
                        name="idade"
                        placeholder="Ex: 2 anos"
                        value={formData.idade}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label className={styles.label} htmlFor="descricao">Descrição</label>
                    <textarea
                        className={styles.textarea}
                        id="descricao"
                        name="descricao"
                        placeholder="Fale um pouco sobre o Pet..."
                        value={formData.descricao}
                        onChange={handleChange}
                        required
                    />
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}

                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar para Adoção'}
                </button>
            </form>
        </div>
    )
}
