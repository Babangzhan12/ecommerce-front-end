import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Password } from "primereact/password";
import COVER_IMAGE from "../assets/images/login-background.jpg";
import GOOGLE_ICON from "../assets/images/google-icon.png";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const { signin } = useAuth();

  const isValidRegisterForm = () => {
    return username.length > 0 && password.length > 0 && name.length > 0 && email.length > 0;
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        username,
        password,
        name,
        email,
      });
      console.log("Registration successful:", response.data);
      // Handle successful registration response from backend (if needed)
      navigate("/"); // Navigate to home page or any desired page
    } catch (error) {
      console.error("Registration failed:", error);
      // Handle registration error (if needed)
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
  };

  const isValidForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await signin(username, password);
    // After successful login, you may want to navigate to another page
    navigate("/"); // Navigate to home page or any desired page
  };

  return (
    <div className="w-full h-screen flex items-start">
      <div className="relative w-1/2 h-full flex flex-col">
        <img
          src={COVER_IMAGE}
          alt="Login Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-[20%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold my-4">
            Turn Your Ideas into reality
          </h1>
          <p className="text-xl text-white font-normal">
            Start for free and get attractive offers from the community
          </p>
        </div>
      </div>
      <div className="w-1/2 h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center">
        <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">
          Interactive Brand
        </h1>

        <div className="w-full flex flex-col max-w-[500px]">
          {isRegistering ? (
            <form onSubmit={handleRegisterSubmit}>
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  feedback={false}
                  placeholder="Password"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={!isValidRegisterForm()}
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={toggleRegister}
                  className="w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="w-full flex flex-col">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <Password
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  toggleMask
                  feedback={false}
                  placeholder="Password"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="w-full flex items-center">
                  <input type="checkbox" className="w-1 h-4" />
                  <p className="text-sm">Remember me for 30 days</p>
                </div>

                <p className="text-sm font-medium whitespace-nowrap underline underline-offset-2 cursor-pointer">
                  Forgot Password ?
                </p>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={!isValidForm()}
                >
                  Log in
                </button>
                <button
                  type="button"
                  onClick={toggleRegister}
                  className="w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Register
                </button>
              </div>

              <div className="w-full flex flex-col items-center justify-center relative py-2">
                <div className="w-full h-[1px] bg-black relative mb-2">
                  <p className="text-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-black/80 bg-[#f5f5f5]">
                    or
                  </p>
                </div>
                <div className="w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer">
                  <img src={GOOGLE_ICON} alt="Google Icon" className="h-6 mr-2" />
                  Sign In With Google
                </div>
              </div>
            </form>
          )}
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Don't have an account?{" "}
            <span
              onClick={toggleRegister}
              className="font-semibold underline underline-offset-2 cursor-pointer"
            >
              Sign up for free
            </span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
