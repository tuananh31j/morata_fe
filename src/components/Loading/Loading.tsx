import LoadingIcon from '../Icons/LoadingIcon';

const Loading = () => {
    return (
        <div className='my-5 flex flex-1 items-center justify-center'>
            <div className='text-accent h-[150px] w-[150px]'>
                <LoadingIcon />
            </div>
        </div>
    );
};

export default Loading;
