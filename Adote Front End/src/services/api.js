import axios from "axios";

// 1. Criamos a instância com a URL base da sua API
export const api = axios.create({
  baseURL: "https://adote-back-end.onrender.com/usuario",
});


export const login = async (email, senha) => {
  // O Axios já entende que é JSON e já faz o stringify automático
  const response = await api.post("/login", {
    email: email,
    senha: senha,
  });

  // O Axios retorna os dados do backend dentro de "data"
  return response.data;
};


export const criarUsuario = async (dadosUsuario) => {

  const response = await api.post("/", dadosUsuario);

  // Retorna apenas os dados relevantes 
  return response.data;
};

export const listarPets = async () => {
  // Recupera o token salvo no navegador (supondo que você salvou no Login)
  const token = localStorage.getItem('token');

  // Faz a requisição POST enviando o token no Header
  const response = await api.post("/pet/listar", {}, {
    headers: {
      // O padrão é "Bearer SEU_TOKEN", ajuste se seu back usar outro formato
      authorization: `${token}`
    }
  });

  // Você disse que os pets chegam dentro de "message"
  return response.data.message;
};

export const criarPet = async (dadosPet) => {
  const token = localStorage.getItem('token');

  const response = await api.post("/pet", dadosPet, {
    headers: {
      authorization: `${token}`
    }
  });

  return response.data;
};

export const adotarPet = async (id) => {
  const token = localStorage.getItem('token');

  const response = await api.post(`/pet/adotar/${id}`, {}, {
    headers: {
      authorization: `${token}`
    }
  });

  return response.data;
};