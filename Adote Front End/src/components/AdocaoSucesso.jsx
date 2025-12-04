import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import styles from './AdocaoSucesso.module.css'

export default function AdocaoSucesso() {
    const location = useLocation()
    const { senha, validade } = location.state || {}

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Parabens, venha buscar o seu Pet</h1>

                <p className={styles.subtitle}>Seus dados para a busca do Pet são:</p>

                <div className={styles.infoContainer}>
                    <div className={styles.infoBox}>
                        <span className={styles.label}>Senha:</span>
                        <span className={styles.value}>{senha || '-----'}</span>
                    </div>

                    <div className={styles.infoBox}>
                        <span className={styles.label}>Validade:</span>
                        <span className={styles.value}>{validade || '-----'}</span>
                    </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <Link to="/homepage" style={{ color: '#10b981', textDecoration: 'none', fontWeight: 'bold' }}>
                        Voltar para Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
