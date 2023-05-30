import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';



@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:5001/Updated_file'; 
  private deleteStudentUrl = `http://localhost:5001/delete_student`;
  private addStudentUrl = 'http://localhost:5001'

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }
  deleteStudent(studentId: string): Observable<void> {
    const url = `${this.deleteStudentUrl}/${studentId}`;
    return this.http.delete<void>(url);
    console.log("student details deleted successfully")
  }

  addStudent(newStudent: Student): Observable<void> {
    const addStudentUrl = `${this.addStudentUrl}/add_student`;
    return this.http.post<void>(addStudentUrl, newStudent);
  }

  updateStudent(student: Student): Observable<any> {
    return this.http.put<any>(`${this.addStudentUrl}/update_student/${student.userid}`, student);
  }
  
}
