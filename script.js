

let addStudent = document.getElementById('add')
let randomStudent = document.getElementById('Random_student')
let students_table=[];
let generated_list;
let generatedlist;
let subjects;
let d= new Date();
let subjectsIndex = -1
let students_field = document.getElementById('students_list');
let student_selected;



let nextDay = d.getDate()
let nexMonth = d.getMonth() + 1
let nextYear =d.getFullYear()
let date
let dayoff

console.log(nexMonth);
let dayPositionInTheWeek = d.getDay()


fetch("http://localhost:3000/subjects")
.then(response =>response.json())
.then(data => subjects =JSON.stringify(data))

d.getFullYear();	//Get the year as a four digit number (yyyy)
d.getMonth();	    //Get the month as a number (0-11)
d.getDate();	    //Get the day as a number (1-31)
d.getDay();         //Get the weekday as a number (0-6)


let today = d.toLocaleDateString()

GetStudentsList()
GetSubjects()
function GetStudentsList() {
    fetch("http://localhost:3000/students")
    .then(response =>response.json())
    .then(out =>  JSON.stringify(out))
    .then(data => generatedlist = JSON.parse(data))
    .then(lunch => this.generateStudentsList())
}

async function GetSubjects() {
    await fetch("http://localhost:3000/subjects")
    .then(response =>response.json())
    .then(data =>  JSON.stringify(data)
    )
     .then(out => subjects = JSON.parse(out))
     document.getElementById("modal-body").innerHTML=""
    for (const iterator of subjects) {
        document.getElementById("modal-body").innerHTML += '<div class= student_name_field>'+ iterator.name + '<button id="delete_subject" onclick="deleteSubject('+iterator.id+')"> <img src="./icons/carbon_close-filled.png"/> </button>'+'</div>' +'<hr>' ;
    }
}

function generateStudentsList(){
    console.log("generateStudentsList",generatedlist);
    students_table = []
    students_field.innerHTML = ""
    for (const iterator of generatedlist) {
        students_field.innerHTML += '<div class= student_name_field>'+ iterator.name + '<button id="delete_student" onclick="deleteStudent('+iterator.id+')"> <img src="./icons/carbon_close-filled.png"/> </button>'+'</div>' +'<hr>' ;
    }
}

document.getElementById("add").addEventListener("click", function(event){event.preventDefault()});



function addStudents(){
    let studentName = document.getElementById("student_name").value;
    document.getElementById('student_name').value = "";
    let name = studentName 
    if (name) {
        fetch("http://localhost:3000/students",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        }).then(res=> res.json()).then(out=>console.log(out))
        .then(lunch => this.GetStudentsList())
    }
}
// function ok() {
   
// }

function pickStudent(){
    
    this.GetDateOfSubject()
    this.ShakeAnimation()
    student_selected = generatedlist[Math.floor(Math.random() * generatedlist.length)];

    // for (let i = 0; i < 20000; i++){
        
    //     console.log(student_selected.name);
    // }
    if (student_selected) {
        
        document.getElementById("spining_names").innerHTML = student_selected.name
    }
    let no_more_pick = generatedlist.length
    
    setTimeout(() => {
        
        // getting the random student and remove him from the list of students
        console.log(subjects);
        for (const iterator of generatedlist) {
            if (student_selected === iterator) {
                subjectsIndex++
                this.deleteStudent(iterator.id)
        
                let student_create_p = document.createElement("p")
                const node_student = document.createTextNode(iterator.name)
                student_create_p.appendChild(node_student)
                document.getElementById('picked_students').append(student_create_p)


                let date_create_p = document.createElement("p")
                const node_date = document.createTextNode(date)
                date_create_p.appendChild(node_date)
                document.getElementById('picked_date').append(date_create_p)
                
                
                let subject_create_p = document.createElement("p")
                const node_subject = document.createTextNode(subjects[subjectsIndex].name)
                subject_create_p.appendChild(node_subject)
                document.getElementById('picked_subject').append(subject_create_p)

                
            }


        }
        // in case there is no more students in students list
        no_more_pick--
        console.log("no_more_pick",no_more_pick);
        if (no_more_pick == -1) {
            document.getElementById("warning_message").innerHTML = "The list of students is empty"
        }

        students_field.innerHTML = ""
        for (const iterator of generatedlist) {
            // students_table.push(iterator.name)
            students_field.innerHTML += iterator.name + ' <button id="delete_student" onclick="deleteStudent('+iterator.id+')"> <img src="./icons/carbon_close-filled.png"/> </button>' +"</br>" +'<hr>' ;
        }
        // this.addStudents()
        this.defaultview()
    }, 500);

}

function deleteStudent(id_student) {
    fetch("http://localhost:3000/students/"+id_student,{
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:id_student })
    }).then(res=>this.GetStudentsList())
    .catch(e => console.error(e));
}
function deleteSubject(id_subject) {
    fetch("http://localhost:3000/subjects/"+id_subject,{
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:id_subject })
    }).then(res=>this.GetSubjects())
    .catch(e => console.error(e));
}

function addSubject() {
    let subject_name = document.getElementById("subject_name").value;
    document.getElementById('subject_name').value = "";
    let name = subject_name
    console.log(name);
    if (name) {
        fetch("http://localhost:3000/subjects",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name})
        })
        .then(res=> res.json())
        .then(lunch => this.GetSubjects())
    }
}
function ShakeAnimation(){
    document.getElementsByTagName('div')[1].className = 'students_list_shake'
}
function defaultview(){
    document.getElementsByTagName('div')[1].className = 'stud_list'
}

function GetDateOfSubject(){
    nextDay++
    // skip weekend
   if (dayPositionInTheWeek < 7) {
        dayPositionInTheWeek++
        if (dayPositionInTheWeek == 7) {
            dayPositionInTheWeek = 0
        }
   }

    if (generatedlist.length-1 >=0) {
        if (dayPositionInTheWeek == 6 ) {
            dayoff = "dayoff"
            nextDay = nextDay + 2
            dayPositionInTheWeek = 1
        }
        if (nextDay > 31) {
            if (dayoff) {
                nextDay=3
            }
            else{
                nextDay=1
            }
            nexMonth++
        }
        if (nexMonth > 12) {
            nexMonth = 1
            nextYear++
        }
        // skip Public holidays in Morocco
        if (((nextDay == 1 ||nextDay == 11) && nexMonth == 1)||
            (nextDay == 1 && nexMonth == 5) ||
            (nextDay == 30 && nexMonth == 7) ||
            ((nextDay == 14 || nextDay == 20 || nextDay == 21) && nexMonth == 8)||
            ((nextDay == 6 ||nextDay == 18) && nexMonth == 11)){
                nextDay++
                dayPositionInTheWeek++
            }


        dayoff=false
        date = nextDay +'/' + nexMonth +'/'+ nextYear
    }


    
}

// randomStudent.addEventListener('click',function(){
    
// })


