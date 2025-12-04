import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Homepage.module.css';
import { listarPets, api } from '../services/api';

export default function Homepage() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuarioNome');
        localStorage.removeItem('usuarioAdmin');
        localStorage.removeItem('usuarioId');
        api.defaults.headers.common['Authorization'] = '';
        navigate('/');
    };

    useEffect(() => {
        const storedName = localStorage.getItem('usuarioNome');
        const storedAdmin = localStorage.getItem('usuarioAdmin');

        if (storedName) setUserName(storedName);
        // O admin pode vir como boolean ou string "true"/"false" ou 1/0
        setIsAdmin(storedAdmin === 'true' || storedAdmin === true || storedAdmin === '1');

        const carregarPets = async () => {
            try {
                const listaDePets = await listarPets();
                // O banco retorna um array de objetos (id, nome, especie, etc)
                setPets(listaDePets);
            } catch (error) {
                console.error("Erro ao buscar pets:", error);
                setErro("Não foi possível carregar os pets. Verifique seu login.");
            } finally {
                setLoading(false);
            }
        };

        carregarPets();
    }, []);

    // Função de filtragem
    const filteredPets = pets.filter(pet => {
        // Filtro de Texto (Nome, Raça, Espécie)
        const matchesSearch =
            pet.nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.raca?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pet.especie?.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro de Gênero
        const matchesGender = genderFilter ? pet.genero === genderFilter : true;

        return matchesSearch && matchesGender;
    });

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}> Adote <div className={styles.logoImage}></div></div>
                <div className={styles.navButtons}>
                    <button className={`${styles.navBtn} ${styles.btnAdotar}`}>Adotar</button>
                    {isAdmin && (
                        <button
                            className={`${styles.navBtn} ${styles.btnDoar}`}
                            onClick={() => navigate('/cadastro-pet')}
                        >
                            Doar
                        </button>
                    )}
                </div>
                <div className={styles.userProfile}>
                    <span>Olá, {userName || 'Usuário'}</span>
                    <div className={styles.avatar}>👤</div>
                    <button
                        onClick={handleLogout}
                        style={{
                            marginLeft: '10px',
                            background: 'transparent',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '5px 10px',
                            cursor: 'pointer',
                            color: 'inherit'
                        }}
                    >
                        Sair
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1>Procurando um amigo?</h1>
                    <span className={styles.highlight}>Então está no lugar certo</span>
                </div>
                <div className={styles.heroImage}>
                    {/* Imagem estática ilustrativa para o banner */}
                    <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=500" alt="Cachorro Feliz" />
                </div>
            </section>

            {/* Área Principal */}
            <div className={styles.contentArea}>

                {/* Barra de Pesquisa */}
                <div className={styles.searchBar}>
                    <span style={{ paddingLeft: '10px' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Procurar por palavra chave"
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filtros Visuais */}
                <div className={styles.filters}>
                    <select
                        className={styles.filterTag}
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: 'inherit', color: 'inherit' }}
                    >
                        <option value="">Gênero ▼</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
                </div>

                {/* Listagem */}
                {loading ? (
                    <p>Carregando pets...</p>
                ) : erro ? (
                    <p style={{ color: 'red' }}>{erro}</p>
                ) : (
                    <div className={styles.petsGrid}>
                        {filteredPets.map((pet) => (
                            <div
                                key={pet.id}
                                className={styles.card}
                                onClick={() => navigate(`/pet/${pet.id}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                {/* Como não tem foto no BD, usamos placeholder */}
                                <div className={styles.cardInfo}>
                                    <h3>{pet.nome}</h3>
                                    <div className={styles.petDetails}>
                                        <span>{pet.raca} • {pet.especie}</span>
                                        <span>{pet.idade}, {pet.genero}</span>

                                        {/* Badge de Status */}
                                        <span className={`
                                            ${styles.statusBadge} 
                                            ${pet.status === 'disponivel' ? styles.statusDisponivel : styles.statusAdotado}
                                        `}>
                                            {pet.status || 'Disponível'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {filteredPets.length === 0 && <p>Nenhum pet encontrado.</p>}
                    </div>
                )}
            </div>
        </div>
    );
}