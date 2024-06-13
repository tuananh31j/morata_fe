import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Dropdown, MenuProps, Tag } from 'antd';
import { OrderStatus } from '~/types/enum';
import { TinyColor } from '@ctrl/tinycolor';
import { Link } from 'react-router-dom';
import PopupFormCancelOrder from './PopupFormCancelOrder';

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link rel='noopener noreferrer' to='/products'>
                1st menu item
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link rel='noopener noreferrer' to='/products'>
                2nd menu item
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link rel='noopener noreferrer' to='/products'>
                3rd menu item
            </Link>
        ),
    },
];
const ActionLink = ({ status, orderId }: { status: OrderStatus; orderId: string }) => {
    switch (status) {
        case OrderStatus.pending:
            return <PopupFormCancelOrder id={orderId} />;
        case OrderStatus.confirmed:
        case OrderStatus.shipping:
        case OrderStatus.canceled:
            return (
                <Button type='primary' disabled>
                    Invalid!!
                </Button>
            );
        case OrderStatus.done:
            return (
                <ConfigProvider
                    theme={{
                        components: {
                            Button: {
                                colorPrimary: `linear-gradient(90deg,  ${colorsArr.join(', ')})`,
                                colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(colorsArr).join(', ')})`,
                                colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(colorsArr).join(', ')})`,
                                lineWidth: 0,
                            },
                        },
                    }}
                >
                    <Dropdown menu={{ items }}>
                        <Button type='primary' size='large'>
                            Rate us!!
                        </Button>
                    </Dropdown>
                </ConfigProvider>
            );
        default:
            return (
                <Tag icon={<MinusCircleOutlined />} color='default'>
                    Oops!!
                </Tag>
            );
    }
};

export default ActionLink;
