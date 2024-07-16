import { useState } from 'react';
import PropTypes from 'prop-types';
import Hashtag from './Hashtag';

const ProjectCard = ({ designation, tags = [], start, end }) => {
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
      id='experience'
    >
      <div>
        {/* left side of card */}
        <p className='text-primary-veryLightGray font-montserrat text-[12px]'>{start} - {end}</p>
      </div>
      <div className='w-[78%] gap-4 flex flex-col'>
        {/* right side of card */}
        <h1 className={`text-[17px] text-white font-montserrat ${active ? "text-special" : "text-white"} transition duration-300 ease-in-out`}>
          {designation}
        </h1>
        <p className='text-primary-lightGray font-poppins text-[12px]'>
          Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an advertising agency, a start-up, a huge corporation, and a digital product studio.
        </p>
        <div className='flex gap-5'>
          {tags.map((tag, index) => (
            <Hashtag key={index} tag={tag} />
          ))}
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  designation: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

export default ProjectCard;
