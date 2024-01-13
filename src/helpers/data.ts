import { getRandom } from "./random"
const medical_conditions= [
    'Cancer', 'Diabetes', 'Heart Disease', 'High Blood Pressure', 'High Cholesterol', 'Stroke', 'Asthma', 'Arthritis', 'Depression', 'Kidney Disease', 'Chronic Bronchitis', 'Chronic Obstructive Pulmonary Disease (COPD)', 'Emphysema', 'HIV/AIDS', 'Alzheimer’s Disease', 'Dementia', 'Osteoporosis', 'Thyroid Disease', 'Anxiety', 'Eating Disorders', 'Other Mental Health Conditions', 'Other', 
]
const medicines= [
    'Aziwok',
    'Azee',
    'Azicip',
    'Azimax',
    'Azithral',
    'Azithromycin',
    'Azivista',
    'Azomax',
    'Pulmoxyl',
    'Zithrox',
    'Zithrox Plus',
    'Zycin',
    'Sefdin',
    'Cefakind',
    'Cefdinir',
    'Cefdiel',

    
]
const people = [
    {
      name: 'Leslie Alexander',
      email: 'leslie.alexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      medicines:['Aziwok','Azicip','Azithromycin','Sefdin'],
      medical_conditions:['Cancer','Diabetes'],
      surgery:'POD 7 appendectomy'
    },
    {
      name: 'Michael Foster',
      email: 'michael.foster@example.com',
      role: 'Co-Founder / CTO',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      medicines:['Azee','Azomax','Zithrox','Cefakind'],
      medical_conditions:['Heart Disease', 'Blood Pressure','Stroke'],
      surgery:'POD 3 hernia repair'
    },
    {
      name: 'Dries Vincent',
      email: 'dries.vincent@example.com',
      role: 'Business Relations',
      imageUrl:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
      medicines:['Azithral','Azivista','Zithrox Plus','Cefdinir'],
      medical_conditions:['Asthma','Arthritis'],
      surgery:'POD 15 cholycystectomy'
    },
    {
      name: 'Lindsay Walton',
      email: 'lindsay.walton@example.com',
      role: 'Front-end Developer',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      medicines:['Azicip','Azivista','Zithrox Plus','Cefdinir'],
      medical_conditions:['Depression','Kidney Disease','Chronic Bronchitis'],
      surgery:'POD 19 colectomy'
    },
    {
      name: 'Courtney Henry',
      email: 'courtney.henry@example.com',
      role: 'Designer',
      imageUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: '3h ago',
      lastSeenDateTime: '2023-01-23T13:23Z',
      medicines:['Azivista','Zithrox Plus','Cefdinir'],
      medical_conditions:['Chronic Obstructive Pulmonary Disease (COPD)','Emphysema','HIV/AIDS'],
      surgery:'POD 21 mastectomy'
    },
    {
      name: 'Tom Cook',
      email: 'tom.cook@example.com',
      role: 'Director of Product',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      lastSeen: null,
      medicines:['Azee','Azomax','Zithrox','Sefdin'],
      medical_conditions:['Alzheimer’s Disease','Dementia','Osteoporosis'],
      surgery:'POD 23 appendectomy'
    },
  ]


export {
    people,
    medical_conditions,
    medicines
}