import React, { useState } from "react";
import axios from "axios";
import "./Cancel.css";

// Define the structure of the data being sent
interface UpdateOrder {
  statusOrder: number; // Corrected property name
  reason: string;
}

const CancelButton = ({ orderId }: { orderId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setReason(""); // Reset reason when modal is closed
  };

  // Function to make the API call using axios
  const handleConfirm = async () => {
    const updateData: UpdateOrder = {
      statusOrder: 5, // Cancelled status (5 for cancelled)
      reason: reason,
    };

    // Debugging step

    try {
      const response = await axios.put(
        `https://localhost:7048/api/Order/UP-order/${orderId}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the API response

      if (response.status === 200) {
        
        alert("Hủy đơn hàng thành công");
        location.reload();
        handleCloseModal();
      } else {
        
      }
    } catch (error: any) {
      if (error.response) {
        
      } else if (error.request) {
        
      } else {
        
      }
    }
  };

  return (
    <div>
      <button className="btn-detail cancel" onClick={handleOpenModal}>
        Hủy <i className="fa-solid fa-x"></i>
      </button>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Xác nhận hủy đơn hàng #{orderId}</h3>
            <p>Vui lòng nhập lý do hủy:</p>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Nhập lý do hủy..."
            ></textarea>
            <div className="modal-actions">
              <button onClick={handleCloseModal}>Hủy</button>
              <button onClick={handleConfirm} disabled={!reason}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CancelButton;
