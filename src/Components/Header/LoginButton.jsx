import Link from 'next/link';
import React from 'react';

export const LoginButton = () => {
    return (
        <Link href="/login" className="font-PoppinsMedium text-base bg-white py-2 px-12 rounded-full shadow-md transition-all hover:bg-primary-0 hover:text-white">
            Login
        </Link>
    );
};