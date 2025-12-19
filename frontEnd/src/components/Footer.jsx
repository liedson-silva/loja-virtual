import React from 'react'
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className='border-t'>
            <div className='flex items-center gap-10 justify-center'>
                <p>&copy; {new Date().getFullYear()} Loja Virtual. Todos os direitos reservados. </p>
                <div className='flex gap-5'>
                    <a href="https://github.com/liedson-silva" target="_blank" className='hover:text-primary-100'><FaGithub /></a>
                    <a href="https://www.linkedin.com/in/liedson-silva-20b78b295/" target="_blank" className='hover:text-primary-100'><FaLinkedin /></a>
                    <a href="https://www.instagram.com/liedsonprx/" target="_blank" className='hover:text-primary-100'><FaInstagramSquare /></a>
                </div>
        </div>
        </footer >
    )
}

export default Footer