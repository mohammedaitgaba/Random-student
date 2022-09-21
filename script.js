let addStudent = document.getElementById('add')
let randomStudent = document.getElementById('Random_student')
let students_table=[];
let students_ordered = [];

function addStudents(){

    // getting input value (student name)
    let studentName = document.querySelector("input").value;
    document.getElementById('student_name').value = "";
    // push elements to the array of students 
    if (studentName) {
        students_table.push(studentName)
    }
    console.log("students",students_table);
    
    //create feild to show elements inserted
    let newstudent = ""
    let students_field = document.getElementById('students_list');

    for (let i = 0; i < students_table.length; i++) {
        // if (i == students_table.length) {
        //     console.log('haha');
        // }
        newstudent = newstudent + students_table[i] + '</br>'

    }
    students_field.innerHTML = newstudent
}
// addStudent.addEventListener('click',function add(){
    


// })

function pickStudent(){
    
    let student_selected = students_table[Math.floor(Math.random() * students_table.length)];
    // console.log(student_selected);
    
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
    
            console.log("students_ordered",students_ordered);
        }
    }
    
    this.addStudents()
}
// randomStudent.addEventListener('click',function(){
    
// })


