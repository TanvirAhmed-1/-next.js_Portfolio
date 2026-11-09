"use client";

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/8801786924911"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:shadow-2xl hover:bg-[#20ba59] hover:scale-110 active:scale-95 transition-all duration-300"
    >
      <FaWhatsapp className="h-7 w-7 fill-current" />
    </a>
  );
}

