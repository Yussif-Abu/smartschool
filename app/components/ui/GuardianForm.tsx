"use client";

import Button from "@/components/Button";
import Heading from "../Heading";
import { Select, TextArea, TextField } from "@/helper";
import { capturePostHogEvent } from "@/helper/posthog";

const GuardianForm = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden"
        onSubmit={() =>
          capturePostHogEvent("guardian_creation_submitted", {
            entity_type: "guardian",
            form_type: "create",
          })
        }
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
            title="Add Guardian"
            subtitle="Create a guardian profile and connect them to a student."
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Guardian Information
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Guardian ID"
            name="guardianId"
            placeholder="Guardian ID"
            required
          />
          <TextField
            label="First Name"
            name="firstName"
            placeholder="Enter first name"
            required
          />
          <TextField
            label="Middle Name"
            name="middleName"
            placeholder="Enter middle name"
          />
          <TextField
            label="Last Name"
            name="lastName"
            placeholder="Enter last name"
            required
          />
          <Select
            label="Gender"
            name="gender"
            placeholder="Select gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
            required
          />
          <TextField
            label="Occupation"
            name="occupation"
            placeholder="Enter occupation"
          />
          <TextField
            label="Employer"
            name="employer"
            placeholder="Enter employer"
          />
          <TextField
            label="National ID Number"
            name="nationalId"
            placeholder="Enter national ID number"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Contact Details
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Primary Phone"
            name="primaryPhone"
            type="tel"
            placeholder="Enter primary phone"
            required
          />
          <TextField
            label="Alternative Phone"
            name="alternativePhone"
            type="tel"
            placeholder="Enter alternative phone"
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter email address"
          />
          <TextField
            label="Residential Address"
            name="residentialAddress"
            placeholder="Enter residential address"
          />
          <TextField
            label="Digital Address"
            name="digitalAddress"
            placeholder="Enter digital address"
          />
          <TextField
            label="Town / City"
            name="townCity"
            placeholder="Enter town or city"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Student Link &amp; Portal
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <Select
            label="Linked Student"
            name="linkedStudent"
            placeholder="Select student"
            options={[]}
            required
          />
          <Select
            label="Authorised Pickup"
            name="authorisedPickup"
            placeholder="Select option"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            required
          />
          <Select
            label="Portal Access"
            name="portalAccess"
            placeholder="Select option"
            options={[
              { value: "enabled", label: "Enabled" },
              { value: "disabled", label: "Disabled" },
            ]}
          />
          <Select
            label="Preferred Communication"
            name="preferredCommunication"
            placeholder="Select preference"
            options={[
              { value: "sms", label: "SMS" },
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
            ]}
          />
          <TextField
            label="Emergency Contact"
            name="emergencyContact"
            placeholder="Enter emergency contact"
          />
        </div>

        <div className="p-6 pt-0">
          <TextArea
            label="Notes"
            name="notes"
            placeholder="Add any additional notes"
            className="w-full"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Guardian
          </Button>
        </div>
      </form>
    </section>
  );
};

export default GuardianForm;
