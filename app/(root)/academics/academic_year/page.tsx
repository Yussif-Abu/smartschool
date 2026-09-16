"use client"

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { TextField } from "@/helper";
import { capturePostHogEvent } from "@/helper/posthog";
const AcademicYear = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden p-6"
        onSubmit={() =>
        capturePostHogEvent("teacher_creation_submitted", {
        entity_type: "academic_year",
        form_type: "create",
        })
        }
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
          title="Add Academic Year"
          subtitle="Configure and manage Academic Year"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TextField 
            label="Academic Year" 
            name="academic_year"
            placeholder="Enter Academic Year" 
            required
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

export default AcademicYear