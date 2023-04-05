import { Injectable } from '@angular/core';
import { Iuser } from '../models/Iuser';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private token: string | null
  private user: Iuser | null
  
  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: Iuser){
    const headers = new HttpHeaders()
    headers.append('Content-Type', "application/json")
    return this.http.post(
      'http://localhost:3000/account/reg',
      user, { headers: headers }
    ).pipe(map((res:any) => JSON.stringify(res)))
  }

  authUser(user: Iuser){
    const headers = new HttpHeaders()
    headers.append('Content-Type', "application/json")
    return this.http.post(
      'http://localhost:3000/account/auth',
      user, { headers: headers }
    ).pipe(map((res) => JSON.stringify(res)))
  }

  storeUser(token: string, user: Iuser){
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    this.token = token
    this.user = user
  }

  logoutUser(){
    this.token = null
    this.user = null
    localStorage.clear()
  }

  isLoggedIn(){
    const token = localStorage.getItem('token')?.replace('JWT: ', "")
    const headers = new HttpHeaders()
    headers.append('Content-Type', "application/json")
    return this.http.post(
      'http://localhost:3000/account/logged',
      { token }, { headers: headers }
    ).pipe(map(resp => {
      return JSON.parse(JSON.stringify(resp))
    }))
  }
}
