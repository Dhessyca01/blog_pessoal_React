import React, { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Usuario from '../../models/Usuario'
import { cadastrarUsuario } from '../../services/Service'
import './Cadastro.css'
import { toastAlerta } from '../../util/toastAlerta'
import { RotatingLines } from 'react-loader-spinner'

function Cadastro() {

  let navigate = useNavigate()

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [confirmaSenha, setConfirmaSenha] = useState<string>("")

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  const [usuarioResposta, setUsuarioResposta] = useState<Usuario>({
    id: 0,
    nome: '',
    usuario: '',
    senha: '',
    foto: ''
  })

  useEffect(() => {
    if (usuarioResposta.id !== 0) {
      retornar()
    }

  }, [usuarioResposta])

  function retornar() {
    navigate('/login')
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmaSenha(e.target.value)
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    })
  }

  async function cadastrarNovoUsuario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault()

    if (confirmaSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true)

      try {
        await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuarioResposta)
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')

      } catch (error) {
        toastAlerta('Usuário cadastrado com sucesso', 'sucesso')
      }

    } else {
      toastAlerta('Dados inconsistentes. Verifique as informações de cadastro.', 'erro')
      setUsuario({...usuario, senha: ''});
        setConfirmaSenha('');
        }

        setIsLoading(false)
  }

  return (
    <>
      <div className="bg-gradient-to-r from-[#8B4513] to-[#DEB887] text-1xl grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-display">
        <div className="fundoCadastro hidden lg:block"></div>
        <form className='flex justify-center items-center flex-col w-2/3 gap-3' onSubmit={cadastrarNovoUsuario}>
          <h2 className='text-bold text-5xl'>Cadastrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="bg-gradient-to-r from-[#FFFACD] to-[#FFE4B5] font-bold border-3 border-slate-900 rounded p-3"
              value={usuario.nome} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuario</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="bg-gradient-to-r from-[#FFFACD] to-[#FFE4B5] font-bold border-3 rounded p-3"
              value={usuario.usuario} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="foto">Foto</label>
            <input
              type="text"
              id="foto"
              name="foto"
              placeholder="Foto"
              className="bg-gradient-to-r from-[#FFFACD] to-[#FFE4B5] font-bold border-3 rounded p-3"
              value={usuario.foto} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="bg-gradient-to-r from-[#FFFACD] to-[#FFE4B5] font-bold border-3 rounded p-3"
              value={usuario.senha} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="confirmarSenha">Confirmar Senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar Senha"
              className="bg-gradient-to-r from-[#FFFACD] to-[#FFE4B5] font-bold border-3 rounded p-3"
              value={confirmaSenha}
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
            />
          </div>
          <div className="flex justify-around w-full gap-8">
            <button className='rounded text-[#8B4513] font-bold bg-gradient-to-r from-[#FFFACD] to-[#FFD700] hover:bg-[#D2691E] w-1/2 py-2' onClick={retornar}>
              Cancelar
            </button>
            <button
                        type='submit'
                        className='rounded text-[#8B4513] font-bold bg-gradient-to-r from-[#FFD700] to-[#FFFACD] hover:bg-[#D2691E] w-1/2 py-2
                            flex justify-center'
                    >
                        {isLoading ? <RotatingLines
                            strokeColor="#F4A460"
                            strokeWidth="5"
                            animationDuration="0.50"
                            width="24"
                            visible={true}
                        /> :
                        <span>Cadastrar</span>
                    }
                    </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Cadastro