import { MinusCircleOutlined } from '@ant-design/icons';
import { Button, ConfigProvider, Tag } from 'antd';
import { OrderStatus } from '~/types/enum';
import { TinyColor } from '@ctrl/tinycolor';

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());
const ActionLink = ({ status }: { status: OrderStatus }) => {
    switch (status) {
        case OrderStatus.pending:
            return (
                <Button type='primary' danger>
                    Cancel
                </Button>
            );
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
                    <Button type='primary' size='large'>
                        Rate us!!
                    </Button>
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
