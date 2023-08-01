import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  let history = useNavigate();
  const [credit, setcredit] = useState({ email: "", password: "" })

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch("https://pollingapi-rz7e.onrender.com/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credit.email, password: credit.password })
    });
    console.log(response);
    const json = await response.json()
    console.log(json);

    if (json.success === true) {

      localStorage.setItem('auth-token', json.authtoken);
      toast.success('🦄 Login Successful ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(function () {
        history('/');
      }, 3000);


    } else {
      toast.error('🦄 Invalid email or password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("INVALID CREDENTIALS")
    }


  }

  const onchange = (e) => {
    console.log(e.target.value);
    setcredit({ ...credit, [e.target.name]: e.target.value })
  }


  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="container1">
        <center> <h1>Login</h1> </center>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">

            <label for="exampleInputEmail1" class="form-label">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              name="email"
              value={credit.email}
              onChange={onchange}

              id="email"
              aria-describedby="emailHelp"

            />
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={onchange}
              class="form-control"
              id="password"
            />
          </div>
          <center><p><Link to="/createUser">Or register now</Link></p></center>
          <center><button type="submit" class="btn btn-primary">
            Submit
          </button>
          </center>

        </form>
      </div>
    </>
  )
}
