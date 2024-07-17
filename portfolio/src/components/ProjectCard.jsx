import { useState } from "react";
import Hashtag from "./Hashtag";
import { FaLink } from "react-icons/fa6";
import PropTypes from 'prop-types';

export const ProjectCard = ({ title, tags=[], description, left, link }) => {
    const [active, setActive] = useState(false);

    const handleMouseEnter = () => {
      setActive(true);
  
    };
  
    const handleMouseLeave = () => {
      setActive(false);
    };
  
    return (
      <div
        className='mt-10 w-full flex gap-10 hover:bg-gray-800/10 transition duration-300 ease-in-out p-5 rounded-lg'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        id='projects'
      >
        <div>
          {/* left side of card */}
          <p className="text-primary-lightGray font-montserrat text-[12px]">{left}</p>

        </div>
        <div className='w-[78%] gap-4 flex flex-col'>
          {/* right side of card */}
          <h1 className={`text-[17px] flex justify-between font-montserrat transition duration-300 ease-in-out ${active ? 'text-special' : 'text-white'}`}>
            {title}
            <a href={link} target="_blank" rel="noopener noreferrer">
            <FaLink className="ml-2 transition-transform duration-300 ease-in-out transform hover:scale-125" />
          </a>
          </h1>
          <p className='text-primary-lightGray font-poppins text-[12px]'>
            {description}
          </p>
          <div className='flex gap-5'>
            {tags.map((tag, index) => (
              <Hashtag key={index} tag={tag} 
              />
            ))}
          </div>
        </div>
      </div>
    );
}

ProjectCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    left: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  };