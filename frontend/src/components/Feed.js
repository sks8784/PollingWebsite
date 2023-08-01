import React, { useState, useEffect } from 'react'
import './Feed.css';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Feed = () => {
  let history = useNavigate();
  

  const notesinital = []
  const [notes, setnotes] = useState(notesinital);

  const handlesubmit = async (e) => {
    const x = localStorage.getItem("auth-token");
    console.log(x);


    if (x !== null) {
      const response = await fetch("https://pollingapi-rz7e.onrender.com/api/poll/getAll", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authtoken': x
        }

      });
      const json = await response.json()

      setnotes(json);

    } else {
      toast('🦄 Please login to access the Feed ', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      setTimeout(function () {
        history('/login');
      }, 3000);

    }
  }

  // useEffect(() => {
  //   return () => {
  //     handlesubmit();
  //   }
  // }, [handlesubmit])
  handlesubmit();

  const voted = async (e) => {
    toast('🦄 Vote Submitted ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })


    e.preventDefault();
    const x = localStorage.getItem("auth-token");

    const response = await fetch("https://pollingapi-rz7e.onrender.com/api/poll/voted", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authtoken': x
      },

      body: JSON.stringify({ _id: e.target.id, changeValue: e.target.name })

    });
    await response.json()

    handlesubmit();
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

      <ToastContainer />
      <div className="row mx-3">
        <center><h2>Polls</h2></center>
        <center>{notes.length === 0 && 'No Polls to display'}</center>
        {notes.map((note) => {
          return <>

            <div className="container">
              <div className="col-md-3 my-3">
                <div className="card">
                  <div className="card-body">


                    <h5><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                      <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z" />
                    </svg>  {note.Ques}</h5>

                    <button className="card-title" onClick={voted} name="OpA" id={note._id}>{note.OpA}</button> {note.CA}<br />
                    <button className="card-title" onClick={voted} name="OpB" id={note._id}>{note.OpB}</button> {note.CB}<br />
                    <button className="card-title" onClick={voted} name="OpC" id={note._id}>{note.OpC}</button>  {note.CC}<br />
                    <button className="card-title" onClick={voted} name="OpD" id={note._id}>{note.OpD}</button>  {note.CD}<br />
                    <p>Created on {Date(note.createdAt)}</p>

                  </div>
                </div>
              </div>
            </div>
          </>
        })}

      </div>


      {/* <button onClick={handlesubmit}></button> */}
    </>
  )
}
