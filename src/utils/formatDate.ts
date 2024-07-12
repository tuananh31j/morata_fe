import dayjs from 'dayjs';

export const formatDate = (dateOld: string) => dayjs(dateOld).format('DD-MM-YYYY');
