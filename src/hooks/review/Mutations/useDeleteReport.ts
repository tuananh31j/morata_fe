import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import showMessage from '~/utils/ShowMessage';

const useDeleteReport = (reportId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => reviewService.deleteReport(reportId),
        onSuccess() {
            showMessage('Xóa báo cáo đánh giá thành công', 'success');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REPORT_REVIEWS] });
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useDeleteReport;
