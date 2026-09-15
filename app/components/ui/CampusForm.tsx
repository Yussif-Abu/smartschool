import Button from "@/components/Button";
import Heading from "../Heading";
import { Select, TextField } from "@/helper";

const CampusForm = () => {
  return (
    <section className="w-full">
      <form className="card w-full overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
            title="Add Campus"
            subtitle="Set up a campus and define its contact and capacity details."
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Campus Information
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Campus Name"
            name="campusName"
            placeholder="Enter campus name"
            required
          />
          <TextField
            label="Campus Code"
            name="campusCode"
            placeholder="Enter campus code"
            required
          />
          <Select
            label="Status"
            name="status"
            placeholder="Select status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
            required
          />
          <TextField
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Enter phone number"
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email address"
          />
          <TextField
            label="Campus Head"
            name="campusHead"
            placeholder="Enter campus head"
          />
        </div>

        <h2 className="p-6 pb-0 text-lg font-semibold text-slate-800">
          Address &amp; Capacity
        </h2>
        <div className="grid gap-5 p-6 md:grid-cols-2 lg:grid-cols-3">
          <TextField
            label="Street Address"
            name="streetAddress"
            placeholder="Enter street address"
          />
          <TextField
            label="City / Town"
            name="cityTown"
            placeholder="Enter city or town"
          />
          <TextField label="Region" name="region" placeholder="Enter region" />
          <TextField
            label="Student Capacity"
            name="studentCapacity"
            type="number"
            min="0"
            placeholder="Enter student capacity"
          />
          <TextField label="Opening Date" name="openingDate" type="date" />
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Campus
          </Button>
        </div>
      </form>
    </section>
  );
};

export default CampusForm;
