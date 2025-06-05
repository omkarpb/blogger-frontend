import React, { useCallback, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './styles.css';
import { isEmpty } from 'lodash';
import { useNavigate, useSearchParams } from "react-router";
import axios from 'axios';
import Cookies from 'js-cookie';
import { userAdded } from './userSlice';
import { useDispatch } from 'react-redux';

export const Login = () => {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { fromPage } = useSearchParams();
    const dispatch = useDispatch();
    const handleLogin = useCallback((values, actions) => {
        setLoading(true);
        actions.resetForm();
        axios.post('http://localhost:3001/users/login', {
            identifier: values.identifier,
            password: values.password
        }).then((res) => {
            setLoading(false);
            Cookies.set('token', res.data.token);
            dispatch(userAdded({ ...res.data.user, authToken: res.data.token }));
            if (fromPage) {
                navigate(fromPage);
            } else {
                navigate('/home');
            }
        }).catch(() => {
            setLoading(false);
        });
    }, [dispatch, fromPage, navigate]);

    return (
            <div className="pageWrapper">
                <h2>Login now!</h2>
                <Formik
                    initialValues={{ identifier: '', password: '' }}
                    onSubmit={handleLogin}
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
                                <label htmlFor="identifier">Userid</label>
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
                            <button type="submit" disabled={!isEmpty(formik.errors) || loading}>Login</button>
                            {loading && (
                                <div>Loading ...</div>
                            )}
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
