import Button from "@/components/Button";
import Heading from "../Heading";
import { Select, TextField } from "@/helper";

const StaffForm = () => {
  return (
    <section className="w-full">
      <form className="card w-full overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
            title="Add Staff Member"
            subtitle="Create a staff profile with employment and payroll details."
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Personal Information
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Staff Number"
            name="staffNumber"
            placeholder="Enter staff number"
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
          />
          <TextField label="Date of Birth" name="dateOfBirth" type="date" />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
            required
          />
          <TextField
            label="Email"
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
            label="Photo"
            name="photo"
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
          />
          <TextField
            label="Job Role"
            name="jobRole"
            placeholder="Enter job role"
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
          <TextField
            label="Supervisor"
            name="supervisor"
            placeholder="Enter supervisor"
          />
          <TextField label="Shift" name="shift" placeholder="Enter shift" />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Payroll &amp; Documents
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="SSNIT Number"
            name="ssnitNumber"
            placeholder="Enter SSNIT number"
          />
          <TextField
            label="Tax Identification Number"
            name="taxIdentificationNumber"
            placeholder="Enter TIN"
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
          <TextField
            label="Emergency Contact"
            name="emergencyContact"
            placeholder="Enter emergency contact"
          />
          <TextField
            label="Emergency Phone"
            name="emergencyPhone"
            type="tel"
            placeholder="Enter emergency phone"
          />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Staff Member
          </Button>
        </div>
      </form>
    </section>
  );
};

export default StaffForm;
