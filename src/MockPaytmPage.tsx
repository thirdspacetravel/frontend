import { useParams, useNavigate } from "react-router";
import { trpc } from "./trpc";

export default function MockPaytmPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const mutation = trpc.user.processCallback.useMutation();

  const handleSimulate = async (status: "TXN_SUCCESS" | "TXN_FAILURE") => {
    await mutation.mutateAsync({
      id: bookingId!,
      status: status,
    });
    // After "callback" is done, redirect back to your app's success/fail page
    navigate(status === "TXN_SUCCESS" ? "/booking/success" : "/booking/failed");
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center",
          width: "400px",
        }}
      >
        <h2 style={{ color: "#002970" }}>
          Paytm <span style={{ color: "#00baf2" }}>Secure</span>
        </h2>
        <hr />
        <p>
          Booking ID: <strong>{bookingId}</strong>
        </p>
        <p>
          Amount: <strong>₹5,000.00</strong>
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => handleSimulate("TXN_SUCCESS")}
            style={{
              backgroundColor: "#28a745",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Simulate SUCCESS
          </button>

          <button
            onClick={() => handleSimulate("TXN_FAILURE")}
            style={{
              backgroundColor: "#dc3545",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Simulate FAILURE
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              padding: "12px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Abandon (Stay Pending)
          </button>
        </div>
      </div>
    </div>
  );
}
