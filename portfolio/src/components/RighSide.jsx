import DownloadResume from "./DownloadResume";
import ExperienceCard from "./ExperienceCard";
import { ProjectCard } from "./ProjectCard";

const RighSide = () => {
  return (
    <div
      className="w-full right-0 bg-primary-Primary pr-[15rem] py-[5rem] flex flex-col gap-6"
      id="about"
    >
      <p className="text-primary-lightGray text-[15px] font-poppins">
        Back in 2012, I decided to try my hand at creating custom Tumblr themes
        and tumbled head first into the rabbit hole of coding and web
        development. Fast-forward to today, and I’ve had the privilege of
        building software for an
        <span className="text-white"> advertising agency,</span> a{" "}
        <span className="text-white">start-up,</span> a{" "}
        <span className="text-white">huge corporation,</span> and a{" "}
        <span className="text-white">digital product studio</span>.
      </p>
      <p className="text-primary-lightGray text-[15px] font-poppins">
        My main focus these days is building accessible user interfaces for our
        customers at <span className="text-white">Klaviyo</span>. I most enjoy
        building software in the sweet spot where design and engineering meet —
        things that look good but are also built well under the hood. In my free
        time, I&apos;ve also released an{" "}
        <span className="text-white">online video course</span> that covers
        everything you need to know to build a web app with the Spotify API.
      </p>
      <p className="text-primary-lightGray text-[15px] font-poppins">
        When I’m not at the computer, I’m usually rock climbing, reading,
        hanging out with my wife and two cats, or running around Hyrule
        searching for <span className="text-white">Korok seeds</span>.
      </p>

      <DownloadResume />
      <div className="flex flex-col gap-5">
        <ExperienceCard
          designation="Full Stack Engineer @ Programmers Force"
          tags={["Javascript", "Typescript", "Node.js", "RESTful API"]}
          start="2024"
          end="present"
        />
        <ExperienceCard
          designation="Designer and Frontend Developer @ CareerTweakrz"
          tags={["Figma", "UI/UX", "React", "Next JS", "Tailwind"]}
          start="2024"
          end="present"
        />
        <ExperienceCard
          designation="Web Developer @ Exceloweb Solutions"
          tags={["Javascript", "Typescript", "Node.js"]}
          start="2023"
          end="2024"
        />
      </div>

      <div className="flex flex-col gap-5 mt-10">
        <ProjectCard
          title="GlassAura - Figma Plugin"
          tags={["Figma", "Typescript", "HTML", "CSS"]}
          description="GlassAura - Glassmorphism Create Amazing Glass Effects with Ease
                    GlassAura allows designers to create glass effects for both light and dark them backgrounds. 
                    It is an amazing plugin with convenient user experience and ease to craft glassmorphism, fun in hands."
          left="Figma Plugin"
          link="https://www.figma.com/community/plugin/1339306684360078571/glassaura-glassmorphism-create-amazing-glass-effects-with-ease"
        />
        <ProjectCard
          title="E-Commerce Store - MERN Stack"
          tags={["React", "Node.js", "MondoDB"]}
          description="E - commerce store developed in MERN stack developer. 
                        This store has CRUD functionalities for handling products and blogs. 
                        This app allows for special admin access, which directs admin to dashboard for handling store."
          left="MERN Stack"
          link="https://github.com/Nouman64-cat/Liquor-Store"
        />
        <ProjectCard
          title="CareerTweakrz Landing Page - Next.js"
          tags={["C#", "RDBMS", ".NET", "3-Layer Model"]}
          description="CareerTweakrz is an upcoming mobile application and web application available on web, android and IOS. Primary objective of this application is to provide our users with an easy to use interface that would allow them to apply for jobs easily by generating a resume for them and in future we plan to add many more features to it as well."
          left="React/Next.js"
          link="https://careertweakrz.com/"
        />
        <ProjectCard
          title="Multi Image Classification System"
          tags={["CNN", "Neural Networks", "Python", "AI/ML"]}
          description="One complete pass through entire training dataset. Epoch has two main numbers

Loss and accuracy for training set (loss and accuracy)
Loss and accuracy for validation set (val_loss and val_accuracy)
Loss
Loss measures how well the model is doing for both training and validation sets. It is a number indicating how far the model's predictions are from actual labels

Note
Lower loss is better.

Accuracy
Accuracy measures the percentage of correct predictions.

Note
Higher accuracy is better."
          left="NN/CNN/ML"
          link="https://github.com/Nouman64-cat/Image-classification-Deep-Learning-"
        />
      </div>
    </div>
  );
};

export default RighSide;
