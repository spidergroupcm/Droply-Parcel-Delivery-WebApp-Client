import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import { FcGoogle } from 'react-icons/fc';

const GoogleSignIn = () => {
    const { googleLogin } = useAuth()
    const location = useLocation()
    // console.log(location)
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/'
    const axiosPublic = useAxiosPublic()

    const handleGoogleSignIn = () => {
        googleLogin()
            .then(result => {
                const user = result.user;

                //++++++ add in db new userData
                const userInfo = {
                    name: user?.displayName,
                    email: user?.email,
                    photo: user?.photoURL,
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        // console.log(res.data)
                        navigate(from, { replace: true });
                    })
                    .catch(err => {
                        console.error('Error saving user to database:', err);
                    });
            })
            .catch(error => {
                // console.log('google SignIn error', error)
            })
    }

    return (
        <div
            onClick={handleGoogleSignIn}
            className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
            <FcGoogle size={32} />

            <p>Continue with Google</p>
        </div>
    );
};

export default GoogleSignIn;