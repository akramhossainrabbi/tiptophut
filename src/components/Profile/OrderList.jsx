import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { toast } from 'react-toastify';

const OrderList = () => {
  const { orders, loading, error, pagination, fetchOrders } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    fetchOrders(1, status);
  };

  const handlePageChange = (page) => {
    fetchOrders(page, selectedStatus);
  };

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'badge bg-warning';
      case 'processing':
        return 'badge bg-info';
      case 'completed':
        return 'badge bg-success';
      case 'cancelled':
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div className="orders-section">
      <h5 className="mb-24">My Orders</h5>

      {/* Status Filter */}
      <div className="mb-24">
        <button
          className={`btn btn-sm me-2 ${!selectedStatus ? 'btn-main' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilter(null)}
        >
          All Orders
        </button>
        <button
          className={`btn btn-sm me-2 ${selectedStatus === 'pending' ? 'btn-main' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`btn btn-sm me-2 ${selectedStatus === 'processing' ? 'btn-main' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilter('processing')}
        >
          Processing
        </button>
        <button
          className={`btn btn-sm me-2 ${selectedStatus === 'completed' ? 'btn-main' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilter('completed')}
        >
          Completed
        </button>
        <button
          className={`btn btn-sm ${selectedStatus === 'cancelled' ? 'btn-main' : 'btn-outline-secondary'}`}
          onClick={() => handleStatusFilter('cancelled')}
        >
          Cancelled
        </button>
      </div>

      {/* Orders Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : orders.length > 0 ? (
        <>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="fw-medium">#{order.id}</td>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="fw-medium">{order.total_price || order.total}</td>
                    <td>{order.items_count || order.order_items?.length || 0}</td>
                    <td>
                      <span className={getStatusBadgeClass(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => {
                          toast.info(`Order #${order.id} details - Feature coming soon`);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.last_page > 1 && (
            <nav aria-label="Page navigation" className="mt-24">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${pagination.current_page === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.current_page - 1)}
                    disabled={pagination.current_page === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                  <li key={page} className={`page-item ${pagination.current_page === page ? 'active' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${pagination.current_page === pagination.last_page ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(pagination.current_page + 1)}
                    disabled={pagination.current_page === pagination.last_page}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}

          <div className="text-center mt-16 text-muted small">
            Showing page {pagination.current_page} of {pagination.last_page} ({pagination.total} total orders)
          </div>
        </>
      ) : (
        <div className="alert alert-info text-center">
          <p className="mb-0">No orders found. Start shopping now!</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
