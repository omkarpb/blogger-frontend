import React, { useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import { isEmpty } from 'lodash';
import { useNavigate } from "react-router";
import axios from 'axios';

export const Register = () => {
    let navigate = useNavigate();
    const onSubmitHandler = useCallback((values) => {
        axios.post('http://localhost:3001/users/register', {
            username: values.username,
            email: values.email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname
        });
    }, []);
    return (
        <div className="pageWrapper">
            <h2>Register now!</h2>
            <Formik
                initialValues={{ username: '', email: '', password: '', firstname: '', lastname: '' }}
                onSubmit={onSubmitHandler}
                validationSchema={Yup.object({
                    username: Yup.string()
                        .max(15, 'Must be 15 characters or less')
                        .required('Required'),
                    email: Yup.string()
                        .max(50, 'Must be 50 characters or less')
                        .required('Required'),
                    password: Yup.string().required('Required'),
                    firstname: Yup.string().required('Required'),
                    lastname: Yup.string().required('Required'),
                })
                }
            >
                {(formik) => (
                    <Form onSubmit={formik.handleSubmit}>
                        <div className="field">
                            <label htmlFor="username">Username</label>
                            <div>
                                <Field name="username" type="text" />
                                <div className="error">
                                    <ErrorMessage name="username" />
                                </div>
                            </div>

                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <div>
                                <Field name="email" type="text" />
                                <div className="error">
                                    <ErrorMessage name="email" />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="firstname">First name</label>
                            <div>
                                <Field name="firstname" type="text" />
                                <div className="error">
                                    <ErrorMessage name="firstname" />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="lastname">Last name</label>
                            <div>
                                <Field name="lastname" type="text" />
                                <div className="error">
                                    <ErrorMessage name="lastname" />
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password</label>
                            <div>
                                <Field name="password" type="password" />
                                <div className="error">
                                    <ErrorMessage name="password" />
                                </div>
                            </div>
                        </div>
                        <button type="submit" disabled={!isEmpty(formik.errors)}>Register</button>
                    </Form>
                )}
            </Formik>
            <div className="extra-action">
                <div>Already registered?</div>
                <button className="dark" onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    );
};
