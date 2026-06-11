"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  useAdminProfile,
  useUpdateAdminProfile,
} from "@/hooks/queries/use-admin";
import PageHeader from "@/components/ui/PageHeader";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import LoadingCenter from "@/components/ui/LoadingCenter";

function Settings() {
  const { data, isLoading } = useAdminProfile();
  const updateMutation = useUpdateAdminProfile();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        name: data.name,
        email: data.email,
        role: data.role,
        password: "",
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMutation.mutateAsync({
        name: form.name,
        password: form.password || undefined,
      });
      toast.success("Settings updated successfully");
      setForm((prev) => ({ ...prev, password: "" }));
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  };

  if (isLoading) {
    return <LoadingCenter className="h-screen" />;
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader title="Admin Settings" />

      <Card>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Input
            label="New Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current"
          />

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">
              Email
            </label>
            <div className="cursor-not-allowed select-none rounded-lg bg-green-500/30 px-4 py-3 font-medium text-gray-100">
              {form.email}
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-gray-400">
              Role
            </label>
            <div className="cursor-not-allowed select-none rounded-lg bg-green-500/30 px-4 py-3 font-medium text-gray-100">
              {form.role.toUpperCase()}
            </div>
          </div>

          <div className="col-span-full">
            <Button
              type="submit"
              loading={updateMutation.isPending}
              className="w-full"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Settings;
