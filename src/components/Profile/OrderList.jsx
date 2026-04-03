import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import OrderDetailsModal from './OrderDetailsModal';

const OrderList = () => {
  const { orders, loading, error, pagination, fetchOrders } = useOrders();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    fetchOrders(1, status);
  };

  const handlePageChange = (page) => {
    fetchOrders(page, selectedStatus);
  };

  const getStatusLabel = (statusCode) => {
    const statusMap = {
      0: 'Pending',
      1: 'Processing',
      2: 'Completed',
      3: 'Cancelled',
    };
    return statusMap[statusCode] || 'Unknown';
  };

  const getStatusBadgeClass = (statusCode) => {
    switch (statusCode) {
      case 0:
        return 'badge bg-warning';
      case 1:
        return 'badge bg-info';
      case 2:
        return 'badge bg-success';
      case 3:
        return 'badge bg-danger';
      default:
        return 'badge bg-secondary';
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
                    <td className="fw-medium">#{order.order_number}</td>
                    <td>{formatDate(order.created_at)}</td>
                    <td className="fw-medium">{parseFloat(order.grand_total).toFixed(2)}</td>
                    <td>{order.number_of_item}</td>
                    <td>
                      <span className={getStatusBadgeClass(order.order_status)}>
                        {getStatusLabel(order.order_status)}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => handleViewOrder(order)}
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

      {/* Order Details Modal */}
      <OrderDetailsModal 
        order={selectedOrder} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setSelectedOrder(null);
        }}
      />
    </div>
  );
};

export default OrderList;
