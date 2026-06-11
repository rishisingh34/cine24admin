"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useCreateCandidate } from "@/hooks/queries/use-candidates";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function AddCandidatePage() {
  const router = useRouter();
  const createMutation = useCreateCandidate();

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

    try {
      await createMutation.mutateAsync({ ...formData, isVerified: true });
      toast.success("Candidate added successfully!");
      router.push("/admin/candidate");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Add Candidate" />

      <Card className="mx-auto max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Input
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Student Number"
              name="studentNumber"
              value={formData.studentNumber}
              onChange={handleChange}
              required
            />
            <Input
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <Select
              label="Residence"
              name="residence"
              value={formData.residence}
              onChange={handleChange}
              required
            >
              <option value="">Select Residence</option>
              <option value="Hostel A">Hostel</option>
              <option value="Day Scholar">Day Scholar</option>
              <option value="Outstation">Other</option>
            </Select>

            <Select
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </Select>

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-14"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[2.35rem] text-sm text-neutral-400 hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              <Button
                type="button"
                variant="secondary"
                onClick={generatePassword}
                className="mt-2"
              >
                Generate Password
              </Button>
            </div>
          </div>

          <Button
            type="submit"
            variant="success"
            loading={createMutation.isPending}
          >
            {createMutation.isPending ? "Adding..." : "Add Candidate"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
