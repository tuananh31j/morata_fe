import { MinusCircleOutlined } from '@ant-design/icons';
import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider, Dropdown, MenuProps, Tag } from 'antd';
import { Link } from 'react-router-dom';
import { OrderStatus } from '~/constants/enum';
import useFinishOrderClient from '~/hooks/orders/Mutations/useFinishOrderClient';
import PopupFormCancelOrder from './PopupFormCancelOrder';
import showMessage from '~/utils/ShowMessage';

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());
const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <Link rel='noopener noreferrer' to='/'>
                1st menu item
            </Link>
        ),
    },
    {
        key: '2',
        label: (
            <Link rel='noopener noreferrer' to='/'>
                2nd menu item
            </Link>
        ),
    },
    {
        key: '3',
        label: (
            <Link rel='noopener noreferrer' to='/'>
                3rd menu item
            </Link>
        ),
    },
];

const ActionLink = ({ status, orderId }: { status: OrderStatus; orderId: string }) => {
    const { mutateAsync: finishOrder } = useFinishOrderClient();
    const handleFinishOrder = async () => {
        const res = await finishOrder(orderId);

        if (res) {
            showMessage('Thank you for confirming!', 'success');
        }
    };

    switch (status) {
        case OrderStatus.pending:
            return <PopupFormCancelOrder id={orderId} />;

        case OrderStatus.confirmed:
        case OrderStatus.shipping:
            return <></>;

        case OrderStatus.delivered:
            return (
                <Button onClick={() => handleFinishOrder()} type='primary'>
                    I haveReceived
                </Button>
            );

        case OrderStatus.cancelled:
            return (
                <Button type='primary' danger disabled>
                    Cancelled!!
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
