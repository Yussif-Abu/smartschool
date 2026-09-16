'use client'

import Button from '@/components/Button'
import { TextField,Select,TextArea } from '@/helper'
import Heading from '../Heading'
import { countries} from '@/helper/data/countries'
import { classes } from '@/helper/data/classes'
import { capturePostHogEvent } from '@/helper/posthog'

const StudentForm = () => {
  return (
    <section className="w-full">
      <form
        className="card w-full overflow-hidden"
        onSubmit={() => capturePostHogEvent('student_creation_submitted', {
          entity_type: 'student',
          form_type: 'create',
        })}
      >
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
         <Heading title="Add Student" subtitle="Create a complete student profile and assign the learner to a campus and class." />
        </div>
        <h1 className="text-lg font-semibold text-slate-800 p-4">Personal Information</h1>

        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <TextField
              label="First Name"
              name="firstName"
              placeholder="Enter first name" className='flex-1'
              required
            />
             <TextField
              label="Middle Name"
              name="middleName"
              placeholder="Enter middle name" className='flex-1'
            />
             <TextField
              label="Last Name"
              name="lastName"
              placeholder="Enter last name" className='flex-1'
              required
            />
        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
          <TextField
              label="Date Of Birth"
              name="dob"
              placeholder="Enter date of birth" className='flex-1'
              required
              type="date"
            />
             <Select
              label="Gender"
              name="gender"
              placeholder="Select gender" className='flex-1'
              options={[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
                { value: 'other', label: 'Other' },
              ]}
              required
            />
            <Select
              label="Nationality"
              name="nationality"
              placeholder="Select nationality" className='flex-1'
              options={countries}
              required
            />
        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <Select
              label="Blood Group"
              name="bloodGroup"
              placeholder="Select blood group" className='flex-1'
              options={[
                { value: 'a+', label: 'A+' },
                { value: 'a-', label: 'A-' },
                { value: 'b+', label: 'B+' },
                { value: 'b-', label: 'B-' },
                { value: 'ab+', label: 'AB+' },
                { value: 'ab-', label: 'AB-' },
                { value: 'o+', label: 'O+' },
                { value: 'o-', label: 'O-' },
              ]}
              required
            />
            <Select
              label="Religion"
              name="religion"
              placeholder="Select religion" className='flex-1'
              options={[
                { value: 'christianity', label: 'Christianity' },
                { value: 'islam', label: 'Islam' },
                { value: 'hinduism', label: 'Hinduism' },
                { value: 'buddhism', label: 'Buddhism' },
                { value: 'other', label: 'Other' },
              ]}
              required
            />
            <TextField
              label="Upload Image"
              name="image"
              placeholder="Upload student image" className='flex-1'
              required
              type="file"
            />
        </div>
        <h1 className="text-lg font-semibold text-slate-800 p-4">Academic Information</h1>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <Select
              label="Campus"
              name="campus"
              placeholder="Select Campus" className='flex-1'
              options={[
                { value: 'campus-a', label: 'Campus A' },
                { value: 'campus-b', label: 'Campus B' },
                { value: 'campus-c', label: 'Campus C' },
              ]}
              required
            />
            <Select label="Grade/Class"
              name='class'
              placeholder="Select Class" className='flex-1'
              options={classes}
              required
            />
            <Select
              label="Term"
              name="term"
              placeholder="Select Term" className='flex-1'
              options={[
                { value: 'term-a', label: 'Term A' },
                { value: 'term-b', label: 'Term B' },
                { value: 'term-c', label: 'Term C' },
              ]}
              required
            />

        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
             <TextField
              label="Student ID"
              name="student_id"
              placeholder="Student ID" className='flex-1'
              disabled
              required
            />
            <Select
              label="Academic Year"
              name="academic_year"
              placeholder="Select Academic Year" className='flex-1'
              options={[
                { value: '2025/2026', label: '2025/2026' },
                { value: '2026/2027', label: '2026/2027' },
                { value: '2027/2028', label: '2027/2028' },
              ]}
              required
            />
            <TextField
              label="Admission Date"
              name="admission_date"
              placeholder="Enter date of admission" className='flex-1'
              required
              type="date"
            />
        </div>
        <h1 className="text-lg font-semibold text-slate-800 p-4">Guardian & Emergency Contact</h1>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <TextField
              label="Guardian Full Name "
              name="guardian_name"
              placeholder="Enter Guardian Full Name " className='flex-1'
              required
            />
            <Select label="Relationship"
              name='relationship'
              placeholder="Select Relationship" className='flex-1'
              options={[
                {value:"father",label:"Father"},
                {value:"mother",label:"Mother"},
                {value:"guardian",label:"Guardian"},
                {value:"other", label:"Other"}
              ]}
              required
            />
            <TextField
              label="Primary Phone "
              name="phone"
              placeholder="Enter Primary Phone " className='flex-1'
              required
              type='number'
            />
        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <TextField
              label="Alternative Phone"
              name="Alternative Phone"
              placeholder="Alternative Phone" className='flex-1'
              required
            />
            <TextField
              label="Guardian Email"
              name="email"
              placeholder="Guardian Email" className='flex-1'
              required
              type='email'
            />
            <TextField
              label="Occupation"
              name="Occupation"
              placeholder="Enter Occupation" className='flex-1'
              required
            />
        </div>
         <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <TextField
              label="Emergency Contact Name"
              name="Emergency Contact Name"
              placeholder="Emergency Contact Name" className='flex-1'
              required
            />
            <TextField
              label="Emergency Contact Phone"
              name="Emergency Contact Phone"
              placeholder="Emergency Contact Phone" className='flex-1'
              required
            />
            <TextField
              label="Authorised Pickup Persons"
              name="Authorised Pickup Persons"
              placeholder="Enter Authorised Pickup Persons" className='flex-1'
              required
            />
        </div>
        <h1 className="text-lg font-semibold text-slate-800 p-4">Medical & Additional Information</h1>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
           <TextArea label="Known Allergies" name='Known Allergies' className='flex-1'/>
           <TextArea label="Medical Conditions" name='Medical Conditions' className='flex-1'/>
           <TextArea label="Current Medication" name='Current Medication' className='flex-1'/>
        </div>
        <div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6">
            <TextField
              label="Health Insurance Number"
              name="Health Insurance Number"
              placeholder="Enter Health Insurance Number" className='flex-1'
              required
            />
           <TextArea label="Special Educational Needs" name='Special Educational Needs' className='flex-1'/>
           <TextArea label="Notes" name='Notes' className='flex-1'/>
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <Button type="button" variant="outline" size="md">
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="md">
            Save Student
          </Button>
        </div>
      </form>
    </section>
  )
}

export default StudentForm