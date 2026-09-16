"use client";

import Button from "@/components/Button";
import Heading from "../Heading";
import { Checkbox, Select, TextField } from "@/helper";
import { capturePostHogEvent } from "@/helper/posthog";

const TeacherForm = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden"
        onSubmit={() =>
          capturePostHogEvent("teacher_creation_submitted", {
            entity_type: "teacher",
            form_type: "create",
          })
        }
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
            title="Add Teacher"
            subtitle="Create a teacher profile with employment and qualification details."
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Personal Information
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Teacher Number"
            name="teacherNumber"
            placeholder="Enter teacher number"
            required
          />
          <Select
            label="Title"
            name="title"
            placeholder="Select title"
            options={[
              { value: "mr", label: "Mr." },
              { value: "mrs", label: "Mrs." },
              { value: "ms", label: "Ms." },
              { value: "dr", label: "Dr." },
            ]}
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
          />
          <TextField label="Date of Birth" name="dateOfBirth" type="date" />
          <TextField
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            placeholder="Enter phone number"
            required
          />
          <TextField
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter email address"
            required
          />
          <TextField
            label="Residential Address"
            name="residentialAddress"
            placeholder="Enter residential address"
          />
          <TextField
            label="Teacher Photo"
            name="teacherPhoto"
            type="file"
            accept="image/png,image/jpeg"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Employment Information
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <Select
            label="Campus"
            name="campus"
            placeholder="Select campus"
            options={[]}
            required
          />
          <TextField
            label="Department"
            name="department"
            placeholder="Enter department"
            required
          />
          <Select
            label="Employment Type"
            name="employmentType"
            placeholder="Select employment type"
            options={[
              { value: "full-time", label: "Full-time" },
              { value: "part-time", label: "Part-time" },
              { value: "contract", label: "Contract" },
            ]}
          />
          <TextField
            label="Employment Date"
            name="employmentDate"
            type="date"
          />
          <Select
            label="Status"
            name="status"
            placeholder="Select status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
          <Select
            label="Class Teacher"
            name="classTeacher"
            placeholder="Select option"
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
          <TextField
            label="Staff Category"
            name="staffCategory"
            placeholder="Enter staff category"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Primary Subject
        </h2>
        <div className="grid gap-3 p-6 md:grid-cols-2 lg:grid-cols-4">
          <Checkbox label="Mathematics" name="subjects" value="mathematics" />
          <Checkbox label="English" name="subjects" value="english" />
          <Checkbox label="Science" name="subjects" value="science" />
          <Checkbox
            label="Social Studies"
            name="subjects"
            value="social-studies"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Qualifications &amp; Payroll
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Highest Qualification"
            name="highestQualification"
            placeholder="Enter highest qualification"
          />
          <TextField
            label="Institution"
            name="institution"
            placeholder="Enter institution"
          />
          <TextField
            label="Year Completed"
            name="yearCompleted"
            type="number"
            min="1900"
            placeholder="Enter year completed"
          />
          <TextField
            label="Professional Licence Number"
            name="professionalLicenceNumber"
            placeholder="Enter licence number"
          />
          <TextField
            label="SSNIT Number"
            name="ssnitNumber"
            placeholder="Enter SSNIT number"
          />
          <TextField
            label="Bank Name"
            name="bankName"
            placeholder="Enter bank name"
          />
          <TextField
            label="Account Number"
            name="accountNumber"
            placeholder="Enter account number"
          />
          <TextField label="Branch" name="branch" placeholder="Enter branch" />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Teacher
          </Button>
        </div>
      </form>
    </section>
  );
};

export default TeacherForm;
