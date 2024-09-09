/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { Spin } from 'antd';
import { useCallback, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useSendVerify } from '~/hooks/auth/useSendVerify';
import { useVerifyAccount } from '~/hooks/auth/useVerifyAccount';

export const VerifyPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');
    const { mutate: sendMail, isPending: pendingSend } = useSendVerify();
    const { token } = useParams();
    const { mutate, isError, isPending, error } = useVerifyAccount(token ? token : '');
    const verifyAccount = useCallback(() => {
        if (token) {
            mutate();
        }
    }, [token, mutate]);

    useEffect(() => {
        verifyAccount();
    }, [verifyAccount]);

    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <>
            {!isPending && (
                <div className='mt-2 '>
                    <div className='flex w-full flex-col items-center justify-center'>
                        <div className='mt-2 flex w-[40%] flex-col items-center p-5'>
                            <>
                                <h3 className='text-center text-2xl font-bold text-black'>
                                    {isError ? 'Account not Activated' : 'Account Activated'}
                                </h3>
                                <div className='relative mt-6'>
                                    <svg
                                        className={`w-[80px] ${!isError && 'fill-green-500'} ${isError && 'fill-red'}`}
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 512 512'
                                    >
                                        <path d='M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z' />
                                    </svg>
                                    {!isError && (
                                        <CheckCircleFilled className='absolute -right-6 bottom-0 text-[30px] text-green-500' />
                                    )}
                                    {isError && (
                                        <CloseCircleFilled className='absolute -right-5 bottom-0 text-[30px] text-red' />
                                    )}
                                </div>
                                <div className='mt-12'>
                                    <h3 className='text-center text-xl font-semibold'>
                                        {isError ? (error as any).response.data.message : 'Welcome to morata'}
                                    </h3>
                                    <p className='mt-6 text-center '>
                                        Thank you, your email has been verified, your account is now activated. Please
                                        login to your account.
                                    </p>
                                    <div className='mt-4 flex justify-center'>
                                        {!isError && (
                                            <button
                                                onClick={handleLogin}
                                                className='rounded-lg bg-cyan-500 px-5 py-2 font-semibold text-white'
                                            >
                                                LOGIN
                                            </button>
                                        )}
                                        {isError && (
                                            <button
                                                onClick={() => sendMail({ email: email ? email : '' })}
                                                className='w-[200px] rounded-lg bg-cyan-500 py-2 font-semibold text-white'
                                            >
                                                {pendingSend && <Spin />}
                                                {!pendingSend && 'RESEND TO EMAIL'}
                                            </button>
                                        )}
                                    </div>

                                    {!isError && <p className='mt-4 text-center'>Thank you for choosing morata</p>}
                                </div>
                            </>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
