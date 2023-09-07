"use client"
import { useState, useEffect } from 'react';
import '../../../components/auth/auth.css';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { LoginUser } from '../../../redux/auth/auth.reducer';
import { reset } from '../../../redux/auth/auth.reducer';
import Link from 'next/link'
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

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
      toast.error('Missing Required Fields. Check Your Inputs', toastOptions);

    } else {
      try {
        dispatch(LoginUser({ email, password }));
      } catch (err) {
        console.error('Error with registration', err);
      }
    }
  };

    useEffect(() => {
    if (error) {
      toast.error('Error logging In. Check Your Inputs', toastOptions);
    }

    if (success) {
      toast.success('Log In Successful', toastOptions);
      window.location.href= '/'
    }
  },[error,success])


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
  );
}

export default Login;
