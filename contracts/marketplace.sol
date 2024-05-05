// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ItemMarket {
    
    struct Item {
        string title;
        string description;
        uint256 price; // Price in wei
        address payable seller; 
        bool isSold;
    }

    
    Item[] public items;

    
    event ItemListed(
        uint256 indexed itemId,
        string title,
        string description,
        uint256 price,
        address indexed seller,
        bytes32 indexed transactionHash 
    );

    
    event ItemPurchased(
        uint256 indexed itemId,
        address indexed buyer,
        uint256 amountPaid,
        bytes32 indexed transactionHash 
    );

  
    function listItem(
        string memory _title,
        string memory _description,
        uint256 _price
    ) public {
        require(_price > 0, "Price must be greater than zero");

        Item memory newItem = Item({
            title: _title,
            description: _description,
            price: _price,
            seller: payable(msg.sender),
            isSold: false
        });

        
        uint256 newItemId = items.length;
        items.push(newItem);

        
        emit ItemListed(
            newItemId,
            _title,
            _description,
            _price,
            msg.sender,
            keccak256(abi.encodePacked(blockhash(block.number - 1), address(this), items.length))
        );
    }

   
    function purchaseItem(uint256 _itemId) public payable {
        require(_itemId < items.length, "Invalid item ID");
        Item storage item = items[_itemId];

        require(!item.isSold, "Item has already been sold");
        require(msg.value == item.price, "Incorrect amount sent");

        
        item.seller.transfer(msg.value); 
        item.seller=payable(msg.sender);
        item.isSold = true;

       
        emit ItemPurchased(
            _itemId,
            msg.sender,
            msg.value,
            keccak256(abi.encodePacked(blockhash(block.number - 1), address(this), items.length)) 
        );
    }

   
    function getAllItems() public view returns (Item[] memory) {
        return items;
    }

   
    constructor() {
        listItem("Airpods", "This is a sample item.", 0.01 ether);
        listItem("Iwatch", "Another sample item.", 0.02 ether);
        listItem("Casio Watch", "Yet another sample item.", 0.03 ether);
    }
}
