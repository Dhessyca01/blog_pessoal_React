import React from 'react';
import homeLogo from '../../assets/home.png'
import './Home.css';
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';


function Home() {
    return (
        <>
        <div className="w-full bg-[#F5DEB3] text-[#8B4513]  font-display flex justify-center">
          <div className='container grid grid-cols-2 text-white'>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className='text-6xl font-bold text-[#008B8B] font-display'>Seja Bem vindo!</h2>
              <p className='text-2xl text-[#181716]'>Nosso espaço para teologar e instaurar debates.</p>
  
              <div className="text-3xl  bg-[#DEB887] flex justify-around gap-6 py-2 px-4">
              <button className=' text-3xl  bg-[#DEB887] flex justify-around gap-5 py-2 px-4'>Postagens <ModalPostagem /></button>
            </div>
            </div>
  
            <div className="flex justify-center ">
              <img src={homeLogo} alt="" className='w-2/3' />

              <img
                            src="home"
                            alt=""
                            className="w-2/3"
                        />
      
            </div>
          </div>
        </div>
        <div className="w-full bg-gradient-to-r from-[#FFEBCD] to-[#FFA07A] text-[#2F4F4F] text-2xl font-bold font-display flex justify-center">
        <ListaPostagens />
        </div>
      </>
    );
}

export default Home;
                        
                    