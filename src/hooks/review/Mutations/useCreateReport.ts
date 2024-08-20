import { useMutation } from '@tanstack/react-query';
import reviewService from '~/services/reviews.service';
import { ReportData } from '~/types/Review';
import showMessage from '~/utils/ShowMessage';

const useCreateReport = () => {
    return useMutation({
        mutationFn: (data: ReportData) => reviewService.createReport(data),
        onSuccess(res) {
            showMessage('Báo cáo thành công', 'success');
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useCreateReport;
