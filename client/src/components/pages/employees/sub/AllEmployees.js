import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import ModalDeleteUser from './ModalDeleteUser';
import ModalModifyUser from './ModalModifyUser';

import { getAllUsers } from '../../../../store/actions/allUsersActions';

const AllEmployees = ({user, users}) => {
    const [modalDeleteUser, setModalDeleteUser] = useState(false);
    const [modalModifyUser, setModalModifyUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState({})
    const dispatch = useDispatch();

    const handleDelete = (id, name) => {
        setSelectedUser({id, name})
        setModalDeleteUser(true)
    }

    const handleModify = modifyUser => {
        setSelectedUser(modifyUser)
        setModalModifyUser(true)
    }

    const fetchAllUsers = users.length ? users
        .sort((a, b) => (a.name > b.name) ? 1 : -1)
        .map((emp, index) => {
            return (
                <li key={index}>
                    <div><Link to={`/employees/user/${emp.name}`}>{emp.name}</Link></div>
                    <div>{emp.role}</div>
                    <div><a href={`mailto:${emp.email}`}>{emp.email}</a></div>
                    { (user.role === 'Administrator' || user.role === 'Senior Developer') && (
                        <div className="taskactions">
                            <button onClick={() => handleModify(emp)}>Modify</button>
                            <button onClick={() => handleDelete(emp._id, emp.name)}>Delete</button>
                        </div>
                    )}
                </li>
            )
        }) : (
            <li>No employees found... Hire some?</li>
        )

    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <>
            { modalDeleteUser && <ModalDeleteUser setModalDeleteUser={setModalDeleteUser} selectedUser={selectedUser} user={user} /> }
            { modalModifyUser && <ModalModifyUser setModalModifyUser={setModalModifyUser} setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> }
            <div className="main_right_con col-4">
                <div className="styledtitle">
                    <h3>All Employees</h3>
                </div>
                <div className="styledsubtitle">
                    <span>Developer</span>
                    <span>Position</span>
                    <span>Email Address</span>
                    { (user.role === 'Administrator' || user.role === 'Senior Developer') && <span>Actions</span> }
                </div>
                <ul className="styledul employees"> { fetchAllUsers } </ul>
            </div>
        </>
    )
}

export default AllEmployees