"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

type Candidate = {
  _id: string;
  name: string;
  studentNumber: string;
  branch: string;
  gender: string;
  email: string;
  residence: string;
  phone: string;
  password?: string;
  isVerified: boolean;
};

const skeletonField = (
  <div className="h-12 bg-neutral-800 animate-pulse rounded-full w-full" />
);

export default function CandidateDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState<Omit<Candidate, "_id"> | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCandidate = async () => {
      try {
        const res = await fetch(`/api/candidate/${id}`);
        const data = await res.json();

        if (!res.ok)
          throw new Error(data.message || "Failed to fetch candidate");
        setFormData({ ...data.data });
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/candidate/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok)
        throw new Error(data.message || "Failed to update candidate");

      toast.success("Candidate updated successfully!");
      router.refresh(); // or refetch if needed
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900/10 backdrop-blur-sm text-white p-6">
      <h2 className="text-3xl font-bold mb-8">Edit Candidate</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-neutral-900 p-8 rounded-2xl shadow space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading
            ? Array.from({ length: 7 }).map((_, i) => (
                <div key={i}>{skeletonField}</div>
              ))
            : formData && (
                <>
                  {[
                    { name: "name", label: "Name" },
                    { name: "studentNumber", label: "Student Number" },
                    { name: "branch", label: "Branch" },
                    { name: "email", label: "Email", type: "email" },
                    { name: "phone", label: "Phone" },
                  ].map(({ name, label, type = "text" }) => (
                    <div key={name}>
                      <label className="block mb-2 text-neutral-400">
                      {label}
                      </label>
                      <input
                      type={type}
                      name={name}
                      value={formData[name as keyof typeof formData] as string}
                      onChange={handleChange}
                      required
                      className="w-full p-3 rounded-full bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block mb-2 text-neutral-400">
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

                  <div>
                    <label className="block mb-2 text-neutral-400">
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
                      <option value="Hostel">Hostel</option>
                      <option value="Day Scholar">Day Scholar</option>
                      <option value="Outstation">Outstation</option>
                    </select>
                  </div>
                </>
              )}
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={saving}
            className="w-full md:w-auto bg-green-600 hover:bg-green-500 text-white py-3 px-8 rounded-full disabled:opacity-50 transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
