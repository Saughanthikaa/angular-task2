import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  students: Student[] = [];
  newStudent: Student = { userid: '', name: '', emaill: '', phone: '', attendance: 0 };
  isAdding: boolean = false;

  
  constructor(private studentService: StudentService){
    this.selectedStudent = null!;
  }

  ngOnInit() {
    this.getStudents();
  }
  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => this.students = students);
  }

  
  selectedStudent: Student | null = null;
  showUpdateForm = false;
  


deleteStudent(student: Student): void {
  this.studentService.deleteStudent(student.userid)
    .subscribe(() => {
      // Remove the deleted student from the students array
      this.students = this.students.filter(s => s.userid !== student.userid);
    });
}
showAddForm(): void {
  this.isAdding = true;
}

submitAddForm(): void {
  this.studentService.addStudent(this.newStudent)
    .subscribe(() => {
      this.getStudents();
      this.newStudent = { userid: '', name: '', emaill: '', phone: '', attendance: 0 };
      this.isAdding = false;
    });
}

updateStudent(student: Student) {
  this.selectedStudent = student;
}

submitUpdateForm() {
  if (this.selectedStudent) {
    this.studentService.updateStudent(this.selectedStudent)
      .subscribe(
        response => {
          console.log(response);
          // Reset the form or perform any additional operations
          this.selectedStudent = null;
        },
        error => {
          console.error(error);
        }
      );
  }
}
cancelUpdateForm() {
  this.selectedStudent = null;
}

cancelAddForm() {
  this.isAdding = false;
}
}



