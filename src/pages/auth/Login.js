import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import { isEmpty } from 'lodash';
import { useNavigate } from "react-router";

export const Login = () => {
    let navigate = useNavigate();
    return (
            <div className="pageWrapper">
                <h2>Login now!</h2>
                <Formik
                    initialValues={{ identifier: '', password: '' }}
                    onSubmit={(values) => { console.log(values) }}
                    validationSchema={Yup.object({
                        identifier: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        password: Yup.string().required('Required'),
                    })
                    }
                >
                    {(formik) => (
                        <Form onSubmit={formik.handleSubmit}>
                            <div className="field">
                                <label htmlFor="identifier">Username/Email</label>
                                <div>
                                    <Field name="identifier" type="text" />
                                    <div className="error">
                                        <ErrorMessage name="identifier" />
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
                            <button type="submit" disabled={!isEmpty(formik.errors)}>Login</button>
                        </Form>
                    )}
                </Formik>
                <div className="extra-action">
                    <div>New user?</div>
                    <button className="dark" onClick={() => navigate('/register')}>Register</button>
                </div>
            </div>
        );
};
