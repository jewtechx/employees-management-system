'use client'
import { useState, useEffect } from 'react'
import './auth.css'
import {useRouter} from 'next/navigation'
import {useDispatch,useSelector} from 'react-redux'
import {LoginUser} from '../../redux/auth/auth.reducer'


function Login() {
 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

const { email, password } = formData;
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
  
    if (!email || !password) {
      // Display an error message in the UI
      alert('Missing required fields');
    } else {
      try {
        // Assuming RegisterUser is an async Redux action
        dispatch(LoginUser({email, password }));
        if(loading){
          return <h1> Loading</h1>
        }
        router.push('/')

      } catch (err) {
        // Handle the error gracefully and display an error message in the UI
        alert('Error with login.');
        console.error('Error with registration', err);
      }
    }
  };

  

  return (
    <div className="w-full h-screen flex flex-col bg-slate-50 items-center justify-center">
      <section className='heading'>
        <p className='text-slate-900'>Login and start managing your employees</p>
      </section>

      <section className='form'>
        <form >
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
            <button type='button' onClick={onSubmit} className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
      </div>
  )
}

export default Login
