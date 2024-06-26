import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { Button } from "primereact/button";
import COVER_IMAGE from "../assets/images/login-background.jpg";
import GOOGLE_ICON from "../assets/images/google-icon.png";
import BRAND_ICON from "../assets/images/logo-brand.jpg";
import axios from "axios";

const SigninPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const { signin } = useAuth();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setRememberMe(true);
    } else {
      setUsername("");
      setPassword("");
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
  }, [rememberMe, username, password]);

  const isValidRegisterForm = () => {
    return (
      username.length > 0 &&
      password.length > 0 &&
      name.length > 0 &&
      email.length > 0
    );
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
      console.log("Registration succesful: ", response.data);
      setIsRegistering(false);
    } catch (error) {
      console.error("Registration failed: ", error);
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
  };

  const toggleRememberMe = () => {
    if (!rememberMe) {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
    } else {
      localStorage.removeItem("username");
      localStorage.removeItem("password");
    }
    setRememberMe(!rememberMe);
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
      <div className="w-1/2 h-full bg-white flex flex-col p-20 justify-between items-center">
      <img 
      src={BRAND_ICON}
      alt="Brand Icon"
      className="w-42 h-auto "
      style={{ marginBottom: "-100px" }}
      />
        {/* <h1 className="w-full max-w-[500px] mx-auto text-xl text-[#060606] font-semibold mr-auto">
          Interactive Brand
        </h1> */}
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
                <input
                  type="password"
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
                <Button
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={isRegistering && !isValidRegisterForm()}
                >
                  Register
                </Button>
                <Button
                  type="button"
                  onClick={toggleRegister}
                  className="w-full text-[#060606] my-2 font-semibold bg-white border border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              <div className="w-full flex flex-col mb-2">
                <h3 className="text-3xl font-semibold mb-2">Login</h3>
                <p className="text-base mb-2">
                  Welcome Back! Please enter your details.
                </p>
              </div>
              <div className="w-full flex flex-col">
                <input
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                />
                <input
                  type="password"
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
                  <input
                    type="checkbox"
                    id="rememberMeCheckBox"
                    className="w-1 h-4"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                  />
                  <label htmlFor="rememberMeCheckBox" className="text-sm cursor-pointer">Remember me for 30 days</label>
                </div>

                <p className="text-sm font-medium whitespace-nowrap underline underline-offset-2 cursor-pointer">
                  Forgot Password ?
                </p>
              </div>

              <div className="w-full flex flex-col my-4">
                <button
                  className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer"
                  type="submit"
                  disabled={!isValidForm}
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
                  <img
                    src={GOOGLE_ICON}
                    alt="Google Icon"
                    className="h-6 mr-2"
                  />
                  Sign In With Google
                </div>
              </div>
            </form>
          )}
        </div>
        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Dont have a account?{" "}
            <span
              className="font-semibold underline underline-offset-2 cursor-pointer"
              onClick={toggleRegister}
            >
              Sign up for free
            </span>{" "}
          </p>
        </div>
      </div>
    </div>

    // <div className="login-panel">
    //     <form onSubmit={handleSubmit}>
    //         <h1>Login</h1>
    //         <p>Masukan username dan password anda</p>

    //         <div className="mb-2">
    //             <InputText value={username}
    //                 onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
    //         </div>

    //         <div className="mb-2">
    //             <Password value={password} onChange={(e) => setPassworrd(e.target.value)} toggleMask feedback={false}
    //             />
    //         </div>

    //         <div>
    //             <Button type="submit" disabled={!isValidForm}>Sign In</Button>
    //         </div>
    //     </form>
    // </div>
  );
};

export default SigninPage;
