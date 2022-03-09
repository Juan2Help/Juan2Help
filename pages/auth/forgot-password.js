import { useState } from 'react';
import {
    getProviders,
    signIn as signIntoProviders,
    useSession,
    signOut,
} from 'next-auth/react';
import Head from 'next/head';
import Button from '../../components/Button';
import { Input } from '../../components/Input';
import ErrorMessage from '../../components/ErrorMessage';
import Link from 'next/link';
import { useRouter } from 'next/router';

function ForgotPassword() {
    return (
        <>
            <Head>
                <title>Password Reset</title>
            </Head>
            <div className="min-h-screen flex items-center justify-center">
                <div className="min-h-full py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-6">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Find your account
                        </h2>
                        <form
                            className="mt-8 space-y-6"
                            action="#"
                            method="POST"
                        >
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                placeholder="Email address"
                            />
                            <Button text="Search" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;
