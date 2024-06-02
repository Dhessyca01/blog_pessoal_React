import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import UsuarioLogin from '../../models/UsuarioLogin';
import { RotatingLines } from 'react-loader-spinner';


function Login() {
  let navigate = useNavigate();

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);

  const {isLoading} = useContext(AuthContext) 

  useEffect(() => {
    if (usuario.token !== "") {
        navigate('/home')
    }
}, [usuario])

function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
  setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value
  })
}

function login(e: ChangeEvent<HTMLFormElement>) {
  e.preventDefault()
  handleLogin(usuarioLogin)
}

  return (
    <>
      <div className="bg-gradient-to-r from-[#8B4513] to-[#FFD700] grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-display ">
        <form className="flex justify-center items-center flex-col w-1/2 gap-7" onSubmit={login}>
          <h2 className="text-[#FFF8DC] text-7xl ">Entrar</h2>
          <div className="text-[#FFF8DC] font-display text-3xl flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="text-[#8B4513] border-4 border-[#DEB887] rounded p-3"
              value={usuarioLogin.usuario} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <div className="text-[#FFF8DC] font-display text-3xl flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="text-[#8B4513] border-4 border-[#DEB887] rounded p-3"
              value={usuarioLogin.senha} 
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
            />
          </div>
          <button  type='submit' className="rounded bg-[#FFDEAD] hover:bg-[#FF6347] text-[#0E0E0E] font-bold text-2xl w-1/2 py-3 flex justify-center">
           {isLoading ? <RotatingLines
            strokeColor="CadetBlue"
            strokeWidth="5"
            animationDuration="0.75"
            width="24"
            visible={true}
          /> :
            <span>Entrar</span>}
          </button>

          <hr className="text-[#F0E68C] text-2xl border-[#F0E68C] w-full" />

          <p>
           
            Ainda não tem uma conta?{''}

            <Link to="/cadastro" className="text-[#F0E68C] text-2xl hover:bg-[#8FBC8F] gap-4">
               Cadastre-se
            </Link>
            </p>
          
        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;