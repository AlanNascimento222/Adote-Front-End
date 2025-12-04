import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listarPets, adotarPet } from '../services/api';
import styles from './DetalhesPet.module.css';

export default function DetalhesPet() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPet = async () => {
            console.log("Buscando detalhes do pet ID:", id);
            try {
                const todosPets = await listarPets();
                console.log("Pets carregados:", todosPets);

                // O ID da URL vem como string, garantir comparação correta
                const petEncontrado = todosPets.find(p => String(p.id) === String(id));
                console.log("Pet encontrado:", petEncontrado);

                if (petEncontrado) {
                    setPet(petEncontrado);
                } else {
                    setError('Pet não encontrado.');
                }
            } catch (err) {
                console.error("Erro no fetchPet:", err);
                setError('Erro ao carregar detalhes do pet.');
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    const handleAdotar = async () => {
        try {
            const response = await adotarPet(pet.id);

            // Calcula a data de validade (7 dias a partir de hoje)
            const hoje = new Date();
            const dataValidade = new Date(hoje);
            dataValidade.setDate(hoje.getDate() + 7);

            const dia = String(dataValidade.getDate()).padStart(2, '0');
            const mes = String(dataValidade.getMonth() + 1).padStart(2, '0');
            const ano = dataValidade.getFullYear();
            const validadeFormatada = `${dia}/${mes}/${ano}`;

            // Navega para a página de sucesso com os dados retornados
            navigate('/adocao-sucesso', {
                state: {
                    senha: response.senha || '12345',
                    validade: validadeFormatada
                }
            });
        } catch (error) {
            console.error("Erro ao adotar:", error);
            alert("Erro ao realizar adoção. Tente novamente.");
        }
    };

    if (loading) return <div className={styles.container}>Carregando...</div>;
    if (error) return <div className={styles.container}>{error}</div>;
    if (!pet) return null;

    return (
        <div className={styles.container}>
            <div className={styles.card}>

                {/* Seção de Informações */}
                <div className={styles.infoSection}>
                    <div>
                        <div className={styles.header}>
                            <h1 className={styles.name}>{pet.nome}</h1>
                            <p className={styles.species}>{pet.especie}</p>
                        </div>

                        <div className={styles.statsGrid}>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Idade</span>
                                <span className={styles.statValue}>{pet.idade}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Gênero</span>
                                <span className={styles.statValue}>{pet.genero}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Raça</span>
                                <span className={styles.statValue}>{pet.raca}</span>
                            </div>
                            <div className={styles.statBox}>
                                <span className={styles.statLabel}>Nome Completo</span>
                                <span className={styles.statValue}>{pet.nome} da Silva</span>
                            </div>
                        </div>

                        <div className={styles.descriptionSection}>
                            <h2 className={styles.sectionTitle}>Mais sobre {pet.nome}</h2>
                            <p className={styles.description}>
                                {pet.descricao || `Este é ${pet.nome}, um(a) ${pet.especie} muito especial que está esperando por um lar amoroso. ${pet.nome} é ${pet.raca} e tem ${pet.idade}.`}
                            </p>
                        </div>
                    </div>

                    <button className={styles.adoptButton} onClick={handleAdotar}>
                        Adotar
                    </button>
                </div>

            </div>
        </div>
    );
}
