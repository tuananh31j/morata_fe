import './LoadingBar.css';

export default function LoadingBar({ className }: { className?: string }) {
    return (
        <div className='loading-bar-container'>
            <div className='loading-bar'></div>
        </div>
    );
}
