"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export interface LoginType {
  email: string;
  password: string;
  [key: string]: string;
}

function Login() {
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const { email, password } = loginData;
  const route = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleClick = async () => {
    if (email.length === 0 || password.length === 0) {
      setError("Please fill in both email and password.");
      return;
    }

    const authPayload: LoginType = { email, password };
    const response = await fetch("https://cs-api.nugen.co.in/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authPayload),
    });

    if (response.ok) {
      route.push("/Dashboard");
    } else {
      setError("User not found. Please check your email and password.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-md">
      <div className="bg-white p-8 rounded-lg">
        <div className="px-2 bg-cyan-500">
          <h1 className="text-3xl font-bold text-center mb-6 ">Login</h1>
        </div>

        {error && (
          <div className="mb-4 px-2 text-red-500">
            <p>{error}</p>
          </div>
        )}

        <div className="mb-4 px-2">
          <div className="font-semibold mb-2">Email</div>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="h-10 w-full px-3"
            placeholder="user@gmail.com"
          />
        </div>

        <div className="mb-6 px-2">
          <div className="font-semibold mb-2">Password</div>
          <input
            required
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="h-10 w-full px-3"
            placeholder="Password"
          />
        </div>
        <div className="px-2">
          <button
            type="submit"
            className="w-full bg-red-500 font-semibold rounded-md"
            onClick={handleClick}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
