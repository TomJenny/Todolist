import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Home() {

    return (
        <div className='container text-center'>
            <div className='col-6 mx-auto my-5 p-0' style={{ border: '2px solid #007bff' }}>
                <h3 className='text-white bg-primary p-2'>WELCOME TO 'TO-DO LIST' APP</h3>
                <div className='row'>
                    <img src="./img/task.jpg" alt="task" style={{ width: '300px', height: '300px', margin: 'auto' }} />
                </div>
                <NavLink to='/todolist' style={{ fontWeight: 'bold', textDecoration: 'none', fontSize: '20px' }}>LET GO! >>>>  </NavLink>
            </div>
        </div >
    )
}
