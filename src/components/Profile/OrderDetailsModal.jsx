import React from 'react';

const OrderDetailsModal = ({ order, isOpen, onClose }) => {
  if (!isOpen || !order) return null;

  // Extract all products from all packages
  const allProducts = order.packages?.flatMap(pkg => pkg.products || []) || [];

  return (
    <div className={`modal ${isOpen ? 'd-block' : 'd-none'}`} style={{ display: isOpen ? 'block' : 'none' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Order #{order.id} - Products</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row mb-24">
              <div className="col-md-6">
                <p><strong>Order Number:</strong> {order.order_number}</p>
                <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="col-md-6">
                <p><strong>Grand Total:</strong> {order.grand_total}</p>
                <p><strong>Items Count:</strong> {order.number_of_item}</p>
              </div>
            </div>

            <h6 className="mb-16">Products in this Order</h6>
            {allProducts.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-sm table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Product Name</th>
                      <th className="text-center">Qty</th>
                      <th className="text-end">Price</th>
                      <th className="text-end">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            {item.product?.thumb && (
                              <img 
                                src={`${process.env.REACT_APP_API_URL}/${item.product.thumb}`}
                                alt={item.product?.name}
                                style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }}
                              />
                            )}
                            <span>{item.product?.name}</span>
                          </div>
                        </td>
                        <td className="text-center">{item.qty}</td>
                        <td className="text-end">{parseFloat(item.price).toFixed(2)}</td>
                        <td className="text-end fw-medium">{parseFloat(item.total_price).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-info">No products found in this order</div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
      {isOpen && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default OrderDetailsModal;
