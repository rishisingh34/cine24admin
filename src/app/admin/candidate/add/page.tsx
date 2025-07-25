"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AddCandidatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    studentNumber: "",
    branch: "",
    gender: "",
    email: "",
    residence: "",
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePassword = () => {
    const generated = Math.random().toString(36).slice(-10);
    setFormData({ ...formData, password: generated });
    toast.success("Password generated");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/candidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, isVerified: true }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add candidate");
      }

      toast.success("Candidate added successfully!");
      router.push("/admin/candidate");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-6">
      <h2 className="text-3xl font-bold mb-8">Add Candidate</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow-lg space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: "name", label: "Name" },
            { name: "studentNumber", label: "Student Number" },
            { name: "branch", label: "Branch" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone" },
          ].map(({ name, label, type = "text" }) => (
            <div key={name}>
              <label className="block mb-2 text-lg font-medium text-neutral-300">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={(formData as any)[name]}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition"
              />
            </div>
          ))}

          <div>
            <label className="block mb-2 text-lg font-medium text-neutral-300">
              Residence
            </label>
            <select
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition"
            >
              <option value="">Select Residence</option>
              <option value="Hostel A">Hostel</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-neutral-300">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="relative">
            <label className="block mb-2 text-sm font-medium text-neutral-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-14 rounded-full bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[2.85rem] text-sm text-neutral-400 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
            <button
              type="button"
              onClick={generatePassword}
              className="mt-2 text-lg text-neutral-300 hover:text-neutral-200 bg-neutral-700 px-4 py-2 rounded-full text-right"
            >
              Generate Password
            </button>
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white py-3 px-8 rounded-full disabled:opacity-50 transition"
          >
            {loading ? "Adding..." : "Add Candidate"}
          </button>
        </div>
      </form>
    </div>
  );
}