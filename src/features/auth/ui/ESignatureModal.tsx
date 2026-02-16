"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ArrowDown } from "lucide-react";
import { ButtonBase } from "@/src/shared/ui/button/Button";

interface ESignatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const AGREEMENT_TEXT = `ZIL MONEY E-SIGNATURE AGREEMENT

E-Signature Agreement Terms

This E-Signature Agreement or E-Signature Disclosure (hereinafter referred to as the "E-Signature Agreement" or "Agreement") is entered into between you ("Customer") and Zil Money Corporation ("Zil Money" or "the Company"). By accepting this Agreement, you agree to conduct transactions and communications electronically, in accordance with the guidelines set forth in the E-COMMUNICATIONS AND E-SIGNATURE DISCLOSURE POLICIES AND PROCEDURES MANUAL of Zil Money, as well as the terms outlined in this Agreement below.

Agreement:

1. Scope of E-Signature

The use of electronic signature ("E-Signature") under this Agreement applies to all electronic communications, agreements, disclosures, and notices exchanged between the Customer and Zil Money. The use of E-Signature on the Zil Money platform may include, but is not limited to, the following:

(a) Signing and executing contracts and agreements.
(b) Authorizing financial transactions.
(c) Acknowledging receipt of disclosures and notices.
(d) Providing consent for electronic delivery of documents.

2. Consent to Electronic Transactions

By accepting this Agreement, you consent to conduct transactions electronically. This includes, but is not limited to, the following:

(a) Receiving and reviewing documents electronically.
(b) Signing documents using an E-Signature.
(c) Storing documents electronically.

3. Electronic Delivery of Disclosures

You agree to receive all disclosures, notices, and communications electronically. These may be delivered via email, through the Zil Money platform, or any other electronic means deemed appropriate by the Company.

4. Hardware and Software Requirements

To receive and sign documents electronically, you must have access to the following:

(a) A computer or mobile device with internet access.
(b) An email account and access to your email.
(c) A web browser that supports secure connections (e.g., Chrome, Firefox, Safari, Edge).
(d) Software capable of viewing PDF files (e.g., Adobe Acrobat Reader).

5. Consent to Use E-Signature

By clicking "I Agree to the Terms" or similar acceptance mechanism, you:

(a) Consent to use E-Signature for all transactions and communications with Zil Money.
(b) Acknowledge that your E-Signature has the same legal effect as a handwritten signature.
(c) Agree to be bound by any documents you sign electronically.

6. Withdrawal of Consent

You have the right to withdraw your consent to receive electronic disclosures at any time. To withdraw consent, you must contact Zil Money customer support. Please note that withdrawing consent may affect your ability to use certain features of the Zil Money platform.

7. Updating Your Contact Information

It is your responsibility to keep your email address and other contact information up to date. If your contact information changes, please update it through your Zil Money account settings or by contacting customer support.

8. Paper Copies

You may request a paper copy of any electronic document at any time by contacting customer support. There may be a fee associated with providing paper copies.

9. Termination

This Agreement will remain in effect until terminated by either party. Zil Money reserves the right to terminate this Agreement at any time if you fail to comply with the terms herein or for any other reason deemed necessary by the Company.

10. Contact Information

For questions or concerns regarding this Agreement or to request paper copies of electronic communications, please contact our customer support team:

Customer Support:
Phone: (408) 775-7720
Email: support@zilmoney.com / support@onlinecheckwriter.com

By accepting this Agreement, you affirm that you have carefully read and fully understood all the terms herein, and you hereby provide your explicit consent to conduct transactions and communications with Zil Money electronically, utilizing electronic signatures. Additionally, you confirm that you possess the necessary hardware and software capabilities to access, view, and retain electronic communications effectively. Your acceptance of this Agreement and consent to electronic transactions signify your agreement to be bound by its provisions. It is imperative that you acknowledge the legal validity and enforceability of E-Signatures and communications, as per the terms specified herein.
`;

export function ESignatureModal({
  isOpen,
  onClose,
  onAgree,
}: ESignatureModalProps) {
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!contentRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    if (scrollHeight - scrollTop - clientHeight < 20) {
      setHasScrolledToBottom(true);
    }
  };

  const handleClose = () => {
    setHasScrolledToBottom(false);
    onClose();
  };

  const handleAgree = () => {
    setHasScrolledToBottom(false);
    onAgree();
    onClose();
  };

  const handleDownload = () => {
    const blob = new Blob([AGREEMENT_TEXT], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Zil-Money-E-Signature-Agreement.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#20319D] px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                Zil Money E-Signature Agreement
              </h2>
              <button
                onClick={handleClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div
              ref={contentRef}
              onScroll={handleScroll}
              className="px-6 py-4 max-h-[400px] overflow-y-auto"
            >
              <h3 className="text-lg font-bold text-[#0595E5] mb-4">
                E-Signature Agreement Terms
              </h3>

              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>
                  This E-Signature Agreement or E-Signature Disclosure
                  (hereinafter referred to as the &quot;E-Signature
                  Agreement&quot; or &quot;Agreement&quot;) is entered into
                  between you (&quot;Customer&quot;) and Zil Money Corporation
                  (&quot;Zil Money&quot; or &quot;the Company&quot;). By
                  accepting this Agreement, you agree to conduct transactions
                  and communications electronically, in accordance with the
                  guidelines set forth in the E-COMMUNICATIONS AND E-SIGNATURE
                  DISCLOSURE POLICIES AND PROCEDURES MANUAL of Zil Money, as
                  well as the terms outlined in this Agreement below.
                </p>

                <h4 className="text-base font-bold text-[#0595E5] pt-2">
                  Agreement:
                </h4>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    1. Scope of E-Signature
                  </h5>
                  <p className="mt-1">
                    The use of electronic signature (&quot;E-Signature&quot;)
                    under this Agreement applies to all electronic
                    communications, agreements, disclosures, and notices
                    exchanged between the Customer and Zil Money.
                  </p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>(a) Signing and executing contracts and agreements.</li>
                    <li>(b) Authorizing financial transactions.</li>
                    <li>
                      (c) Acknowledging receipt of disclosures and notices.
                    </li>
                    <li>
                      (d) Providing consent for electronic delivery of
                      documents.
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    2. Consent to Electronic Transactions
                  </h5>
                  <p className="mt-1">
                    By accepting this Agreement, you consent to conduct
                    transactions electronically.
                  </p>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>
                      (a) Receiving and reviewing documents electronically.
                    </li>
                    <li>(b) Signing documents using an E-Signature.</li>
                    <li>(c) Storing documents electronically.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    3. Electronic Delivery of Disclosures
                  </h5>
                  <p className="mt-1">
                    You agree to receive all disclosures, notices, and
                    communications electronically.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    4. Hardware and Software Requirements
                  </h5>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>
                      (a) A computer or mobile device with internet access.
                    </li>
                    <li>(b) An email account and access to your email.</li>
                    <li>(c) A web browser that supports secure connections.</li>
                    <li>(d) Software capable of viewing PDF files.</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    5. Consent to Use E-Signature
                  </h5>
                  <ul className="mt-2 space-y-1 ml-4">
                    <li>
                      (a) Consent to use E-Signature for all transactions and
                      communications with Zil Money.
                    </li>
                    <li>
                      (b) Acknowledge that your E-Signature has the same legal
                      effect as a handwritten signature.
                    </li>
                    <li>
                      (c) Agree to be bound by any documents you sign
                      electronically.
                    </li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    6. Withdrawal of Consent
                  </h5>
                  <p className="mt-1">
                    You have the right to withdraw your consent at any time by
                    contacting Zil Money customer support.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    7. Updating Your Contact Information
                  </h5>
                  <p className="mt-1">
                    It is your responsibility to keep your email address and
                    other contact information up to date.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    8. Paper Copies
                  </h5>
                  <p className="mt-1">
                    You may request a paper copy of any electronic document at
                    any time by contacting customer support.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    9. Termination
                  </h5>
                  <p className="mt-1">
                    This Agreement will remain in effect until terminated by
                    either party.
                  </p>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900">
                    10. Contact Information
                  </h5>
                  <div className="mt-2 ml-4">
                    <p className="font-medium">Customer Support:</p>
                    <p>Phone: (408) 775-7720</p>
                    <p>
                      Email: support@zilmoney.com /
                      support@onlinecheckwriter.com
                    </p>
                  </div>
                </div>

                <p className="pt-2">
                  By accepting this Agreement, you affirm that you have
                  carefully read and fully understood all the terms herein, and
                  you hereby provide your explicit consent to conduct
                  transactions and communications with Zil Money electronically,
                  utilizing electronic signatures.
                </p>
              </div>
            </div>

            {/* Scroll Indicator */}
            {!hasScrolledToBottom && (
              <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-[#F59E0B]">
                  <ArrowDown size={16} className="animate-bounce" />
                  <span className="text-sm font-medium">
                    Please read the entire document and scroll to the bottom to
                    agree
                  </span>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between gap-3 bg-gray-50">
              <ButtonBase
                variant="outline"
                onClick={handleDownload}
                className="flex items-center gap-2 font-semibold"
              >
                <Download size={16} />
                Download Agreement
              </ButtonBase>
              <ButtonBase
                variant="neon"
                onClick={handleAgree}
                disabled={!hasScrolledToBottom}
                className={`flex items-center gap-2 font-bold transition-all ${
                  !hasScrolledToBottom
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : ""
                }`}
              >
                I Agree to the Terms
              </ButtonBase>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
