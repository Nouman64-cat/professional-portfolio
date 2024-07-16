import { useState } from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
const LeftSide = () => {
  const [activeLink, setActiveLink] = useState('about');

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };
  const copyEmailToClipboard = () => {
    const email = 'noumanejazghost@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      toast.success('Email address copied to clipboard!');
    }).catch(() => {
      toast.error('Failed to copy email address.');
    });
  };
  return (
    <div className="bg-primary-Primary top-0 h-screen w-full pl-[15rem] py-[5rem] sticky grid grid-cols-1 content-between" >
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl text-white font-montserrat font-medium">Nouman Ejaz</h1>
        <p className="text-white font-poppins font-normal">Full Stack Developer</p>
        <p className="text-primary-lightGray font-poppins font-normal w-[40%] text-[12px]">
          I build pixel-perfect, engaging, and accessible digital experiences.
        </p>
        <nav className="flex flex-col space-y-4 text-primary-lightGray font-montserrat text-sm mt-[30%]">
          <a
            href="#about"
            className={`hover:text-special cursor-pointer ${activeLink === 'about' ? 'text-green-400' : ''}`}
            onClick={() => handleSetActiveLink('about')}
          >
            About
          </a>
          <a
            href="#experience"
            className={`hover:text-green-400 cursor-pointer ${activeLink === 'experience' ? 'text-green-400' : ''}`}
            onClick={() => handleSetActiveLink('experience')}
          >
            Experience
          </a>
          <a
            href="#projects"
            className={`hover:text-green-400 cursor-pointer ${activeLink === 'projects' ? 'text-green-400' : ''}`}
            onClick={() => handleSetActiveLink('projects')}
          >
            Projects
          </a>
          <a
            href="#contact"
            className={`hover:text-green-400 cursor-pointer ${activeLink === 'contact' ? 'text-green-400' : ''}`}
            onClick={() => handleSetActiveLink('contact')}
          >
            Contact
          </a>
        </nav>
        <div className='flex justify-between w-[40%] mt-[50%]'>
          <a href="https://www.linkedin.com/in/nouman-ejaz-64251125b/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
            <FaLinkedin size={18} />
          </a>
          <a href="https://github.com/Nouman64-cat" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-400">
            <FaGithub size={18} />
          </a>
          <button onClick={copyEmailToClipboard} className="text-white hover:text-green-400">
            <FaEnvelope size={18} />
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LeftSide;
