import { useMutation } from '@tanstack/react-query';
import reviewService from '~/services/reviews.service';
import { errorResponse } from '~/types/ErrorResponse';
import { ReportData } from '~/types/Review';
import showMessage from '~/utils/ShowMessage';

const useCreateReport = () => {
    return useMutation({
        mutationFn: (data: ReportData) => reviewService.createReport(data),
        onSuccess() {
            showMessage('Báo cáo thành công', 'success');
        },
        onError(error: errorResponse) {
            console.log(error.response.data.message);
        },
    });
};

export default useCreateReport;
