import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import supabase from "../supabase";
import Header from "../partials/Header";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("social_media_data")
        .select("*")
        .eq("email", email)
        .eq("password", password)
        .single();

      if (error) {
        setError("Invalid email or password.");
      } else if (data) {
        if (!data.is_verified) {
          setError(
            "Your account is pending admin approval. Please wait for verification."
          );
        } else {
          // Sign-in successful
          if (data.is_admin) {
            // User is an admin, navigate to AdminHome
            navigate("/admin-home", { state: { signedInUserEmail: email } });
          } else {
            // Regular user, navigate to UserHome
            navigate("/user-home", { state: { signedInUserEmail: email } });
          }
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to make networking easier.
                </h1>
              </div>

              <div className="max-w-sm mx-auto">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSignIn}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type=""
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button
                        className="btn text-white bg-blue-600 hover:bg-blue-700 w-full"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>

                <div className="text-gray-600 text-center mt-6">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
