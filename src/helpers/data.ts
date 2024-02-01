import { getRandom } from "./random";
const medical_conditions = [
  "Cancer",
  "Diabetes",
  "Heart Disease",
  "High Blood Pressure",
  "High Cholesterol",
  "Stroke",
  "Asthma",
  "Arthritis",
  "Depression",
  "Kidney Disease",
  "Chronic Bronchitis",
  "Chronic Obstructive Pulmonary Disease (COPD)",
  "Emphysema",
  "HIV/AIDS",
  "Alzheimer’s Disease",
  "Dementia",
  "Osteoporosis",
  "Thyroid Disease",
  "Anxiety",
  "Eating Disorders",
  "Other Mental Health Conditions",
  "Other",
];
const medicines = [
  "Aziwok",
  "Azee",
  "Azicip",
  "Azimax",
  "Azithral",
  "Azithromycin",
  "Azivista",
  "Azomax",
  "Pulmoxyl",
  "Zithrox",
  "Zithrox Plus",
  "Zycin",
  "Sefdin",
  "Cefakind",
  "Cefdinir",
  "Cefdiel",
];
const people = [
  {
    patient_number: 1,
    first_name: "Isabella",
    last_name: "Martinez",
    full_name: "Isabella Martinez",
    gender: "F",
    age: 32,
    date_of_birth: "11/22/1991",
    procedure: "appendectomy",
    surgeon: "Brown",
    pod_day: 4,
    "surgical_date (current date - POD day)": "",
    phone_number: "(555) 123-4567",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 2,
    first_name: "Rohit",
    last_name: "Joshi",
    full_name: "Rohit Joshi",
    gender: "M",
    age: 65,
    date_of_birth: "02/09/1958",
    procedure: "inguinal hernia repair",
    surgeon: "Gonzalez",
    pod_day: 3,
    "surgical_date (current date - POD day)": "",
    phone_number: "(212) 987-6543",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 3,
    first_name: "Julie",
    last_name: "Van Saun",
    full_name: "Julie  Van Saun",
    gender: "F",
    age: 30,
    date_of_birth: "05/25/1993",
    procedure: "cholecystectomy",
    surgeon: "Brown",
    pod_day: 2,
    "surgical_date (current date - POD day)": "",
    phone_number: "(408) 555-0123",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 4,
    first_name: "James",
    last_name: "Anderson",
    full_name: "James Anderson",
    gender: "M",
    age: 24,
    date_of_birth: "2/14/1998",
    procedure: "appendectomy",
    surgeon: "Sayed",
    pod_day: 12,
    "surgical_date (current date - POD day)": "",
    phone_number: "(305) 442-8090",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 5,
    first_name: "Emily",
    last_name: "Lin",
    full_name: "Emily Lin",
    gender: "F",
    age: 31,
    date_of_birth: "01/04/1993",
    procedure: "mastectomy",
    surgeon: "Stein",
    pod_day: 8,
    "surgical_date (current date - POD day)": "",
    phone_number: "(702) 555-6789",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 6,
    first_name: "Beverly",
    last_name: "Harris",
    full_name: "Beverly Harris",
    gender: "F",
    age: 48,
    date_of_birth: "06/20/1975",
    procedure: "breast biopsy",
    surgeon: "Gonzalez",
    pod_day: 7,
    "surgical_date (current date - POD day)": "",
    phone_number: "(415) 334-9021",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 7,
    first_name: "Daniel",
    last_name: "Barclay",
    full_name: "Daniel Barclay",
    gender: "M",
    age: 67,
    date_of_birth: "05/10/1956",
    procedure: "colectomy",
    surgeon: "Stein",
    pod_day: 19,
    "surgical_date (current date - POD day)": "",
    phone_number: "(503) 555-1122",
    pharmacy_information: "",
    imageUrl:''
  },
  {
    patient_number: 8,
    first_name: "Jonathan",
    last_name: "Hernandez",
    full_name: "Jonathan  Hernandez",
    gender: "M",
    age: 72,
    date_of_birth: "08/12/51",
    procedure: "umbilical hernia repair",
    surgeon: "Sayed",
    pod_day: 6,
    "surgical_date (current date - POD day)": "",
    phone_number: "(312) 555-9988",
    pharmacy_information: "",
    imageUrl:''
  },
];

const concerns = [
  "Fever",
  "Wound concern",
  "Pain",
  "Constipation",
  "Prescription issue",
  // "Swelling",
  "Wound VAC",
  "Urinary Symptoms",
  "Drain Issues",
  // "Other",
];

const concern_starting_test = {
  "Fever": "I understand that you are concerned about a possible fever.",
  "Wound concern": "I understand that you are concerned about your wound.",
  "Pain": "I understand that you are concerned about your pain.",
  "Constipation": "I understand that you are concerned about your bowel movements.",
  "Prescription issue": "I understand that you are concerned about a prescription issue.",
  "Swelling": "I understand that you are experiencing swelling.",
  "Wound VAC": "I understand that you have a concern about your wound VAC.",
  "Urinary Symptoms": "I understand that you are having urinary symptoms.",
  "Drain Issues": "I understand that you are having drain issues.",
  "Other": "I understand that you have an issue you'd like to discuss."
}

const concerns_starting_msg = [
  {
      "concern": "Fever",
      "message": "I understand that you are concerned about a possible fever."
  },
  {
      "concern": "Wound concern",
      "message": "I understand that you are concerned about your wound."
  },
  {
      "concern": "Pain",
      "message": "I understand that you are concerned about your pain."
  },
  {
      "concern": "Constipation",
      "message": "I understand that you are concerned about your bowel movements."
  },
  {
      "concern": "Prescription issue",
      "message": "I understand that you are concerned about a prescription issue."
  },
  {
      "concern": "Swelling",
      "message": "I understand that you are experiencing swelling."
  },
  {
      "concern": "Wound VAC",
      "message": "I understand that you have a concern about your wound VAC."
  },
  {
      "concern": "Urinary Symptoms",
      "message": "I understand that you are having urinary symptoms."
  },
  {
      "concern": "Drain Issues",
      "message": "I understand that you are having drain issues."
  },
  {
      "concern": "Other",
      "message": "I understand that you have an issue you'd like to discuss."
  }
]
export { people, medical_conditions, medicines, concerns,concerns_starting_msg };
