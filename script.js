

let addStudent = document.getElementById('add')
let randomStudent = document.getElementById('Random_student')
let students_table=[];
let generated_list ;
let students_ordered = [];
let d= new Date();
let nextDay = d.getDate()
let dayPositionInTheWeek = d.getDay()
fetch("./students.json")
.then(response =>response.json())
.then(data => generated_list =JSON.stringify(data))

d.getFullYear();	//Get the year as a four digit number (yyyy)
d.getMonth();	    //Get the month as a number (0-11)
d.getDate();	    //Get the day as a number (1-31)
d.getDay();         //Get the weekday as a number (0-6)

let today = d.toLocaleDateString()

function generateDateOfSubject(){
    localStorage.setItem('day', JSON.stringify(today));
    
}

function generateStudentsList(){


    let generatedlist = JSON.parse(generated_list);
    let students_field = document.getElementById('students_list');
    students_table = []
    students_field.innerHTML = ""
    for (const iterator of generatedlist) {
        students_table.push(iterator.name)
        students_field.innerHTML += iterator.name +"</br>" +'<hr>' ;
    }
}

function addStudents(){
    this.generateDateOfSubject()
    // getting input value (student name)
    let studentName = document.querySelector("input").value;
    document.getElementById('student_name').value = "";
    // push elements to the array of students 
    if (studentName) {
        students_table.push(studentName)
    }
    // console.log("students",students_table);
    
    //create feild to show elements inserted
    let newstudent = ""
    
    let students_field = document.getElementById('students_list');

    for (let i = 0; i < students_table.length; i++) {
        // if (i == students_table.length) {
        //     console.log('haha');
        // }
        newstudent = newstudent + students_table[i] + '</br>' +'<hr>'

    }
    students_field.innerHTML = newstudent
}


function pickStudent(){
    this.GetDateOfSubject()
    this.ShakeAnimation()
    let student_selected = students_table[Math.floor(Math.random() * students_table.length)];
    // console.log(student_selected);
    setTimeout(() => {
        
        let values = students_table.values()
        
        // getting the random student and remove him from the list of students
        for (const iterator of values) {
            if (student_selected === iterator) {
                students_ordered.push(iterator)
                // alert("lucky dude :"+iterator)
                const removeStudent =  students_table.indexOf(iterator)
                students_table.splice(removeStudent, 1);
                console.log("students_table",students_table);
        
                let student_create_p = document.createElement("p")
                const node = document.createTextNode(iterator)
                student_create_p.appendChild(node)
                let picked_students = document.getElementById('picked_students')
                picked_students.append(student_create_p)
                
                // console.log("students_ordered",students_ordered);
            }
        }
        
        this.addStudents()
        this.defaultview()
    }, 00);

}

function ShakeAnimation(){
    document.getElementsByTagName('div')[1].className = 'students_list_shake'
}
function defaultview(){
    document.getElementsByTagName('div')[1].className = 'stud_list'
}

function GetDateOfSubject(){

    nextDay++
   if (dayPositionInTheWeek < 7) {
        dayPositionInTheWeek++
        if (dayPositionInTheWeek == 7) {
            dayPositionInTheWeek = 0
        }
   }

    if (students_table.length-1 >=0) {
        if (dayPositionInTheWeek == 6 ) {
            dayPositionInTheWeek = 1
            nextDay = nextDay + 2
        }

       
        let date = nextDay +'/' +d.getMonth() +'/'+d.getFullYear()
        console.log(date);
        console.log(dayPositionInTheWeek);
    }


    
}

// randomStudent.addEventListener('click',function(){
    
// })


