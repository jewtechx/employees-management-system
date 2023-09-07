'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/router' instead of 'next/navigation'
import { RegisterUser, reset } from '../../../redux/auth/auth.reducer';
import '../../../components/auth/auth.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    });
  
  const { name, email, password, password2 } = formData;
  const {error,loading,success} = useSelector((state) => state.auth)
    
    const dispatch = useDispatch();
  
  const onChange = (e) => {
      dispatch(reset())
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
    const onSubmit = (e) => {
      e.preventDefault();
    
      if (password !== password2) {
        // Display an error message in the UI
        toast.error('Passwords do not match', toastOptions);
      } else {
        try {
          dispatch(RegisterUser({ name, email, password }));
        } catch (err) {
          // Handle the error gracefully and display an error message in the UI
          console.error('Error with registration', err);
        }
      }
    };
    
    useEffect(() => {
      if (error) {
        toast.error('Error Creating Account. Check Inputs', toastOptions);
      }
  
      if (success) {
        toast.success('Account Creation Successful', toastOptions);
        window.location.href= '/'
      }
    },[error,success])
  
    
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

      <ToastContainer position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"/>
    </div>
  )
}

export default Register