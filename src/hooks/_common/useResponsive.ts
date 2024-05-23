import useWindowSize from './useWindowSize';

interface ResponsiveState {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const useResponsive = (): ResponsiveState => {
    const { windowWidth } = useWindowSize();

    const isMobile = windowWidth <= 768;
    const isTablet = windowWidth > 768;
    const isDesktop = windowWidth > 1024;

    return { isMobile, isTablet, isDesktop };
};

export default useResponsive;
