import Head from 'next/head';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import ErrorMessage from '../../components/ErrorMessage';

function signup() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        mobileNumber: '',
        confirmPassword: '',
    });

    const {
        firstName,
        lastName,
        email,
        password,
        mobileNumber,
        confirmPassword,
    } = userDetails;

    const handleSubmit = async (e) => {
        //prevent default
        e.preventDefault();

        //check if password and confirm password match
        if (password !== confirmPassword) {
            alert('Passwords dont match');
            return;
        }

        //try to sign up
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
                mobileNumber,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // redirect to signin page
        router.push('/auth/signin');

        return;
    };

    const handleChange = (e) => {
        // Grab values from form and create local state
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value });
    };

    return (
        <>
            <Head>
                <title>Sign Up</title>
            </Head>
            <div className="min-h-screen flex items-center justify-center">
                <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-4">
                        <div>
                            <img
                                className="mx-auto h-12 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                                alt="Workflow"
                            />
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Create a new account
                            </h2>
                        </div>
                        <form
                            className="mt-8 space-y-4"
                            action="#"
                            method="POST"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-row space-x-4">
                                <Input
                                    id="first-name"
                                    name="firstName"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    placeholder="First Name"
                                    onChange={handleChange}
                                />
                                <Input
                                    id="last-name"
                                    name="lastName"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                />
                            </div>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email Address"
                                onChange={handleChange}
                            />
                            <Input
                                id="mobile-number"
                                name="mobileNumber"
                                type="tel"
                                autoComplete="tel"
                                required
                                placeholder="Mobile Number (09xxxxxxxxx)"
                                onChange={handleChange}
                            />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder="Choose Password"
                                onChange={handleChange}
                            />
                            <Input
                                id="confirm-password"
                                name="confirmPassword"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder="Confirm Password"
                                onChange={handleChange}
                            />
                            <ErrorMessage />
                            <Button text="Sign Up" />
                        </form>
                        <div className="w-full text-sm font-medium text-gray-400 text-center">
                            Already have an account?{' '}
                            <span className="font-semibold text-indigo-600 hover:text-indigo-500">
                                <Link href="/auth/signin">Sign In</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default signup;
