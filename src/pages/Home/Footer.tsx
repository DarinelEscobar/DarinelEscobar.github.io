import React from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaWhatsapp } from 'react-icons/fa';
import { ChevronUp } from 'lucide-react';
import data from "@data/data.json";



const Footer: React.FC = () => {
  const { short_name, email, linkedin, github, phone } = data.resume.personal_info;

  return (
    <section className="relative flex flex-col items-center justify-between h-screen bg-whi text-dar">
      {/* Title */}
      <div className="flex items-center justify-center flex-grow">
        <h1 className="  custom-title font-cor">
          {short_name}
        </h1>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full py-3 px-5 flex justify-between text-sm bg-transparent z-10">
        <div className="text-left">
          <h1 className="  font-bold font-rob text-5dar text-[0.89rem] font-bol">Copyright:</h1>
          <p className="text-dar text-[0.89rem] font-lat flex items-center gap-1"> &copy; 2024
          </p>
        </div>
        <div className="text-left">
          <h1 className="  font-bold font-rob text-5dar text-[0.89rem] font-bol">Quick Jump:</h1>
          <p className="text-dar text-[0.89rem] font-lat flex items-center gap-1">
            Ascend to Top <ChevronUp />
          </p>
        </div>
        <div className="text-left">
          <h1 className="  font-bold font-rob text-5dar text-[0.89rem] font-bol">Contact Info:</h1>
          <p className="text-dar text-[0.89rem] font-lat flex items-center gap-2">
            <a href={`mailto:${email}`} className="hover:underline flex items-center gap-1">
              <FaEnvelope />
            </a>,
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FaLinkedin />
            </a>,
            <a href={github} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FaGithub />
            </a>,
            <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
              <FaWhatsapp />
            </a>
          </p>
        </div>
        <div className="text-left">
          <h1 className="  font-bold font-rob text-5dar text-[0.89rem] font-bol">Crafted & Aesthetic by:</h1>
          <p className="text-dar text-[0.89rem] font-lat flex items-center gap-1">
            {short_name}
          </p>
        </div>
      </footer>
    </section>
  );
};

export default Footer;