import React from "react";

const ActionMenu: React.FC = () => {
  return (
    <div className="action-menu">
      <div className="action-menu__header">
        <span className="action-menu__title">Actions</span>
      </div>

      <div className="action-menu__section">
        <button className="action-menu__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M1.37468 8.232C1.31912 8.08232 1.31912 7.91767 1.37468 7.768C2.48136 5.0846 5.09737 3.33374 8.00001 3.33374C10.9027 3.33374 13.5187 5.0846 14.6253 7.768C14.6809 7.91767 14.6809 8.08232 14.6253 8.232C13.5187 10.9154 10.9027 12.6663 8.00001 12.6663C5.09737 12.6663 2.48136 10.9154 1.37468 8.232"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 8C6 9.10383 6.89617 10 8 10C9.10383 10 10 9.10383 10 8C10 6.89617 9.10383 6 8 6C6.89617 6 6 6.89617 6 8V8"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>View Details</span>
        </button>

        <button className="action-menu__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14.1161 4.54126C14.8496 3.80795 14.8498 2.61709 14.1165 1.8836C13.3831 1.1501 12.1923 1.14995 11.4588 1.88326L2.56146 10.7826C2.40667 10.9369 2.2922 11.127 2.22813 11.3359L1.34746 14.2373C1.31236 14.3547 1.34457 14.482 1.43132 14.5686C1.51808 14.6552 1.64539 14.6872 1.76279 14.6519L4.66479 13.7719C4.87357 13.7084 5.06358 13.5947 5.21813 13.4406L14.1161 4.54126M10.0001 3.33326L12.6668 5.99993"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Edit Customer</span>
        </button>

        <button className="action-menu__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 8C2 11.3115 4.68851 14 8 14C11.3115 14 14 11.3115 14 8C14 4.68851 11.3115 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2 2V5.33333H5.33333M8 4.66667V8L10.6667 9.33333"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>View Bookings</span>
        </button>
      </div>

      <hr className="action-menu__divider" />

      <div className="action-menu__section">
        <button className="action-menu__item">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M14.6668 4.66675L8.67283 8.48475C8.25877 8.72524 7.74755 8.72524 7.3335 8.48475L1.3335 4.66675"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M2.66683 2.66675H13.3335C14.0694 2.66675 14.6668 3.26419 14.6668 4.00008V12.0001C14.6668 12.736 14.0694 13.3334 13.3335 13.3334H2.66683C1.93094 13.3334 1.3335 12.736 1.3335 12.0001V4.00008C1.3335 3.26419 1.93094 2.66675 2.66683 2.66675"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Resend Invite</span>
        </button>
      </div>

      <hr className="action-menu__divider" />

      <div className="action-menu__section">
        <button className="action-menu__item action-menu__item--danger">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.28613 3.28589L12.7135 12.7139"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1.3335 7.99992C1.3335 11.6794 4.32073 14.6666 8.00016 14.6666C11.6796 14.6666 14.6668 11.6794 14.6668 7.99992C14.6668 4.32049 11.6796 1.33325 8.00016 1.33325C4.32073 1.33325 1.3335 4.32049 1.3335 7.99992V7.99992"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Block Customer</span>
        </button>
        <button className="action-menu__item action-menu__item--danger">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6.66667 7.33325V11.3333M9.33333 7.33325V11.3333M12.6667 3.99992V13.3333C12.6667 14.0691 12.0692 14.6666 11.3333 14.6666H4.66667C3.93078 14.6666 3.33333 14.0691 3.33333 13.3333V3.99992M2 3.99992H14M5.33333 3.99992V2.66659C5.33333 1.9307 5.93078 1.33325 6.66667 1.33325H9.33333C10.0692 1.33325 10.6667 1.9307 10.6667 2.66659V3.99992"
              stroke="currentColor"
              strokeWidth="1.33"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ActionMenu;
