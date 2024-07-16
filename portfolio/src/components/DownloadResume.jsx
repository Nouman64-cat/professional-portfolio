import { IoDocumentTextOutline } from "react-icons/io5";

const DownloadResume = () => {
  return (
    <div className='w-full mt-4'>
          <a href="/Javascript_Resume.pdf" download="nouman_ejaz_resume.pdf">
            <button className="w-full flex justify-center items-center gap-4 px-4 py-2 bg-green-500 rounded-full hover:bg-special transition duration-300  ease-in-out text-primary">
              <p className="font-montserrat font-medium text-primary">Download Resume</p>
              <IoDocumentTextOutline fontSize={15}/>
            </button>
          </a>
    </div>
  )
}

export default DownloadResume