import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact | 2025: A Year of Closing Cycles",
  description: "Get in touch for gallery enquiries, acquisitions, collaborations, or press.",
};

export default function ContactPage() {
  return <ContactForm />;
}
