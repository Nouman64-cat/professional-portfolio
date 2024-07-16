
import Hashtag from './Hashtag';

const ProjectCard = ({ designation, tags =[] }) => {
  return (
    <div className='mt-10 w-full flex gap-10 hover:bg-gray-800/10 transition duration-300 ease-in-out p-5 rounded-lg'>
      <div>
        {/* left side of card */}
        <p className='text-primary-veryLightGray font-montserrat text-[12px]'>2023 - present</p>
      </div>
      <div className='w-[80%] gap-4 flex flex-col'>
        {/* right side of card */}
        <h1 className='text-[17px] text-white font-montserrat'>{designation}</h1>
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

export default ProjectCard;
