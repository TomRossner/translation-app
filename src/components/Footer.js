import React from 'react';
import {VscGithubInverted} from "react-icons/vsc";
import {TfiLinkedin} from "react-icons/tfi";

const Footer = () => {
  return (
    <>
    <div className='clear'></div>
    <footer>
        <p>Translation & Text-to-Speech App by Tom Rossner&copy; {new Date().getFullYear()}</p>
        <span>|</span>
        <div className='icons-container'>
            <a
                href="https://github.com/TomRossner"
                target="_blank"
                rel="noreferrer"
                className='nav-link'
                title='Tom Rossner on Github'
            >
                <VscGithubInverted className='icon' id='github'/>
            </a>
            <a
                href="https://www.linkedin.com/in/tom-rossner-824b7a233/"
                target="_blank"
                rel="noreferrer"
                className='nav-link'
                title='Tom Rossner on LinkedIn'
            >
                <TfiLinkedin className='icon' id='linkedin'/>
            </a>
        </div>
    </footer>
    </>
  )
}

export default Footer;