import ProjectCard from "./ProjectCard"


const RighSide = () => {
  return (
    <div className="w-full right-0 bg-primary-Primary pr-[15rem] py-[5rem] flex flex-col gap-6">
        <p className="text-primary-lightGray text-[15px] font-poppins">Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I’ve had the privilege of building software for an 
            <span className="text-white"> advertising agency,</span> a <span className="text-white">start-up,</span> a <span className="text-white">huge corporation,</span> and a <span className="text-white">digital product studio</span>.</p>
        <p className="text-primary-lightGray text-[15px] font-poppins">My main focus these days is building accessible user interfaces for our customers at <span className="text-white">Klaviyo</span>. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood. In my free time, I've also released an <span className="text-white">online video course</span> that covers everything you need to know to build a web app with the Spotify API.</p>
        <p className="text-primary-lightGray text-[15px] font-poppins">When I’m not at the computer, I’m usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for <span className="text-white">Korok seeds</span>.</p>

        <div className="flex flex-col gap-5">
            <ProjectCard 
                designation="Full Stack Engineer @ Programmers Force"
                tags={["Javascript", "Typescript", "Node.js", "RESTful API"]}
            />
            <ProjectCard 
                designation="Designer and Frontend Developer @ CareerTweakrz"
                tags={["Figma", "UI/UX", "React", "Next JS", "Tailwind"]}
            />
            <ProjectCard
                designation="Web Developer @ Exceloweb Solutions"
                tags = {["Javascript", "Typescript", "Node.js"]}
            />
        </div>
    </div>
  )
}

export default RighSide