import React, { useState } from "react";
import { useNavigate } from "react-router";
import { trpc } from "../../trpc";
import InteractiveButton from "./InteractiveButton";
import { useNotification } from "../../hooks/useNotification";

const SUPPORT_LINKS = [
  { label: "Contact us", href: "/contact" },
  { label: "Whatsapp", href: "https://wa.me/7719783377" },
  { label: "Instagram", href: "https://www.instagram.com/thirdspace.travel" },
];

const IMPORTANT_LINKS = [
  { label: "Terms & Conditions", href: "/terms-conditions" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-policy" },
  { label: "Safety & Liability Policy", href: "/safety-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
];

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const { notify } = useNotification();
  const navigate = useNavigate();
  const subscribeToNewsletter = trpc.public.subscribeToNewsletter.useMutation({
    onSuccess: () => {
      notify("Subscribed successfully!", "success");
    },
    onError: (error) => {
      notify(`Subscription failed: ${error.message}`, "error");
    },
  });
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribeToNewsletter.mutateAsync({ email });
    setEmail("");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Navigation Sections */}
        <div className="footer__nav">
          <div className="footer__col">
            <h4 className="footer__heading">Support</h4>
            <ul className="footer__list">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label} className="footer__item">
                  <div
                    onClick={() => {
                      if (link.href.startsWith("http")) {
                        window.open(link.href, "_blank");
                      } else {
                        navigate(link.href);
                      }
                    }}
                    className="footer__link"
                  >
                    {link.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__heading">Important Links</h4>
            <ul className="footer__list">
              {IMPORTANT_LINKS.map((link) => (
                <li key={link.label} className="footer__item">
                  <div
                    onClick={() => {
                      navigate(link.href);
                    }}
                    className="footer__link"
                  >
                    {link.label}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="footer__newsletter">
          <h4 className="footer__heading">Newsletter</h4>
          <p className="footer__text">
            Don't miss out on the exciting world of travel — subscribe now and
            embark on a journey of discovery with us.
          </p>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              className="footer__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InteractiveButton onClick={handleSubscribe} solid>
              Submit
            </InteractiveButton>
          </form>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-container">
          <span className="footer__copyright">
            © {new Date().getFullYear()} Third Space Travel, All Rights Reserved
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
