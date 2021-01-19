import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './Pages.css';
import firebase from "firebase/app";
import "firebase/firestore";
import AuthContext from '../components/context';







function Register() {
  const authContext = React.useContext(AuthContext)
      return (
          <Formik
              initialValues={{
                  email: '',
                  password: '',
              }}
              validationSchema={Yup.object().shape({

                  email: Yup.string()
                      .email('Email is invalid')
                      .required('Email is required'),
                  password: Yup.string()
                      .min(6, 'Password must be at least 6 characters')
                      .required('Password is required'),

              })}
              onSubmit={fields => {
                 
                  Register(fields);
              }}
              render={({ errors, status, touched }) => (
                <div className="container">
                  
                  
                  
                
                  <Form className="LoginUI">
                  <div>
                  <h1 style={{color: "#065143" , textAlign:"center" , fontWeight:"bold" , marginTop:"15rem"}}>JourneyPartner Admin Registeration</h1>
                  </div>
                
                      
                      <div className="form-group" style={{marginTop:"5rem"}}>
   
                      <label style={{color: "#fca311" }} htmlFor="email">Email</label>
                          <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </div>
                      <div style={{marginBottom:"5rem"}} className="form-group">
                          <label style={{color: "#fca311" }} htmlFor="password">Password</label>
                          <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </div>
                      
                      <div className="form-group">
                          <button style={{backgroundColor: "#fca311" }} type="submit" className= "button1">Register</button>
                          <button style={{backgroundColor: "#065143" }} type="reset" className="button2">Cancel</button>
                      </div>
                      </Form>
                      </div>
                  
              )}
          />
      )
  
  
      async function Register(value){
       const userRef = await firebase.firestore().collection('admins').where('email','==',value.email).get()
       if(userRef.empty){
         await firebase.firestore().collection('admins').add(value)
         alert ('Done!')
       }
       else{
        alert ('Already Registered!')
       }
      }

    }


export default Register;