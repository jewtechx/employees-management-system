'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import { RegisterUser } from '../../redux/auth/auth.reducer';
import './auth.css';
import { useDispatch, useSelector } from 'react-redux';

const Register = () => {

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  
  const { name, email, password, password2 } = formData;
  const {error,loading,success} = useSelector((state) => state.auth)
    
    const router = useRouter();
    const dispatch = useDispatch();
  
    const onChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const onSubmit = async (e) => {
      e.preventDefault();
    
      if (password !== password2) {
        // Display an error message in the UI
        alert('Passwords do not match');
      } else {
        try {
          // Assuming RegisterUser is an async Redux action
          await dispatch(RegisterUser({ name, email, password }));
          if(loading){
            return <h1> Loading</h1>
          }
          router.push('/')

        } catch (err) {
          // Handle the error gracefully and display an error message in the UI
          alert('Error with registration. Probably the user already exists.');
          console.error('Error with registration', err);
        }
      }
    };

    
  return (
    <>
      <section className='heading'>
        <h1>
           Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form >
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <button type='button' onClick={onSubmit} className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register