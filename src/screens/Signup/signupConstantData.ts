
export const Categorydata = [
  { label: 'Physician', value: 'physician' },
  { label: 'Dentistry', value: 'dentistry' },
  { label: 'Healthcare Support', value: 'healthcareSupport' },
  { label: 'Nurse', value: 'nurse' },
  { label: 'Other', value: 'other' },
];

export const Expertisedata = (param: any) => {
  switch (param) {
    case 'physician':
      return [
        { label: 'General Practitioner', value: 'generalPractitioner' },
        { label: 'Cardiologist', value: 'cardiologist' },
        { label: 'Dermatologist', value: 'dermatologist' },
        { label: 'Orthopedic Surgeon', value: 'orthopedicSurgeon' },
        { label: 'Pediatrician', value: 'pediatrician' },
      ];
    case 'dentistry':
      return [
        { label: 'Dentist', value: 'dentist' },
        { label: 'Orthodontist', value: 'orthodontist' },
        { label: 'Endodontist', value: 'endodontist' },
        { label: 'Oral and Maxillofacial Surgeon', value: 'oralandMaxillofacialSurgeon' },
        { label: 'Periodontist', value: 'periodontist' },
      ];
    case 'healthcareSupport':
      return [
        { label: 'Clinical Laboratory Scientist', value: 'clinicalLaboratoryScientist' },
        { label: 'Respiratory Therapist', value: 'respiratoryTherapist' },
        { label: 'Speech-Language Pathologist', value: 'speechLanguagePathologist' },
        { label: 'Occupational Therapist', value: 'occupationalTherapist' },
        { label: 'Physical Therapist', value: 'physicalTherapist' },
      ];
    case 'nurse':
      return [
        { label: 'Oncology Nurse', value: 'oncologyNurse' },
        { label: 'Pediatric Nurse', value: 'pediatricNurse' },
        { label: 'Critical Care Nurse', value: 'criticalCareNurse' },
        { label: 'Nurse Practitioner', value: 'nursePractitioner' },
        { label: 'Registered Nurse', value: 'registeredNurse' },
      ];
    case 'other':
      return [
        { label: 'Chiropractor', value: 'chiropractor' },
        { label: 'Naturopathic Doctor', value: 'naturopathicDoctor' },
        { label: 'Podiatrist', value: 'podiatrist' },
        { label: 'Optometrist', value: 'optometrist' },
        { label: 'Not Listed (Please Specify)', value: 'unlisted' },
      ];
    default:
      return [
        { label: 'DefaultCase', value: 'DefaultCase' },
      ];
    }
}

export const isValidEmail = (email:string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};