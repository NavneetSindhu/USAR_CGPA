let regulations = {
    "2023": {
        "AR/AIDS/AIML/IIOT": 
        {
            "Semester 1": [
                {
                    "subject": "Indian Constitution",
                    "credit": 2
                },
                {
                    "subject": "Communication Skills",
                    "credit": 3
                },
                {
                    "subject": "Programming - C",
                    "credit": 3
                },
                {
                    "subject": "Engg. Physics - I",
                    "credit": 3
                },
                {
                    "subject": "Engg. Chemistry - I",
                    "credit": 3
                },
                {
                    "subject": "Basic Electrical Engg.",
                    "credit": 3
                },
                {
                    "subject": "Engg. Mechanics",
                    "credit": 3
                },
                {
                    "subject": "Engg. Mathematics",
                    "credit": 4
                },
                {
                    "subject": "ED Lab",
                    "credit": 1
                },
                {
                    "subject": "PPS - C Lab",
                    "credit": 1
                },
                {
                    "subject": "Physics Lab",
                    "credit": 1
                },
                {
                    "subject": "Chemistry Lab",
                    "credit": 1
                },
                {
                    "subject": "Electrical Lab",
                    "credit": 1
                }


            ],
            "Semester 2": [
                {
                    "subject": "Indian Constitution",
                    "credit": 2
                },
                {
                    "subject": "Communication Skills",
                    "credit": 3
                },
                {
                    "subject": "Programming - C",
                    "credit": 3
                },
                {
                    "subject": "Engg. Physics - I",
                    "credit": 3
                },
                {
                    "subject": "Engg. Chemistry - I",
                    "credit": 3
                },
                {
                    "subject": "Basic Electrical Engg.",
                    "credit": 3
                },
                {
                    "subject": "Engg. Mechanics",
                    "credit": 3
                },
                {
                    "subject": "Engg. Mathematics",
                    "credit": 4
                },
                {
                    "subject": "ED Lab",
                    "credit": 1
                },
                {
                    "subject": "PPS - C Lab",
                    "credit": 1
                },
                {
                    "subject": "Physics Lab",
                    "credit": 1
                },
                {
                    "subject": "Chemistry Lab",
                    "credit": 1
                },
                {
                    "subject": "Electrical Lab",
                    "credit": 1
                }


            ],
        }
    }
    
}

            
            
        
            function calculateGradePoint(mark) {
                if (mark >= 90) {
                  return grades["O"]; // 10 grade point
                } else if (mark >= 75) {
                  return grades["A+"]; // 9 grade point
                } else if (mark >= 65) {
                  return grades["A"]; // 8 grade point
                } else if (mark >= 55) {
                  return grades["B+"]; // 7 grade point
                } else if (mark >= 50) {
                  return grades["B"]; // 6 grade point
                } else if (mark >= 45) {
                  return grades["C"]; // 5 grade point
                }else if (mark >= 40) {
                    return grades["P"];
                } else {
                  return grades["F"]; // 0 grade point
                }
              }
              


const grades = {
        "O": 10,
        "A+": 9,
        "A": 8,
        "B+": 7,
        "B": 6,
        "C": 5,
        "P": 4,
        "F": 0
    };

    function updateCourses() {
        let regulation = document.getElementById("regulation").value;
let courseDropdown = document.getElementById("course");

// Clear previous options
courseDropdown.innerHTML = "";

for (let course in regulations[regulation]) {
    let option = document.createElement("option");
    option.value = course;
    option.textContent = course;
    courseDropdown.appendChild(option);
}

// Update semesters for the first course by default
updateSemesters();
}

function updateSemesters() {
    let regulation = document.getElementById("regulation").value;
    let course = document.getElementById("course").value;
    let semesterDropdown = document.getElementById("semester");

    // Clear previous options
    semesterDropdown.innerHTML = "";

    for (let semester in regulations[regulation][course]) {
        let option = document.createElement("option");
        option.value = semester;
        option.textContent = semester;
        semesterDropdown.appendChild(option);
    }
}
function goToSubjectsPage() {
    let regulation = document.getElementById("regulation").value;
    let course = document.getElementById("course").value;
    let semester = document.getElementById("semester").value;

    localStorage.setItem("selectedRegulation", regulation);
    localStorage.setItem("selectedCourse", course);
    localStorage.setItem("selectedSemester", semester);

    window.location.href = "subjects.html";
}

function populateSubjects() {
    let regulation = localStorage.getItem("selectedRegulation");
    let course = localStorage.getItem("selectedCourse");
    let semester = localStorage.getItem("selectedSemester");
  
    let subjects = regulations[regulation][course][semester];
    let container = document.getElementById("subjectsContainer");
  
    subjects.forEach(subjectObj => {
      let label = document.createElement("label");
      label.textContent = subjectObj.subject + " (" + subjectObj.credit + ")";
  
      // Create number input instead of dropdown
      let input = document.createElement("input");
      input.type = "number";
      // Optionally set min and max values:
      input.min = 0;
      input.max = 100;
  
      container.appendChild(label);
      container.appendChild(input);
    });
  }
  

function calculateGPA() {
    let inputs = document.getElementById("subjectsContainer").querySelectorAll("input");
    let totalGradePoints = 0;
    let totalCredits = 0;
  
    inputs.forEach((input, index) => {
      let regulation = localStorage.getItem("selectedRegulation");
      let course = localStorage.getItem("selectedCourse");
      let semester = localStorage.getItem("selectedSemester");
  
      let credit = regulations[regulation][course][semester][index].credit;
      totalCredits += credit;
  
      // Get user-entered mark
      let enteredMark = Number(input.value);
  
      // Map mark to grade point using a function (explained below)
      let gradePoint = calculateGradePoint(enteredMark);
  
      totalGradePoints += gradePoint * credit;
    });

    let gpa = totalGradePoints / totalCredits;
    let ele = document.getElementById("result")
    ele.innerHTML = `<span>Your GPA:</span> ${gpa.toFixed(3)}`;
    ele.scrollIntoView();
}



// Check if the current page is the main page (gpa-calculator.html)
if (window.location.pathname.includes("gpa-calculator")) {
    updateCourses();
}

// If on subjects.html, populate subjects
if (window.location.pathname.includes("subjects.html")) {
    populateSubjects();
}


