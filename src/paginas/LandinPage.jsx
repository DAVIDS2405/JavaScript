import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logoDarkMode from '../assets/dark.png';
import logoLightMode from '../assets/light.jpg';
import logoFacebook from '../assets/facebook.png';
import logoGithub from '../assets/github.png';
import logoPerro from '../assets/doglost.jpg';

export const LandinPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const logoSrc = darkMode ? logoDarkMode : logoLightMode;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
        <section>
          <nav className='p-10 mb-12 flex justify-between'>
            <h1 className='text-2xl font-bold dark:text-white'>VETERINARIA</h1>
            <ul className='flex items-center'>
              <li>
                <img
                  onClick={() => setDarkMode(!darkMode)}
                  className='cursor-pointer'
                  src={logoSrc}
                  alt='logo'
                  width={40}
                  height={40}
                />
              </li>
              <li>
                <Link
                  to='/login'
                  className='bg-gray-600 text-slate-400 px-6 py-2 rounded-full ml-8 hover:bg-gray-900 hover:text-white'
                  href='#'
                >
                  Login
                </Link>
              </li>
            </ul>
          </nav>

          <div className='text-center'>
            <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>Veterinaria</h2>
            <h3 className='text-2xl py-2 md:text-3xl dark:text-white'>Estamos para cuidar de tus mascotas</h3>
            <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>
              En nuestro centro veterinario, nos dedicamos plenamente a cuidar y proteger la salud de tus fieles compañeros animales.
            </p>
          </div>
          <div className='text-5xl flex justify-center gap-16 py-3'>
            <a href='https://www.facebook.com/groups/438888482803501/?locale=es_LA' target='_blank' rel='noopener noreferrer'>
              <img src={logoFacebook} alt='logo-redes' width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />
            </a>
            <a href='https://github.com/MiguelCarapaz/Frontend.git' target='_blank' rel='noopener noreferrer'>
              <img src={logoGithub} alt='logo-redes' width={50} height={50} className={'dark:border-2 border-teal-300 rounded-full'} />
            </a>
          </div>

          <div className='relative mx-auto  bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
            <img src={logoPerro} alt='logo-rocket' />
          </div>
        </section>
      </main>
    </div>
  );
};
