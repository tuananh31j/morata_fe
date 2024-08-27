import { Link } from 'react-router-dom';
import BackgroundIcon from '../_common/Icons/BackgroundIcon';

function WelcomeBanner() {
    return (
        <div className='relative overflow-hidden rounded-sm bg-indigo-200 p-4 dark:bg-indigo-500 sm:p-6'>
            {/* Background illustration */}
            <div className='pointer-events-none absolute right-0 top-0 -mt-4 mr-16 hidden xl:block' aria-hidden='true'>
                <BackgroundIcon />
            </div>

            {/* Content */}
            <div className='relative'>
                <Link to={'/'}>
                    <h1 className='mb-1 text-2xl font-bold text-slate-800 dark:text-slate-100 md:text-3xl'>
                        Good afternoon, Morata. 👋
                    </h1>
                </Link>
                {/* <p className='dark:text-indigo-200'>Here is what’s happening with your projects today:</p> */}
            </div>
        </div>
    );
}

export default WelcomeBanner;
