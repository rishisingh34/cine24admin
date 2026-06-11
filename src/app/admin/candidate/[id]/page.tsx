"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  useCandidate,
  useUpdateCandidate,
} from "@/hooks/queries/use-candidates";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import LoadingCenter from "@/components/ui/LoadingCenter";

type CandidateForm = {
  name: string;
  studentNumber: string;
  branch: string;
  gender: string;
  email: string;
  residence: string;
  phone: string;
  isVerified: boolean;
};

const skeletonField = (
  <div className="h-12 w-full animate-pulse rounded-lg bg-neutral-800" />
);

export default function CandidateDetailPage() {
  const { id } = useParams();
  const candidateId = String(id);

  const { data, isLoading } = useCandidate(candidateId);
  const updateMutation = useUpdateCandidate(candidateId);

  const [formData, setFormData] = useState<CandidateForm | null>(null);

  useEffect(() => {
    if (data?.data) {
      setFormData({ ...data.data });
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      await updateMutation.mutateAsync(formData);
      toast.success("Candidate updated successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    }
  };

  if (isLoading) {
    return <LoadingCenter className="h-screen" />;
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Edit Candidate" />

      <Card className="mx-auto max-w-5xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {!formData
              ? Array.from({ length: 7 }).map((_, i) => (
                  <div key={i}>{skeletonField}</div>
                ))
              : (
                <>
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
                  <Select
                    label="Residence"
                    name="residence"
                    value={formData.residence}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Residence</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Day Scholar">Day Scholar</option>
                    <option value="Outstation">Outstation</option>
                  </Select>
                </>
              )}
          </div>

          <Button
            type="submit"
            variant="success"
            loading={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
