import React from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { motion, useReducedMotion } from "framer-motion";
import { usePortfolioContent } from "@/lib/portfolioContent";
import { getDelay, getRevealProps } from "@/lib/motionPresets";

const ContactMe: React.FC = () => {
  const {
    resume: {
      personal_info: { email, phone, linkedin, github },
    },
    ui,
  } = usePortfolioContent();
  const reduceMotion = useReducedMotion();
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, "")}`;
  const actions = [
    {
      label: ui.contact.actions.email,
      value: email,
      href: `mailto:${email}`,
      Icon: FaEnvelope,
      external: false,
    },
    {
      label: ui.contact.actions.whatsapp,
      value: phone,
      href: whatsappUrl,
      Icon: FaWhatsapp,
      external: true,
    },
    {
      label: ui.contact.actions.github,
      value: "github.com",
      href: github,
      Icon: FaGithub,
      external: true,
    },
    {
      label: ui.contact.actions.linkedin,
      value: "linkedin.com",
      href: linkedin,
      Icon: FaLinkedin,
      external: true,
    },
  ];

  return (
    <section className="relative flex min-h-screen min-h-[100dvh] w-full items-center overflow-hidden bg-whi px-5 py-24 text-dar sm:px-8 lg:px-12">
      <div className="mx-auto grid w-full max-w-[1320px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <motion.div
          className="max-w-2xl space-y-6"
          {...getRevealProps(reduceMotion)}
        >
          <h2 className="font-lat text-4xl font-bold leading-[1.02] tracking-tight text-dar sm:text-5xl lg:text-6xl">
            {ui.contact.title}
          </h2>
          <div className="space-y-3">
            <p className="font-lat text-lg leading-8 text-dar/72">
              {ui.contact.subtitle}
            </p>
            <p className="font-lat text-base leading-7 text-dar/62">
              {ui.contact.body}
            </p>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map(({ label, value, href, Icon, external }, index) => (
            <motion.a
              key={label}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="group rounded-2xl border border-dar/10 bg-white/60 p-5 shadow-[0_16px_42px_rgba(15,23,42,0.07)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(var(--cobalt),0.48)] dark:border-white/10 dark:bg-white/[0.05]"
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: getDelay(index, 0.04), ease: "easeOut" }}
              aria-label={label}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-rob text-xs font-bold text-dar/55">
                    {label}
                  </p>
                  <p className="mt-3 break-words font-lat text-base font-bold text-dar">
                    {value}
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgb(var(--cobalt))] text-white transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-4 w-4" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
