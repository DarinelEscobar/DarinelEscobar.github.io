// src/components/ContactMe/ContactText.tsx
import React from "react";

const ContactText: React.FC = () => {
  return (
    <>
      {/* Título “CONTACT” */}
      <div className="col-start-2 col-span-5 row-start-2 flex items-center justify-center">
        <h1 className="custom-contactme font-cor text-dar">CONTACT</h1>
      </div>

      {/* Subtítulo */}
      <div className="col-start-2 col-span-2 row-start-3 flex items-center">
        <h2 className="custom-contactmail font-lat text-dar">Let's get in touch ._.</h2>
      </div>
    </>
  );
};

export default ContactText;
