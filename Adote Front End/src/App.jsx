import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import styles from './Home.module.css'
import Home from './components/Home'
import CriarConta from './components/CriarConta'
import CadastroPet from './components/CadastroPet'
import Homepage from './components/Homepage'
import DetalhesPet from './components/DetalhesPet'
import AdocaoSucesso from './components/AdocaoSucesso'
import GerenciarUsuarios from './components/GerenciarUsuarios'

export default function App() {
  // Aqui eu defino as rotas da minha aplicação para navegar entre as páginas
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/criar-conta" element={<CriarConta />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/cadastro-pet" element={<CadastroPet />} />
        <Route path="/pet/:id" element={<DetalhesPet />} />
        <Route path="/adocao-sucesso" element={<AdocaoSucesso />} />
        <Route path="/gerenciar-usuarios" element={<GerenciarUsuarios />} />
      </Routes>
    </Router>
  )
}

