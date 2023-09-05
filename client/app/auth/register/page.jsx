'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import { RegisterUser } from '../../../redux/auth/auth.reducer';
import '../../../components/auth/auth.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'


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
          dispatch(RegisterUser({ name, email, password }));
          router.push('/')
          window.location.reload();
        } catch (err) {
          // Handle the error gracefully and display an error message in the UI
          alert('Error with registration. Probably the user already exists.');
          console.error('Error with registration', err);
        }
      }
    };

    
  return (
    <div className="w-full text-center h-screen z-40 fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-slate-50 items-center justify-center">
      <section className='heading text-center'>
        <h1>
           Register
        </h1>
        <p className='text-lg'>Please create an account</p>
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
        <p>Already have an account? <Link href='/auth/login' className='text-slate-400'>Login here</Link></p>
      </section>

      
      {/* Display loading message */}
      {loading && <h1>Loading...</h1>}

      {/* Display error message */}
      {error && <p className='text-red-700'>Error with registration. Probably user already exists</p>}
    </div>
  )
}

export default Register