import React, { useState } from "react";
import { useNavigate } from "react-router";
import Button from "./Button";

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
  const navigate = useNavigate();
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Subscribed:", email);
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
          <form className="footer__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              className="footer__input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button solid>Submit</Button>
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
