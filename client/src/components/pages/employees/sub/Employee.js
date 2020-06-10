import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import maleImg from '../../../../assets/images/male.jpg';
import femaleImg from '../../../../assets/images/female.jpg';

import { getAllUsers } from '../../../../store/actions/allUsersActions';

const Employee = () => {
    const { empId } = useParams();
    const { users } = useSelector(state => state.user);
    const dispatch = useDispatch();

    // para ig refresh makuha gihapon
    useEffect(() => {
        dispatch(getAllUsers())
    }, [])

    return (
        <>
            {users.filter(user => user.empId == empId).map(emp => {
                return (
                    <div key={emp._id} className="main_right_con">
                        <div className="styledtitle">
                            <h3>Employee</h3>
                        </div>
                        <div className="profile">
                            <div className="profile_img">
                                <img src={emp.gender === 'Male' ? maleImg : femaleImg } alt='employee vector by codeyuri'/>
                            </div>
                            <ul className="profile_info">
                                <li>
                                    <div className="divgroup">
                                        <div>{emp.name}</div>
                                    </div>
                                    <div className="divgroup">
                                        <strong>Role:</strong>
                                        <div>{emp.role}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="divgroup">
                                        <strong>Email:</strong>
                                        <div><a href={`mailto:${emp.email}`}>{emp.email}</a></div>
                                    </div>
                                    <div className="divgroup">
                                        <strong>Joined:</strong>
                                        <div>{moment(emp.registeredDate).format('LLLL')}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="divgroup">
                                        <strong>Gender:</strong>
                                        <div>{emp.gender}</div>
                                    </div>
                                    <div className="divgroup">
                                        <strong>Birthdate:</strong>
                                        <div>{moment(emp.birth).format('LL')}</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Employee
