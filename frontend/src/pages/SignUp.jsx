import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {

  const [formData, setFormData ] = useState({})
  const [ error, setError ] = useState(null)
  const [ loading, setLoading ] = useState(false)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none' id='username' onChange={handleChange} />
        <input type='email' placeholder='Email' className='border p-3 rounded-lg focus:outline-none' id='email' onChange={handleChange} />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none' id='password' onChange={handleChange} />
        <button disabled={loading} className='p-3 rounded-lg bg-slate-900 text-white uppercase disabled:opacity-80 hover:opacity-95'>
          { loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to='/sign-in'>
          <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600'>{error}</p>}
    </div>
  )
}

export default SignUp