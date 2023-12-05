
export const Categorydata = [
  { label: 'Physician', value: 'Physician' },
  { label: 'Dentistry', value: 'Dentistry' },
  { label: 'Healthcare Support', value: 'Healthcare Support' },
  { label: 'Nurse', value: 'Nurse' },
  { label: 'Other', value: 'Other' },
];

export const Expertisedata = (param: any) => {
  switch (param) {
    case 'Physician':
      return [
        { label: 'General Practitioner', value: 'General Practitioner' },
        { label: 'Cardiologist', value: 'Cardiologist' },
        { label: 'Dermatologist', value: 'Dermatologist' },
        { label: 'Orthopedic Surgeon', value: 'Orthopedic Surgeon' },
        { label: 'Pediatrician', value: 'Pediatrician' },
      ];
    case 'Dentistry':
      return [
        { label: 'Dentist', value: 'Dentist' },
        { label: 'Orthodontist', value: 'Orthodontist' },
        { label: 'Endodontist', value: 'Endodontist' },
        { label: 'Oral and Maxillofacial Surgeon', value: 'Oral and Maxillofacial Surgeon' },
        { label: 'Periodontist', value: 'Periodontist' },
      ];
    case 'Healthcare Support':
      return [
        { label: 'Clinical Laboratory Scientist', value: 'Clinical Laboratory Scientist' },
        { label: 'Respiratory Therapist', value: 'Respiratory Therapist' },
        { label: 'Speech-Language Pathologist', value: 'Speech-Language Pathologist' },
        { label: 'Occupational Therapist', value: 'Occupational Therapist' },
        { label: 'Physical Therapist', value: '' },
      ];
    case 'Nurse':
      return [
        { label: 'Oncology Nurse', value: 'Oncology Nurse' },
        { label: 'Pediatric Nurse', value: 'Pediatric Nurse' },
        { label: 'Critical Care Nurse', value: 'Critical Care Nurse' },
        { label: 'Nurse Practitioner', value: 'Nurse Practitioner' },
        { label: 'Registered Nurse', value: 'Registered Nurse' },
      ];
    case 'Other':
      return [
        { label: 'Chiropractor', value: 'Chiropractor' },
        { label: 'Naturopathic Doctor', value: 'Naturopathic Doctor' },
        { label: 'Podiatrist', value: 'Podiatrist' },
        { label: 'Optometrist', value: 'Optometrist' },
        { label: 'Not Listed (Please Specify)', value: 'Not Listed (Please Specify)' },
      ];
    default:
      return [
        { label: 'DefaultCase', value: 'DefaultCase' },
      ];
    }
}