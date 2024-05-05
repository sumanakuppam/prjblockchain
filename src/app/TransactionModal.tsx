import React from 'react';
import { ethers } from 'ethers';
import '.styles.css'; 

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void; 
  transactionHash: string | null; 
  itemDetails?: { 
    title?: string;
    description?: string;
    price?: ethers.BigNumberish;
  };
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, transactionHash, itemDetails }) => {
  if (!isOpen) {
    return null; 
  }

  return (
    <div className="modal-overlay" onClick={onClose}> {}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {}
        <h2>Transaction Information</h2>
        {itemDetails && (
          <>
            <p><strong>Title:</strong> {itemDetails.title}</p>
            <p><strong>Description:</strong> {itemDetails.description}</p>
            <p><strong>Price:</strong>{' '}
            {itemDetails.price ? ethers.utils.formatEther(itemDetails.price) + ' ETH' : 'N/A'} {}</p>
          </>
        )}
        <p><strong>Transaction Hash:</strong> {transactionHash}</p> {}
        <button onClick={onClose}>Close</button> {}
      </div>
    </div>
  );
};

export default TransactionModal;
