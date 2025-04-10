
/**
 * Utility for determining badge variant based on asset status
 */
export const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'approved':
      return 'default'; // Green
    case 'rejected':
      return 'destructive'; // Red
    case 'pending':
    default:
      return 'secondary'; // Gray
  }
};
