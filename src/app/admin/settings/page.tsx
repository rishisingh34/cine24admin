"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import Loader from "@/components/ui/Loader";

function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      setStatus(true); 
      try {
        const res = await fetch("/api/admin");
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch admin data");

        setForm({
          name: data.name,
          email: data.email,
          role: data.role,
          password: "",
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong";
        toast.error(message || "Something went wrong");
      } finally {
        setStatus(false);
      }
    };
    fetchAdminData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          password: form.password || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to update");

      toast.success("Settings updated successfully");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast.error(message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (status) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0f0f0f]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Admin Settings</h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#1a1a1a] p-8 rounded-2xl border border-[#2c2c2c]"
        >
          {/* Name */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-300">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-[#444] bg-[#121212] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-300">
              New Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              className="w-full border border-[#444] bg-[#121212] text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-400">
              Email
            </label>
            <div
              className="w-full px-4 py-2 bg-green-500/30 text-gray-100 font-bold rounded-full cursor-not-allowed select-none"
              tabIndex={-1}
            >
              {form.email}
            </div>
          </div>

          {/* Role */}
          <div className="col-span-1">
            <label className="block mb-1 font-medium text-gray-400">Role</label>
            <div
              className="w-full px-4 py-2 rounded-full bg-green-500/30 font-bold text-gray-100 cursor-not-allowed select-none"
              tabIndex={-1}
            >
              {form.role.toUpperCase()}
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-full">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 transition-colors text-white px-4 py-2 rounded-full disabled:opacity-50"
            >
              {loading && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
              )}
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;