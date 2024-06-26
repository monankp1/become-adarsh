import * as React from "react";
import ChangePassword from "../components/changePassword";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
      <style jsx>{`
        .button {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
          height: 2.5rem;
          justify-content: center;
          padding: 5px 20px;
          margin: 0px 2.5rem ;
          border-radius: 8px;
          background: var(--New-Blue-Purple, #E2C2FF);          
          box-shadow: 0px 2px 1px 0px #A87900;          
          font-size: 16px;
          font-weight: 600;
          line-height: 50%;
          color: var(--BG-Pink, #270025);
          font-family: Poppins, sans-serif;
          cursor: pointer;
        }
      `}</style>

    </button>
  );
}

function InputField({ icon, placeholder, type = "text", value, onChange }) {
  return (
    <div className="input-field">
      <img src={icon} alt="" className="input-icon" />
      <input
        type={type}
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={onChange}
      />
      <style jsx>
        {`
        .input-field {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: #A5A5A5;
          font-size: 14px;
          font-family: Sora;
          font-weight: 400;
          line-height: 19.60px;
          word-wrap: break-word
          letter-spacing: -0.17px;
        }

        .input-icon {
          width: 20px;
          height: 20px;
          object-fit: contain;
        }

        .input {
          flex: 1;
          background: none;
          border: none;
          color: inherit;
          font-family: Sora, sans-serif;
        }

        .input::placeholder {
          color: inherit;
        }
      `}
      </style>
    </div>
  );
}

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [shibirID, setShibirID] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://bharuchbaps.in/bharuchbaps.in/index.php/login/login",
        {
          shibir_id: shibirID,
          password: password,
        }
      );
      if (!response.data.status) {
        toast.error(response.data.message);
        // Redirect or further logic after successful login
      }
      if (response.data.status) {
        toast.success(response.data.message);
        login(
          response.data.user.shibir_id,
          response.data.user.permission.role,
          response.data.user.gender,
          response.data.user.firstname
        ); // Update the login state
        navigate("/home");
        // Redirect or further logic after successful login
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred during login. Please try again later.");
    }
  };
  return (
    <>
      <main
        className="container"
        style={
          {
            // Existing style
          }
        }
      >
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/911c7bde24e7d9a053b553f824b6e85c2a4d1542276b873d1f9e45bb67b879e8?apiKey=3250d16d0ad044539de68d3e33600ce8&"
          alt="Bharuch Yuva Shibir '24 logo"
          className="logo"
        />
        <section className="login-form">
          <h1 className="welcome-text">Welcome to</h1>
          <h2 className="event-name">Bharuch Yuva Shibir '24</h2>
          <form onSubmit={handleLogin}>
            <InputField
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/965a210ea4a6b611e823a539cb139e3e2601fbe355f9cbaf6747120a7d88a1e6?apiKey=3250d16d0ad044539de68d3e33600ce8&"
              placeholder="Shibir ID"
              value={shibirID}
              onChange={(e) => setShibirID(e.target.value)}
            />
            <InputField
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/b4594e05ac76ce27652d9046b71c7ceac64d833efb00dd91de2d73b66dad29bd?apiKey=3250d16d0ad044539de68d3e33600ce8&"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <a
              href="#"
              className="forgot-password"
              onClick={() => setModalOpen(true)}
            >
              Forgot Password?
            </a>

            <ChangePassword
              isOpen={isModalOpen}
              onClose={() => setModalOpen(false)}
            />
            <Button onClick={handleLogin}>Let's take a tour of Shibir</Button>


          </form>
        </section>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/889d7c9e81951e451814f2ee5438e3132ee9ceb6dfc35b16fc7935eaa77e16fd?apiKey=3250d16d0ad044539de68d3e33600ce8&"
          alt=""
          className="footer-image"
        />
      </main>
      <ToastContainer position="top-center" autoClose={5000} />
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 5%;
          color: #fff;
          font-weight: 400;
          line-height: 140%;
          background: linear-gradient(180deg, #270025 0%, #1d0f2a 100%);
          min-height: 100vh; // Make sure it covers the full height
        }
        .logo {
          width: 100%;
          max-width: 263px;
          aspect-ratio: 1.49;
          object-fit: contain;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          align-self: stretch;
          margin-top: 39px;
          padding: 5%;
          background: linear-gradient(
            123deg,
            rgba(98.54, 68.49, 126.44, 0.25) 0%,
            rgba(29, 15, 42, 0.25) 100%
          );
          // box-shadow: 5px 5px 7px rgba(0, 0, 0, 0.30) inset;
          border-radius: 25px;
          //  border: 0.50px white solid"
          padding: 27px 24px 43px;
          // border: 1px solid rgba(255, 255, 255, 1);
          border-radius: 25px;
          background-blend-mode: color-burn;
        }

        .welcome-text {
          margin: 0;
          text-align: center;
          letter-spacing: -0.17px;
          font: 16px/100% Sora, sans-serif;
        }

        .event-name {
          margin: 15px 0 0;
          text-align: center;
          font: 700 20px/40% Poppins, -apple-system, Roboto, Helvetica,
            sans-serif;
        }

        form {
          margin-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .forgot-password {
          margin-top: 16px;
          text-align: center;
          font-family: Sora, sans-serif;
          color: inherit;
          text-decoration: none;
        }

        .footer-image {
          width: 47px;
          margin-top: 40px;
          aspect-ratio: 0.78;
          object-fit: contain;
        }
      `}</style>
    </>
  );
}
export default Login;
