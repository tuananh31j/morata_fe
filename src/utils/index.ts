export const getMaxSlidesToShow = (windowWidth: number) => {
    if (windowWidth >= 516 && windowWidth < 668) return 4;
    if (windowWidth >= 668 && windowWidth < 1200) return 5;
    if (windowWidth >= 806 && windowWidth < 993) return 6;
    if (windowWidth >= 993) return 7;

    return 3;
};
