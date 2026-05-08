const venues = [
  {
    name: "Admin Block",
    position: [-17.7845, 31.0530],
    rooms: [
      { name: "Vice Chancellor's Office", description: "2nd floor, Room 201. Turn left at the top of the main staircase." },
      { name: "Registrar's Office", description: "Ground floor, Room 105. First door on the right after the main entrance." },
      { name: "Finance Office", description: "Ground floor, Room 110. Follow the corridor past the Registrar, last door on the left." },
      { name: "Human Resources", description: "1st floor, Room 102. Take the staircase and turn right immediately." }
    ]
  },
  {
    name: "Main Library",
    position: [-17.7848, 31.0525],
    rooms: [
      { name: "Reference Section", description: "Ground floor, straight ahead from the main entrance past the issue desk." },
      { name: "Computer Lab", description: "1st floor, Room L101. Up the stairs, turn left, glass doors at the end." },
      { name: "Periodicals Room", description: "Ground floor, right wing. Follow signs past the journal shelves." },
      { name: "Silent Study Hall", description: "2nd floor. Take the lift or stairs — entire top floor is silent study." }
    ]
  },
  {
    name: "Student Union",
    position: [-17.7850, 31.0518],
    rooms: [
      { name: "Cafeteria", description: "Ground floor, left wing. Large double doors at the end of the corridor." },
      { name: "Games Room", description: "Ground floor, right wing. Room SU-04, next to the notice board." },
      { name: "Student Council Office", description: "1st floor, Room SU-201. Up the stairs, first door on the right." },
      { name: "ATM Lobby", description: "Ground floor, near main entrance on the right-hand side." }
    ]
  },
  {
    name: "Faculty of Science",
    position: [-17.7838, 31.0522],
    rooms: [
      { name: "Chemistry Lab", description: "Ground floor, Room SC-01. Enter through the side entrance, first lab on the left." },
      { name: "Physics Lab", description: "1st floor, Room SC-101. Up the stairs, turn right, second door." },
      { name: "Biology Lab", description: "Ground floor, Room SC-05. Follow the corridor to the end, turn left." },
      { name: "Lecture Theatre A", description: "Ground floor, Room SC-LT1. Main entrance, large theatre straight ahead." }
    ]
  },
  {
    name: "Faculty of Engineering",
    position: [-17.7835, 31.0535],
    rooms: [
      { name: "Civil Engineering Lab", description: "Ground floor, Room EN-01. Left wing from the main entrance." },
      { name: "Electrical Engineering Lab", description: "1st floor, Room EN-101. Up the stairs, turn right." },
      { name: "Mechanical Workshop", description: "Ground floor, rear of building. Follow signs from the main corridor." },
      { name: "Dean's Office", description: "2nd floor, Room EN-201. Top of the stairs, corner office." }
    ]
  },
  {
    name: "Faculty of Law",
    position: [-17.7852, 31.0510],
    rooms: [
      { name: "Moot Court", description: "Ground floor, Room LW-01. Enter main doors, court room is immediately on the left." },
      { name: "Law Library", description: "1st floor. Up the stairs, entire floor is the law library." },
      { name: "Lecture Theatre", description: "Ground floor, Room LW-LT1. Straight ahead from the main entrance." },
      { name: "Dean's Office", description: "2nd floor, Room LW-201. Top of the stairs, first door on the right." }
    ]
  },
  {
    name: "Faculty of Commerce",
    position: [-17.7843, 31.0515],
    rooms: [
      { name: "Accountancy Department", description: "1st floor, Room CM-101. Up the main stairs, turn left." },
      { name: "Economics Department", description: "1st floor, Room CM-105. Up the main stairs, turn right." },
      { name: "Lecture Theatre", description: "Ground floor, Room CM-LT1. Main entrance, straight ahead." },
      { name: "Dean's Office", description: "2nd floor, Room CM-201. Corner office at the top of the stairs." }
    ]
  },
  {
    name: "Faculty of Education",
    position: [-17.7858, 31.0528],
    rooms: [
      { name: "Educational Psychology Lab", description: "Ground floor, Room ED-01. Left wing from the main entrance." },
      { name: "Curriculum Studies Office", description: "1st floor, Room ED-102. Up the stairs, second door on the left." },
      { name: "Lecture Theatre", description: "Ground floor, Room ED-LT1. Straight ahead from the main entrance." },
      { name: "Dean's Office", description: "2nd floor, Room ED-201. Top of the stairs, turn right." }
    ]
  },
  {
    name: "Faculty of Arts",
    position: [-17.7841, 31.0508],
    rooms: [
      { name: "History Department", description: "1st floor, Room AR-101. Up the stairs, first door on the left." },
      { name: "Linguistics Department", description: "1st floor, Room AR-105. Up the stairs, third door on the right." },
      { name: "Lecture Theatre", description: "Ground floor, Room AR-LT1. Main entrance, straight ahead." },
      { name: "Dean's Office", description: "2nd floor, Room AR-201. Top of the stairs, corner office." }
    ]
  },
  {
    name: "Faculty of Vet Science",
    position: [-17.7860, 31.0535],
    rooms: [
      { name: "Anatomy Lab", description: "Ground floor, Room VS-01. Left wing of the building, follow signs from reception." },
      { name: "Clinical Skills Lab", description: "Ground floor, Room VS-03. Right wing, double doors at the far end." },
      { name: "Lecture Theatre", description: "1st floor, Room VS-LT1. Up the main staircase, theatre faces you at the top." },
      { name: "Animal Holding Area", description: "Behind the main building. Exit through the rear door and follow the path." }
    ]
  },
  {
    name: "Faculty of Agriculture",
    position: [-17.7862, 31.0520],
    rooms: [
      { name: "Soil Science Lab", description: "Ground floor, Room AG-01. Right wing from the main entrance." },
      { name: "Plant Sciences Lab", description: "Ground floor, Room AG-03. Left wing, last door at the end." },
      { name: "Lecture Theatre", description: "Ground floor, Room AG-LT1. Straight ahead from the main entrance." },
      { name: "Dean's Office", description: "1st floor, Room AG-101. Up the stairs, first door on the right." }
    ]
  },
  {
    name: "Faculty of Social Sciences",
    position: [-17.7847, 31.0505],
    rooms: [
      { name: "Psychology Lab", description: "Ground floor, Room SS-01. Left wing from the main entrance." },
      { name: "Sociology Department", description: "1st floor, Room SS-101. Up the stairs, turn left." },
      { name: "Lecture Theatre", description: "Ground floor, Room SS-LT1. Straight ahead from the main entrance." },
      { name: "Dean's Office", description: "2nd floor, Room SS-201. Top of the stairs, corner office." }
    ]
  },
  {
    name: "Beit Hall",
    position: [-17.7830, 31.0528],
    rooms: [
      { name: "Main Hall", description: "Ground floor. Enter through the main double doors straight ahead." },
      { name: "Common Room", description: "Ground floor, right wing. Follow the corridor from the main entrance." },
      { name: "Warden's Office", description: "Ground floor, Room BH-01. First door on the left after the entrance." },
      { name: "Laundry Room", description: "Basement level. Take the stairs down from the main corridor." }
    ]
  },
  {
    name: "Swinton Hall",
    position: [-17.7833, 31.0515],
    rooms: [
      { name: "Main Hall", description: "Ground floor. Enter through the main double doors straight ahead." },
      { name: "Common Room", description: "Ground floor, left wing. Follow the corridor from the main entrance." },
      { name: "Warden's Office", description: "Ground floor, Room SW-01. First door on the right after the entrance." },
      { name: "Study Room", description: "1st floor, Room SW-101. Up the stairs, turn left." }
    ]
  },
  {
    name: "Manfred Hodson Hall",
    position: [-17.7828, 31.0540],
    rooms: [
      { name: "Main Hall", description: "Ground floor. Enter through the main double doors straight ahead." },
      { name: "Common Room", description: "Ground floor, right wing. Large room at the end of the corridor." },
      { name: "Warden's Office", description: "Ground floor, Room MH-01. First door on the left after the entrance." },
      { name: "Study Room", description: "1st floor. Up the stairs, entire floor has study desks." }
    ]
  },
  {
    name: "Sports Pavilion",
    position: [-17.7820, 31.0545],
    rooms: [
      { name: "Changing Rooms", description: "Ground floor, both wings. Male on the left, female on the right." },
      { name: "Gym", description: "Ground floor, rear of building. Follow signs from the main entrance." },
      { name: "Sports Office", description: "Ground floor, Room SP-01. First door on the right at the entrance." },
      { name: "Equipment Store", description: "Ground floor, Room SP-05. Last door at the end of the left corridor." }
    ]
  },
  {
    name: "Health Centre",
    position: [-17.7855, 31.0515],
    rooms: [
      { name: "Reception", description: "Ground floor. Walk straight in through the main entrance." },
      { name: "Consultation Rooms", description: "Ground floor, right wing. Rooms HC-01 to HC-05 along the corridor." },
      { name: "Pharmacy", description: "Ground floor, left wing. Room HC-10, follow signs from reception." },
      { name: "Waiting Area", description: "Ground floor. Large seating area immediately inside the main entrance." }
    ]
  },
  {
    name: "Computer Centre",
    position: [-17.7842, 31.0533],
    rooms: [
      { name: "Lab 1", description: "Ground floor, Room CC-01. First lab on the left after the entrance." },
      { name: "Lab 2", description: "Ground floor, Room CC-02. Second lab on the left." },
      { name: "Server Room", description: "Ground floor, Room CC-10. Restricted access — contact IT staff." },
      { name: "Help Desk", description: "Ground floor, Reception area. Straight ahead from the main entrance." }
    ]
  }
];

export default venues;