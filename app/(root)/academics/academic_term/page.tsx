"use client"

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { TextField,Select } from "@/helper";
import { capturePostHogEvent } from "@/helper/posthog";
const AcademicTerm = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden p-6"
        onSubmit={(event) => {
        event.preventDefault();
        capturePostHogEvent("academic_term_creation_submitted", {
        entity_type: "academic_term",
        form_type: "create",
        });
        }}
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
          title="Add Term"
          subtitle="Configure Academic Term"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <Select 
            label="Term" 
            name="term" 
            placeholder="Select Term"
            options={[
            {value:"term1", label:"Term 1"},
            {value:"term2", label:"Term 2"},
            {value:"term3", label:"Term 3"}
            ]}
          />
          <TextField 
            label="Start Date" 
            name="start"
            placeholder="Enter Start Date" 
            required
            type="date"
          />
          <TextField 
            label="End Date" 
            name="end"
            placeholder="Enter End Date" 
            required
            type="date"
          />
        </div>
        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md">
            Save
          </Button>
        </div>
      </form>
    </section>
  )
}

export default AcademicTerm