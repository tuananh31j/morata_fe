import { TinyColor } from '@ctrl/tinycolor';
import { Button, ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';

type RateBtnProps = {
    handleRate: (productId: string, orderId: string, productVariationId: string) => void;
    productId: string;
    orderId: string;
    productVariationId: string;
    isPending: boolean;
};

const colorsArr = ['#fc6076', '#ff9a44', '#ef9d43', '#e75516'];
const getHoverColors = (colors: string[]) => colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors: string[]) => colors.map((color) => new TinyColor(color).darken(5).toString());

const RateBtn = ({ handleRate, productId, orderId, productVariationId, isPending }: RateBtnProps) => {
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isPending) {
            setIsLoading(false);
        }
    }, [isPending]);
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
            <Button
                type='primary'
                size='middle'
                loading={isLoading}
                disabled={isLoading}
                className={`${!isLoading && isPending ? 'pointer-events-none' : ''}`}
                onClick={() => {
                    handleRate(productId, orderId, productVariationId);
                    setIsLoading(true);
                }}
            >
                Đánh giá
            </Button>
        </ConfigProvider>
    );
};

export default RateBtn;
