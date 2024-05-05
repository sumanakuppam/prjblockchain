"use client"; 

import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '@/utils/smart-contract';
import './styles.css';

const TransactionModal: React.FC<{ isOpen: boolean, onClose: () => void, transactionHash: string | null }> = ({ isOpen, onClose, transactionHash }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}> {}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> {}
        <h2>Transaction Completed</h2>
        <p>
          <strong>Transaction Hash:</strong>
          <a
            href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {transactionHash}
          </a>
        </p> {}
        <button onClick={onClose}>Close</button> {}
      </div>
    </div>
  );
};

interface Item {
  itemId: number;
  title: string;
  description: string;
  price: ethers.BigNumber | null;
  seller: string;
  isSold: boolean;
}

const initialFormState = {
  title: '',
  description: '',
  price: '',
};

const ItemMarket: React.FC = () => {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [walletConnected, setWalletConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');
  const [newItem, setNewItem] = useState(initialFormState);

  const [items, setItems] = useState<Item[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [lastTransactionHash, setLastTransactionHash] = useState<string | null>(null); 
  const [isInProcess, setIsInProcess] = useState(false); 
  
  const openModal = (transactionHash: string) => {
    setLastTransactionHash(transactionHash);
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const connectWallet = async () => {
    if (typeof window !== 'undefined' && (window as any).ethereum) {

      try {
        const provider = new ethers.providers.Web3Provider((window as any).ethereum);
        await (window as any).ethereum.request({ method: 'eth_requestAccounts' });

        const accounts = await provider.listAccounts();
        setUserAddress(accounts[0]);
        const signer = provider.getSigner();

        const newContract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        setContract(newContract);
        setWalletConnected(true);
    

      
      const itemList = await newContract.getAllItems();
      const formattedItems = itemList.map((item: any, index: number) => ({
        itemId: index,
        title: item.title,
        description: item.description,
        price: item.price ? ethers.BigNumber.from(item.price) : null,
        seller: item.seller,
        isSold: item.isSold,
      }));

      setItems(formattedItems); 
    } catch (error) {
      console.error("Error connecting wallet:", error); 
      }
    }
  };

  useEffect(() => {
    if (walletConnected){
      connectWallet();
    }
     
  }, []);

  const handleListItem = async () => {
    if (contract) {
      setIsInProcess(true);
      let priceInWei: ethers.BigNumber | null = null;
      try {
        // We convert the price to Wei
        if (newItem.price.trim() !== '' && !isNaN(Number(newItem.price))) {
          priceInWei = ethers.utils.parseEther(newItem.price); 
        } else {
          throw new Error("Invalid price value");
        }
      } catch (error) {
        console.error("Error parsing price:", error);
        setIsInProcess(false);
        return;
      }

      try {
        const transaction = await contract.listItem(
          newItem.title,
          newItem.description,
          priceInWei
        );

        await transaction.wait(); 
        
        setIsInProcess(false);
        openModal(transaction.hash); 

        const itemList = await contract.getAllItems();
        const formattedItems = itemList.map((item: any, index: number) => ({
          itemId: index,
          title: item.title,
          description:item.description,
          price: item.price ? ethers.BigNumber.from(item.price) : null,
          seller: item.seller,
          isSold: item.isSold,
        }));

        setItems(formattedItems); 
        setNewItem(initialFormState);
      } catch (error) {
        console.error("Error listing item:", error);
        setIsInProcess(false);
      }
    }
  };

  const handlePurchase = async (itemId: number, price: ethers.BigNumber | null) => {
    if (contract && price) {
      try {
         setIsInProcess(true);
         const transaction = await contract.purchaseItem(
          itemId,
          {
            value: price, 
          }
        );
        await transaction.wait(); 
        setIsInProcess(false);
        openModal(transaction.hash); 
        const itemList = await contract.getAllItems();
        const formattedItems = itemList.map((item: any, index: number) => ({
          itemId: index,
          title: item.title,
          description: item.description,
          price: item.price ? ethers.BigNumber.from(item.price) : null,
          seller: item.seller,
          isSold: item.isSold,
        }));

        setItems(formattedItems); 
      } catch (error) {
        console.error("Error purchasing item:", error);
        setIsInProcess(false);
      }
    }
  };

  return (
    <div className="item-market">
      <header>
        <h1>Market Place</h1>
        <button onClick={connectWallet} disabled={walletConnected}>
          {walletConnected ? 'Wallet Connected' : 'Connect Wallet'}
        </button>
      </header>
      {isInProcess && (
        <div className="spinner-container"> {}
          <div className="spinner"></div> {}
        </div>
      )}
      <section>
        <h2>List a New Item</h2>
        <div className="list-item-form">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price in ETH"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          />
          <button onClick={handleListItem}>List Item</button>
        </div>
      </section>

      <section>
        <h2>Items for Sale</h2>
        <div className="items-list">
          {items.map((item) => (
            <div key={item.itemId} className="item-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              {item.price ? (
                <p>Price: {ethers.utils.formatEther(item.price)} ETH</p>
              ) : (
                <p>Price: N/A</p>
              )}
              <p>
                Owned by:{' '}
                <a
                  href={`https://sepolia.etherscan.io/address/${item.seller}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.seller}
                </a>
              </p>
              {userAddress === item.seller ? (
                <p className="no-purchase">Owned</p> 
              ) : item.isSold ? (
                <p className="item-sold">Sold Out</p> 
              ) :(
                <button onClick={() => handlePurchase(item.itemId, item.price)}>
                  Purchase
                </button>
                
              )}
            </div>
          ))}
        </div>
      </section>

      <TransactionModal
        isOpen={isModalOpen} 
        onClose={closeModal} 
        transactionHash={lastTransactionHash} 
      />
    </div>
  );
};

export default ItemMarket;
