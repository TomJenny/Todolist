import React from 'react'
import { NavLink } from 'react-router-dom'
export default function Home() {

    return (
        <div className='container text-center'>
            <div className='col-6 mx-auto my-5 p-0' >
                <h3 className='text-white bg-primary p-2'>WELCOME TO 'TO-DO LIST' APP</h3>

                <NavLink to='/todolist' style={{ fontWeight: 'bold', textDecoration: 'none', fontSize: '20px' }}  >
                    <img src="./img/task.jpg" alt="task" style={{ width: '300px', height: '300px', margin: 'auto' }} className='logo' />
                    <button className='btn btn-primary d-block mx-auto logo'>LET GO!</button>

                </NavLink>
            </div>
        </div >

    )
}
