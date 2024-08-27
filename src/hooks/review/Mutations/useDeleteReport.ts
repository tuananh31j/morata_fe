import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import { errorResponse } from '~/types/ErrorResponse';
import showMessage from '~/utils/ShowMessage';

const useDeleteReport = (reportId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => reviewService.deleteReport(reportId),
        onSuccess() {
            showMessage('Xóa báo cáo đánh giá thành công', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REPORT_REVIEWS] });
        },
        onError(error: errorResponse) {
            console.log(error.response.data.message);
        },
    });
};

export default useDeleteReport;
