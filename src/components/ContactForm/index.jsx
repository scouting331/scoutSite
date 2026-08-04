/**
 * @file index.jsx
 * @description EmailJS-powered contact form for the Scouting units website.
 * It collects a visitor's contact details and message, then sends the form
 * data through EmailJS when the user submits the form.
 *
 * @module ContactForm
 * @requires React
 * @requires @emailjs/browser
 */

import React, { useEffect, useMemo, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import contactRecipients from "@site/src/data/contactRecipients.json";
import styles from "./index.module.css";

const webmasterEmail = "webmaster@brownsburgscouts.org";
const siteMailboxEmail = "scoutingunits331@gmail.com";

/**
 * Renders a contact form that sends email through EmailJS.
 *
 * @component
 * @returns {React.JSX.Element} The message form and submission status area.
 */
export default function ContactForm() {
  const { siteConfig } = useDocusaurusContext();
  const emailjsServiceId = siteConfig.customFields?.emailjsServiceId || "";
  const emailjsTemplateId = siteConfig.customFields?.emailjsTemplateId || "";
  const emailjsPublicKey = siteConfig.customFields?.emailjsPublicKey || "";

  const formRef = useRef(null);
  const recipientDropdownRef = useRef(null);
  const [isSending, setIsSending] = useState(false);
  const [isRecipientMenuOpen, setIsRecipientMenuOpen] = useState(false);
  const [status, setStatus] = useState({ type: "idle", message: "" });
  const [selectedLeaders, setSelectedLeaders] = useState([]);
  const leaderOptions = contactRecipients;

  const isConfigured =
    emailjsServiceId && emailjsTemplateId && emailjsPublicKey;

  const selectedLeaderLabels = useMemo(
    () =>
      leaderOptions
        .filter((leader) => selectedLeaders.includes(leader.name))
        .map((leader) => leader.position),
    [leaderOptions, selectedLeaders]
  );

  const selectedLeaderEmails = useMemo(
    () =>
      leaderOptions
        .filter((leader) => selectedLeaders.includes(leader.name))
        .map((leader) => leader.email.trim())
        .filter(Boolean),
    [leaderOptions, selectedLeaders]
  );

  const selectedPositionsSummary = useMemo(() => {
    if (selectedLeaderLabels.length === 0) {
      return "Select recipient positions";
    }

    if (selectedLeaderLabels.length <= 2) {
      return selectedLeaderLabels.join(", ");
    }

    return `${selectedLeaderLabels.length} positions selected`;
  }, [selectedLeaderLabels]);

  const toggleLeader = (leaderName) => {
    setSelectedLeaders((currentSelection) => {
      if (currentSelection.includes(leaderName)) {
        return currentSelection.filter((name) => name !== leaderName);
      }

      return [...currentSelection, leaderName];
    });
  };

  useEffect(() => {
    const closeMenuOnOutsideClick = (event) => {
      if (
        recipientDropdownRef.current &&
        !recipientDropdownRef.current.contains(event.target)
      ) {
        setIsRecipientMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenuOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeMenuOnOutsideClick);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isConfigured) {
      setStatus({
        type: "error",
        message:
          "EmailJS is not configured yet. Set the service, template, and public key environment variables first.",
      });
      return;
    }

    if (!formRef.current) {
      setStatus({
        type: "error",
        message: "The form could not be found. Please refresh and try again.",
      });
      return;
    }

    if (selectedLeaderLabels.length === 0) {
      setStatus({
        type: "error",
        message: "Please select at least one leader to include in the message.",
      });
      return;
    }

    setIsSending(true);
    setStatus({ type: "idle", message: "" });

    const formData = new FormData(formRef.current);
    const templateParams = {
      from_name: formData.get("from_name"),
      reply_to: formData.get("reply_to"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      selected_leaders: selectedLeaderLabels.join("\n"),
      selected_leaders_short: selectedLeaderLabels.join(", "),
      to_email: selectedLeaderEmails.join(", ") || siteMailboxEmail,
      cc_email: webmasterEmail,
      bcc_email: siteMailboxEmail,
    };

    try {
      await emailjs.send(
        emailjsServiceId,
        emailjsTemplateId,
        templateParams,
        {
          publicKey: emailjsPublicKey,
        }
      );

      formRef.current.reset();
      setSelectedLeaders([]);
      setStatus({
        type: "success",
        message:
          "Your message was sent. A leader will get back to you as soon as possible.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message right now. Please try again later.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <form ref={formRef} className={styles.formCard} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <span className={styles.formEyebrow}>Send a message</span>
        <h2 className={styles.formTitle}>Contact our unit leaders</h2>
        <p className={styles.formCopy}>
          Use this form for general questions, event follow-ups, or help finding
          the right Scouting program for your family.
        </p>
      </div>

      {!isConfigured ? (
        <div className={styles.setupNotice}>
          <strong>EmailJS setup needed.</strong>
          <p>
            Add EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, and EMAILJS_PUBLIC_KEY
            to your environment before deploying this page.
          </p>
        </div>
      ) : null}

      <div className={styles.fieldGrid}>
        <fieldset className={styles.fieldset}>
          <legend className={styles.legend}>Choose leaders to include</legend>
          <p className={styles.fieldsetHelp}>
            Select one or more positions to route the message to. The webmaster
            is always copied for adult oversight.
          </p>

          <div className={styles.recipientPicker} ref={recipientDropdownRef}>
            <span className={styles.pickerLabel}>Recipient positions</span>
            <button
              type="button"
              className={styles.pickerTrigger}
              onClick={() => setIsRecipientMenuOpen((isOpen) => !isOpen)}
              aria-haspopup="listbox"
              aria-expanded={isRecipientMenuOpen}
            >
              <span>{selectedPositionsSummary}</span>
              <span className={styles.pickerChevron} aria-hidden="true">
                {isRecipientMenuOpen ? "▲" : "▼"}
              </span>
            </button>

            {isRecipientMenuOpen ? (
              <div
                className={styles.pickerMenu}
                role="listbox"
                aria-multiselectable="true"
              >
                {leaderOptions.map((leader) => {
                  const optionId = `recipient-${leader.name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`;
                  return (
                    <label key={leader.name} className={styles.pickerOption} htmlFor={optionId}>
                      <input
                        id={optionId}
                        type="checkbox"
                        checked={selectedLeaders.includes(leader.name)}
                        onChange={() => toggleLeader(leader.name)}
                      />
                      <span>{leader.position}</span>
                    </label>
                  );
                })}
              </div>
            ) : null}
          </div>
        </fieldset>

        <label className={styles.field}>
          <span>Name</span>
          <input
            name="from_name"
            type="text"
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Email</span>
          <input
            name="reply_to"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Subject</span>
          <input
            name="subject"
            type="text"
            placeholder="How can we help?"
            required
          />
        </label>

        <label className={styles.field}>
          <span>Message</span>
          <textarea
            name="message"
            rows={7}
            placeholder="Tell us what you need to know..."
            required
          />
        </label>
      </div>

      <div className={styles.actionsRow}>
        <button
          type="submit"
          className="button button--primary button--lg"
          disabled={isSending || !isConfigured || selectedLeaderLabels.length === 0}
        >
          {isSending ? "Sending..." : "Send Message"}
        </button>

        <p className={styles.helperText}>
          We usually respond within a few days, depending on the season and
          volunteer schedules.
        </p>
      </div>

      <p
        className={`${styles.statusMessage} ${
          status.type === "success"
            ? styles.statusSuccess
            : status.type === "error"
              ? styles.statusError
              : ""
        }`}
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}