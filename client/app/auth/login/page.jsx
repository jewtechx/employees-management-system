"use client"
import { useState, useEffect } from 'react';
import '../../../components/auth/auth.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../../redux/auth/auth.reducer';
import { reset } from '../../../redux/auth/auth.reducer';
import Link from 'next/link'


function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const auth = useSelector((state) => state.auth);
  const { error, loading, success } = auth;

  const router = useRouter();
  const dispatch = useDispatch();

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = () => {
    if (!email || !password) {
      alert('Missing required fields');
    } else {
      try {
        dispatch(LoginUser({ email, password }));
      } catch (err) {
        console.error('Error with registration', err);
      }
    }
  };

  // Use useEffect to handle login success and redirect
  useEffect(() => {
    if (success) {
      router.push('/');
      dispatch(reset())
    }
  }, [success, router]);

  return (
    <div className="w-full text-center h-screen z-40 fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-slate-50 items-center justify-center">
      <section className="heading">
        <p className="text-slate-950">Login and start managing your employees</p>
      </section>

      <section className="form">
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <Link href="#" className='-mt-4 text-right'>Forgot Password?</Link><br />
            <button type="button" onClick={onSubmit} className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
        <p>Not in the ecosystem yet? <Link href='/auth/register' className='text-slate-600'>Register here</Link></p>
      </section>

     {/* Display loading message */}
     {loading ? <h1>Loading...</h1> : ''}

    {/* Display error message */}
    {error ? <p className='text-red-700'>Error with login. Probably you provided wrong credentials</p> : ''}
    </div>
  );
}

export default Login;
