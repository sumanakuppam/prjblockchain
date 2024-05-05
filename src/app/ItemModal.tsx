
import React from 'react';
import { ethers } from 'ethers'; 
import './styles.css'; 


interface ItemModalProps {
  isOpen: boolean; 
  onClose: () => void; 
  itemDetails: {
    title: string;
    description: string;
    price: string; 
    transactionHash: string; 
  } | null; 
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, onClose, itemDetails }) => {
  if (!isOpen || !itemDetails) {
    return null; 
  }

  return (
    <div className="modal-overlay" onClick={onClose}> {}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {}
        <h2>Item Added Successfully</h2>
        <p><strong>Title:</strong> {itemDetails.title}</p>
        <p><strong>Description:</strong> {itemDetails.description}</p>
        <p><strong>Price:</strong> {itemDetails.price} ETH</p>
        <p><strong>Transaction Hash:</strong> {itemDetails.transactionHash}</p>
        <button onClick={onClose}>Close</button> {}
      </div>
    </div>
  );
};

export default ItemModal;
