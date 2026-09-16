"use client"

import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { TextField,Select } from "@/helper";
import { capturePostHogEvent } from "@/helper/posthog";
const SubjectPage = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden p-6"
        onSubmit={(event) => {
        event.preventDefault();
        capturePostHogEvent("subject_creation_submitted", {
        entity_type: "subject",
        form_type: "create",
        });
        }}
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <Heading
          title="Add Subject"
          subtitle="Configure and manage Subjects"
          />
        </div>
        <div className="flex flex-col gap-4 md:flex-row md:gap-6">
          <TextField
            label="Subject Name"
            name="subject"
            placeholder="Enter Subject Name"
            required
          />
          <TextField
            label="Subject Code"
            name="code"
            placeholder="Enter Subject Code"
            required
          />
          <Select
            label="Department"
            name="department"
            placeholder="Select Department"
            options={[
              {value:"STEM", label:"STEM"},
              {value:"Science", label:"Science"},
              {value:"Humanities", label:"Humanities"},
              {value:"Social Studies", label:"Social Studies"},
              {value:"Commerce", label:"Commerce"},
              {value:"Creative Arts", label:"Creative Arts"}
            ]}/>
          <Select
            label="Subject Type"
            name="type"
            placeholder="Select Subject Type"
            options={[
              {value:"Core", label:"Core Subject"},
              {value:"Elective", label:"Elective Subject"}
            ]}/>
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

export default SubjectPage