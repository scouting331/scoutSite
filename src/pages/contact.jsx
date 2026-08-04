/**
 * @file contact.jsx
 * @description Contact page for the Scouting units website.
 * It gives visitors a direct way to send a message to the unit leaders with
 * an EmailJS-backed form and a quick reference panel for direct contact info.
 *
 * @module ContactPage
 * @requires React
 * @requires @theme/Layout
 * @requires @site/src/components/ContactForm
 */

import React from "react";
import Layout from "@theme/Layout";
import ContactForm from "@site/src/components/ContactForm";
import styles from "./contact.module.css";

export default function ContactPage() {
  return (
    <Layout
      title="Contact Us"
      description="Send a message to the Scouting units of American Legion Post 331 using our contact form."
    >
      <main className="container margin-vert--lg">
        <section className={styles.heroPanel}>
          <ContactForm />
        </section>
      </main>
    </Layout>
  );
}