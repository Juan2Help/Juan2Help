import { useState } from 'react';
import {
    getProviders,
    signIn as signIntoProviders,
    useSession,
    signOut,
} from 'next-auth/react';
import Head from 'next/head';
import Input from '../../components/Input';
import Button from '../../components/Button';

function signup() {
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
                            onSubmit={() => {}}
                        >
                            <div className="flex flex-row space-x-4">
                                <Input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    placeholder="First Name"
                                    onChange={() => {}}
                                />
                                <Input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name"
                                    required
                                    placeholder="Last Name"
                                    onChange={() => {}}
                                />
                            </div>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email Address"
                                onChange={() => {}}
                            />
                            <Input
                                id="mobile-number"
                                name="mobile-number"
                                type="tel"
                                autoComplete="tel"
                                required
                                placeholder="Mobile Number"
                                onChange={() => {}}
                            />
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="password"
                                required
                                placeholder="Choose Password"
                                onChange={() => {}}
                            />
                            <Button text="Sign Up" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default signup;
