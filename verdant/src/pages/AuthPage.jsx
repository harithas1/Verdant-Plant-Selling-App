import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validating form data
    if (
      !formData.email ||
      !formData.password ||
      (isSignUp && (!formData.name || !formData.phone))
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = isSignUp
        ? `${import.meta.env.VITE_BACKEND_URL}/api/auth/register`
        : `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`;

      // Setting the payload for both signup and login
      const payload = isSignUp
        ? {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
          }
        : {
            email: formData.email,
            password: formData.password,
          };
      // console.log(payload);

      // Sending the request
      const response = await axios.post(endpoint, payload);
      console.log(response);

      // Handle signup response
      if (isSignUp) {
        toast.success(
          response.data.message ||
            "Registration successful! Please check your email to verify."
        );
        setFormData({ name: "", email: "", password: "", phone: "" });
        setIsSignUp(false); // Switching to login mode
        navigate("/auth"); // Redirect to the login page for verification check
        return;
      }

      // Handle login response
      else if (response.data.message === "Login successful!") {
        console.log(response);

        // Successful login
        setUser(response.data.customer);
        localStorage.setItem("user", JSON.stringify(response.data.customer));

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }

        toast.success("Login successful!");
        setFormData({ name: "", email: "", password: "", phone: "" });
        navigate("/"); // Redirecting to the homepage after successful login
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Auth error:", error);
      const errorMsg =
        error.response?.data?.error || error.message || "Something went wrong!";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 flex items-center justify-center py-8 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-emerald-900 mb-6 text-center">
          {isSignUp ? "Create Account" : "Sign In"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded p-3 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded p-3 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {isSignUp && (
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border rounded p-3 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          )}
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded p-3 text-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 rounded"
          >
            {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-emerald-700">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="ml-1 text-emerald-600 hover:text-emerald-800 font-medium"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-sm text-emerald-600 hover:text-emerald-800"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
      {/* <footer>
        <Toaster />
      </footer> */}
    </div>
  );
};

export default AuthPage;
