import axios from "axios"

// Crio a instância do axios com a URL base da API
export const api = axios.create({
  baseURL: "https://adote-back-end.onrender.com/usuario",
})


export const login = async (email, senha) => {
  // O Axios já converte para JSON automaticamente
  const response = await api.post("/login", {
    email: email,
    senha: senha,
  })

  // Retorno os dados recebidos do backend
  return response.data
}


export const criarUsuario = async (dadosUsuario) => {

  const response = await api.post("/", dadosUsuario)

  // Retorno apenas os dados relevantes da resposta
  return response.data
}

export const listarPets = async () => {
  // Recupero o token salvo no localStorage
  const token = localStorage.getItem('token')

  // Faço a requisição POST enviando o token no cabeçalho
  const response = await api.post("/pet/listar", {}, {
    headers: {
      // Configuro o cabeçalho de autorização com o token
      authorization: `${token}`
    }
  })

  return response.data.message
}

export const criarPet = async (dadosPet) => {
  const token = localStorage.getItem('token')

  const response = await api.post("/pet", dadosPet, {
    headers: {
      authorization: `${token}`
    }
  })

  return response.data
}

export const adotarPet = async (id) => {
  const token = localStorage.getItem('token')

  const response = await api.post(`/pet/adotar/${id}`, {}, {
    headers: {
      authorization: `${token}`
    }
  })

  return response.data
}