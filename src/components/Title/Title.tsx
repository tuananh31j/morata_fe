import { RightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Title = ({ seeMore, title }: { title: string; seeMore?: { path: string; name: string } }) => {
    return (
        <div className='my-5 flex items-center justify-between border-b-[1.5px]'>
            <div className='inline-block border-b-[1.5px] border-[#16bcdc] py-[4px]  text-start md:border-b-[2.3px]'>
                <h1 className='text-start font-[400] capitalize'>{title}</h1>
            </div>
            <div>
                {!!seeMore && (
                    <Link to={seeMore.path} className='text-[10px] font-[400] capitalize'>
                        {seeMore.name} <RightOutlined className='text-[7px]' />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Title;
