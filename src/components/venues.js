const venues = [
  {
    "name": "Faculty of Agriculture",
    "position": [-17.7818724, 31.0508484],
    "venues": [
      { "name": "Agriculture Conference Hall (ACH)" },
      { "name": "Agriculture Seminar Room 1 (ASR1)" },
      { "name": "Crop Science Laboratory" }
    ]
  },
  {
    "name": "Mining",
    "position": [-17.7826674, 31.0506276],
    "venues": [
      { "name": "Mining Engineering Seminar Room 1 (MINSR1)" },
      { "name": "Mineral Processing Lab" },
      { "name": "Mining Geology Laboratory" }
    ]
  },
  {
    "name": "Dept of Physics",
    "position": [-17.7823505, 31.0517877],
    "venues": [
      { "name": "Space Science & Applied Physics Lab (SSAP)" },
      { "name": "Optics Laboratory" },
      { "name": "Thermodynamics Lab" }
    ]
  },
  {
    "name": "Dept of Geology",
    "position": [-17.782621, 31.0525225],
    "venues": [
      { "name": "Geology Lab (G2)" },
      { "name": "Mineralogy Laboratory" },
      { "name": "Petrology Lab" }
    ]
  },
  {
    "name": "Dept of Geography & Environmental Science",
    "position": [-17.7824916, 31.0531213],
    "venues": [
      { "name": "Geography Lab 1 (GLB)" },
      { "name": "Science Lecture Theatre (SLT)" },
      { "name": "GIS Laboratory" }
    ]
  },
  {
    "name": "Rural and Urban Planning",
    "position": [-17.7827007, 31.0531211],
    "venues": [
      { "name": "Rural & Urban Planning Studio 1 (STD1)" },
      { "name": "Rural & Urban Planning Studio 2 (ST2)" },
      { "name": "Rural & Urban Planning Lecture Room 6 (PA6)" }
    ]
  },
  {
    "name": "Statistics",
    "position": [-17.7834826, 31.0506746],
    "venues": [
      { "name": "Mathematics Seminar Room 5 (MTSR5)" },
      { "name": "Statistical Computing Lab" },
      { "name": "Data Analysis Room" }
    ]
  },
  {
    "name": "Computer Science",
    "position": [-17.7831733, 31.0508704],
    "venues": [
      { "name": "Computer Science Hardware Lab (CTHL)" },
      { "name": "HLT500" },
      { "name": "Software Development Lab" }
    ]
  },
  {
    "name": "IES, Computer Science",
    "position": [-17.7831472, 31.0511681],
    "venues": [
      { "name": "IES Computer Lab" },
      { "name": "Education Technology Room" },
      { "name": "E-Learning Studio" }
    ]
  },
  {
    "name": "Maths and Chemistry",
    "position": [-17.7830837, 31.0515573],
    "venues": [
      { "name": "Chemistry Lab G2" },
      { "name": "Science Seminar Rooms (SCI-SMR1)" },
      { "name": "Mathematics Tutorial Room" }
    ]
  },
  {
    "name": "UZ Computer Centre",
    "position": [-17.7835941, 31.051004],
    "venues": [
      { "name": "Main Computer Lab" },
      { "name": "Server Room" },
      { "name": "IT Support Desk" }
    ]
  },
  {
    "name": "Wildlife Section",
    "position": [-17.783668, 31.05122],
    "venues": [
      { "name": "Biological Science Lab (BSD2)" },
      { "name": "Wildlife Research Office" },
      { "name": "Conservation Lab" }
    ]
  },
  {
    "name": "Survey",
    "position": [-17.7830858, 31.0525959],
    "venues": [
      { "name": "Surveying Seminar Room 1 (SURSR1)" },
      { "name": "Surveying Seminar Room 3 (SSR3)" },
      { "name": "Geodetic Survey Lab" }
    ]
  },
  {
    "name": "Zoology and Biology",
    "position": [-17.7831908, 31.0521347],
    "venues": [
      { "name": "Biological Science Lab (BSD2)" },
      { "name": "Zoology Museum" },
      { "name": "Entomology Lab" }
    ]
  },
  {
    "name": "Basketball Court",
    "position": [-17.7839437, 31.0530484],
    "venues": [
      { "name": "Main Basketball Court" },
      { "name": "Changing Rooms" },
      { "name": "Equipment Storage" }
    ]
  },
  {
    "name": "NLT 500",
    "position": [-17.7833699, 31.0535798],
    "venues": [
      { "name": "NLT400 Main Theatre" },
      { "name": "Upper Mezzanine Seating" },
      { "name": "Audio Control Room" }
    ]
  },
  {
    "name": "Senior Common Room",
    "position": [-17.7833729, 31.0541901],
    "venues": [
      { "name": "Staff Lounge" },
      { "name": "Meeting Room 1" },
      { "name": "Tea Room" }
    ]
  },
  {
    "name": "Students Union Dining",
    "position": [-17.7829324, 31.0547949],
    "venues": [
      { "name": "Main Dining Hall" },
      { "name": "Kitchen Area" },
      { "name": "Cafeteria" }
    ]
  },
  {
    "name": "Student's Union Building",
    "position": [-17.7827258, 31.0548129],
    "venues": [
      { "name": "SUB Main Hall" },
      { "name": "SUSA Offices" },
      { "name": "Student Common Room" }
    ]
  },
  {
    "name": "Students Union Hall",
    "position": [-17.7825073, 31.0548367],
    "venues": [
      { "name": "SU Events Hall" },
      { "name": "Stage Area" },
      { "name": "Backstage Room" }
    ]
  },
  {
    "name": "Beit Hall",
    "position": [-17.7825816, 31.0538765],
    "venues": [
      { "name": "Beit Hall Main Hall" },
      { "name": "Examination Office" },
      { "name": "Storage Room" }
    ]
  },
  {
    "name": "Sports Pavilion",
    "position": [-17.7850189, 31.0537441],
    "venues": [
      { "name": "Gymnasium" },
      { "name": "Changing Rooms" },
      { "name": "Coaches Office" }
    ]
  },
  {
    "name": "Faculty of Science",
    "position": [-17.7843269, 31.0506063],
    "venues": [
      { "name": "Faculty of Social & Behavioural Sciences Lab (FSBS)" },
      { "name": "Dean's Office" },
      { "name": "Staff Common Room" }
    ]
  },
  {
    "name": "Diamond Lecture Theatre",
    "position": [-17.7820388, 31.0525951],
    "venues": [
      { "name": "Diamond Main Theatre" },
      { "name": "Diamond Lecture Room 2" },
      { "name": "AV Control Room" }
    ]
  },
  {
    "name": "Chapel",
    "position": [-17.78287645811501, 31.05698072595309],
    "venues": [
      { "name": "Main Chapel" },
      { "name": "Prayer Room" },
      { "name": "Clergy Office" }
    ]
  },
  {
    "name": "CBZ Bank",
    "position": [-17.78229645721664, 31.05612654326619],
    "venues": [
      { "name": "Banking Hall" },
      { "name": "ATM Lobby" },
      { "name": "Manager's Office" }
    ]
  },
  {
    "name": "New Hall",
    "position": [-17.781407826784175, 31.058676278543647],
    "venues": [
      { "name": "New Hall Main Venue" },
      { "name": "Conference Room" },
      { "name": "VIP Lounge" }
    ]
  },
  {
    "name": "Manfred Hostel",
    "position": [-17.781336382455727, 31.057760930396395],
    "venues": [
      { "name": "Common Room" },
      { "name": "Kitchen Area" },
      { "name": "Laundry Room" }
    ]
  },
  {
    "name": "NC5 Hostel",
    "position": [-17.780732443426974, 31.059361966723483],
    "venues": [
      { "name": "Common Room" },
      { "name": "Kitchenette" },
      { "name": "Study Area" }
    ]
  },
  {
    "name": "Great Hall",
    "position": [-17.78079538083827, 31.0541659185905],
    "venues": [
      { "name": "Great Hall Main Arena" },
      { "name": "Great Hall Mezzanine" },
      { "name": "VIP Room" }
    ]
  },
  {
    "name": "Main Library",
    "position": [-17.780606897933566, 31.05357893020775],
    "venues": [
      { "name": "Library Reference Section" },
      { "name": "Library Computer Lab" },
      { "name": "Silent Study Area" }
    ]
  },
  {
    "name": "Administration Block",
    "position": [-17.781406324059084, 31.054008933325346],
    "venues": [
      { "name": "Cash Office" },
      { "name": "Registrar's Office" },
      { "name": "Human Resources" }
    ]
  },
  {
    "name": "Social Sciences Department",
    "position": [-17.780512310470026, 31.05220814520321],
    "venues": [
      { "name": "Llewellyn Lecture Room G1 (LLG1)" },
      { "name": "Llewellyn Lecture Room G2 (LLG2)" },
      { "name": "Llewellyn Lecture Room G3 (LLG3)" },
      { "name": "Llewellyn Lecture Room F1 (LLF1)" },
      { "name": "Llewellyn Hall Mezzanine (LHMEZZ)" }
    ]
  },
  {
    "name": "LTI",
    "position": [-17.780346738533048, 31.052453154277238],
    "venues": [
      { "name": "LTI Main Hall" },
      { "name": "LTI Back Hall" },
      { "name": "Projection Room" }
    ]
  },
  {
    "name": "LTII",
    "position": [-17.780368205831522, 31.05245859426375],
    "venues": [
      { "name": "LTII Main Hall" },
      { "name": "LTII Mezzanine" },
      { "name": "Control Room" }
    ]
  },
  {
    "name": "Faculty of Engineering",
    "position": [-17.7820, 31.0545],
    "venues": [
      { "name": "Timber Lecture Room (TLR)" },
      { "name": "Drawing Office (DO)" },
      { "name": "Industrial & Mechanical SR1 (IME SR1)" },
      { "name": "Industrial & Mechanical SR2 (IME SR2)" }
    ]
  },
  {
    name: "Manfred Hall Hostel",
    position: [-17.781062, 31.0583497],
    venues: [
      { name: "Reception Area" },
      { name: "Common Room" },
      { name: "Kitchen" }
    ]
  },
  {
    name: "Manfred Hudson Hall Reception",
    position: [-17.781499, 31.0581529],
    venues: [
      { name: "Main Reception" },
      { name: "Security Office" },
      { name: "Waiting Area" }
    ]
  },
  {
    name: "Manfred Hall Common Room",
    position: [-17.7817749, 31.0571851],
    venues: [
      { name: "TV Room" },
      { name: "Games Area" },
      { name: "Study Corner" }
    ]
  },
  {
    name: "Manfred Hudson Hall Dinning",
    position: [-17.7817567, 31.0570012],
    venues: [
      { name: "Main Dining Area" },
      { name: "Kitchen" },
      { name: "Food Serving Area" }
    ]
  },
  {
    name: "Swinton Hall",
    position: [-17.7813272, 31.0569084],
    venues: [
      { name: "Common Room" },
      { name: "Kitchen Area" },
      { name: "Laundry Room" }
    ]
  },
  {
    name: "Swinton Hostel",
    position: [-17.781392, 31.0563694],
    venues: [
      { name: "Residence Common Room" },
      { name: "Study Area" },
      { name: "Kitchenette" }
    ]
  },
  {
    name: "Mother Swinton Residence",
    position: [-17.7811071, 31.0564669],
    venues: [
      { name: "Warden's Office" },
      { name: "Residence Lounge" },
      { name: "Guest Room" }
    ]
  },
  {
    name: "Law Library",
    position: [-17.7805211, 31.0530301],
    venues: [
      { name: "Law Reference Section" },
      { name: "Legal Journals Room" },
      { name: "Quiet Study Area" }
    ]
  },
  {
    name: "Faculty of Law",
    position: [-17.7802847, 31.0530403],
    venues: [
      { name: "Moot Court" },
      { name: "Law Lecture Theatre" },
      { name: "Legal Aid Clinic" }
    ]
  },
  {
    name: "Commerce Building",
    position: [-17.7810051, 31.0566595],
    venues: [
      { name: "Commerce Lecture Hall" },
      { name: "Accounting Lab" },
      { name: "Economics Seminar Room" }
    ]
  },
  {
    name: "Lewellin Hall",
    position: [-17.7810108, 31.0519816],
    venues: [
      { name: "Lewellin Main Hall" },
      { name: "Lewellin Lecture Room 1" },
      { name: "Lewellin Lecture Room 2" }
    ]
  },
  {
    name: "UZ Photographic Section",
    position: [-17.7813765, 31.0534416],
    venues: [
      { name: "Photo Studio" },
      { name: "Dark Room" },
      { name: "Equipment Store" }
    ]
  },
  {
    name: "HLT",
    position: [-17.7803252, 31.0510967],
    venues: [
      { name: "HLT Lecture Hall" },
      { name: "HLT Seminar Room" },
      { name: "Computer Lab" }
    ]
  },
  {
    name: "Arts Building",
    position: [-17.780678, 31.0519323],
    venues: [
      { name: "Arts Lecture Theatre" },
      { name: "Language Lab" },
      { name: "Art Studio" }
    ]
  },
  {
    name: "Disability Resource Centre",
    position: [-17.7806018, 31.051253],
    venues: [
      { name: "Assistive Technology Lab" },
      { name: "Resource Library" },
      { name: "Counselling Room" }
    ]
  },
  {
    name: "UZ Student Records",
    position: [-17.78035, 31.05066],
    venues: [
      { name: "Records Office" },
      { name: "Transcript Counter" },
      { name: "Document Storage" }
    ]
  },
  {
    name: "Faculty of Education",
    position: [-17.7806882, 31.0509632],
    venues: [
      { name: "Education Lecture Hall" },
      { name: "Microteaching Lab" },
      { name: "Curriculum Resource Centre" }
    ]
  },
  {
    name: "DAACS",
    position: [-17.7838658, 31.0562361],
    venues: [
      { name: "DAACS Office" },
      { name: "Meeting Room" },
      { name: "Computer Lab" }
    ]
  },
  {
    name: "Warden's House",
    position: [-17.7837228, 31.0560147],
    venues: [
      { name: "Warden's Office" },
      { name: "Reception" },
      { name: "Staff Room" }
    ]
  },
  {
    name: "Curr Saunders Hall",
    position: [-17.784012, 31.0556793],
    venues: [
      { name: "Common Room" },
      { name: "Dining Hall" },
      { name: "Kitchen" }
    ]
  },
  {
    name: "Curr Saunders",
    position: [-17.7840878, 31.0555356],
    venues: [
      { name: "Residence Block" },
      { name: "Study Area" },
      { name: "Laundry" }
    ]
  },
  {
    name: "New Complex 1",
    position: [-17.7836932, 31.0576292],
    venues: [
      { name: "Residence Rooms" },
      { name: "Common Area" },
      { name: "Kitchen" }
    ]
  },
  {
    name: "The New Hall",
    position: [-17.7818106, 31.0568667],
    venues: [
      { name: "Main Hall" },
      { name: "Conference Room" },
      { name: "Lounge Area" }
    ]
  },
  {
    name: "New Lewellin",
    position: [-17.7811315, 31.051771],
    venues: [
      { name: "New Lewellin Hall" },
      { name: "Seminar Room 1" },
      { name: "Seminar Room 2" }
    ]
  },
  {
    name: "UZ swimming pool",
    position: [-17.7832648, 31.0546648],
    venues: [
      { name: "Main Pool" },
      { name: "Changing Rooms" },
      { name: "Lifeguard Station" }
    ]
  },
  {
    name: "New Complex 2",
    position: [-17.7840605, 31.0579478],
    venues: [
      { name: "Residence Rooms" },
      { name: "Common Room" },
      { name: "Kitchen" }
    ]
  },
  {
    name: "Bus terminal",
    position: [-17.780338, 31.0563323],
    venues: [
      { name: "Bus Stop" },
      { name: "Waiting Shelter" },
      { name: "Ticket Office" }
    ]
  },
  {
    name: "Students Clinic",
    position: [-17.7822876, 31.0559681],
    venues: [
      { name: "Consultation Room" },
      { name: "Pharmacy" },
      { name: "Waiting Area" }
    ]
  },
  {
    name: "Faculty of arts and humanities",
    position: [-17.7806261, 31.0516766],
    venues: [
      { name: "Main Lecture Hall" },
      { name: "Department Office" },
      { name: "Staff Common Room" }
    ]
  },
  {
    name: "New Complex 5",
    position: [-17.7806227, 31.0572827],
    venues: [
      { name: "Residence Rooms" },
      { name: "Common Area" },
      { name: "Kitchen" }
    ]
  },
  {
    name: "New Complex 5 Dinnig",
    position: [-17.7810438, 31.0591422],
    venues: [
      { name: "Dining Hall" },
      { name: "Kitchen" },
      { name: "Food Court" }
    ]
  },
  {
    name: "New Complex 5 Warden",
    position: [-17.7806606, 31.0584697],
    venues: [
      { name: "Warden's Office" },
      { name: "Reception" },
      { name: "Staff Room" }
    ]
  },
  {
    name: "Student Affairs Division",
    position: [-17.7822775, 31.0557747],
    venues: [
      { name: "Student Affairs Office" },
      { name: "Counselling Centre" },
      { name: "Records Office" }
    ]
  },
  {
    name: "Centre for Engineering",
    position: [-17.7811315, 31.0498576],
    venues: [
      { name: "Engineering Lab" },
      { name: "Project Room" },
      { name: "Staff Office" }
    ]
  }
];



// Helper function to search for a venue by name
export const searchVenue = (query) => {
  const results = [];
  venues.forEach(building => {
    if (building.name.toLowerCase().includes(query.toLowerCase())) {
      results.push({
        building: building.name,
        buildingPosition: building.position,
        venue: { name: "Main Building" },
        buildingObj: building
      });
    }
    building.venues?.forEach(venue => {
      if (venue.name.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          building: building.name,
          buildingPosition: building.position,
          venue: venue,
          buildingObj: building
        });
      }
    });
  });
  return results;
};

export default venues;