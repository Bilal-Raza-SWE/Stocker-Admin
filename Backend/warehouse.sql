-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 01:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `warehouse`
--

-- --------------------------------------------------------

--
-- Table structure for table `carrier_details`
--

CREATE TABLE `carrier_details` (
  `shipmentID` int(11) NOT NULL,
  `shipmentDate` date NOT NULL,
  `carrierName` varchar(100) NOT NULL,
  `carrierContact` varchar(100) NOT NULL,
  `vehicleDetails` varchar(100) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `carrier_details`
--

INSERT INTO `carrier_details` (`shipmentID`, `shipmentDate`, `carrierName`, `carrierContact`, `vehicleDetails`, `status`) VALUES
(1, '0000-00-00', '123-456-7890', 'Truck, Model X', 'Dispatched', '2024-12-10'),
(1, '0000-00-00', '123-456-7890', 'Truck, Model X', 'Dispatched', '2024-12-10');

-- --------------------------------------------------------

--
-- Table structure for table `delivery_status`
--

CREATE TABLE `delivery_status` (
  `orderID` int(11) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `items` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `dispatchDate` date NOT NULL,
  `updatedStatus` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `delivery_status`
--

INSERT INTO `delivery_status` (`orderID`, `customerName`, `items`, `quantity`, `dispatchDate`, `updatedStatus`) VALUES
(123, 'John Doe', 'Laptop', 2, '2024-12-10', 'Shipped');

-- --------------------------------------------------------

--
-- Table structure for table `errors`
--

CREATE TABLE `errors` (
  `orderID` int(11) NOT NULL,
  `itemsName` varchar(100) NOT NULL,
  `shipmentID` int(11) NOT NULL,
  `packingErrorDescription` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `errors`
--

INSERT INTO `errors` (`orderID`, `itemsName`, `shipmentID`, `packingErrorDescription`) VALUES
(1, 'Item Name', 2, 'Packaging error description'),
(1, 'Item Name', 2, 'Packaging error description');

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `items` varchar(100) NOT NULL,
  `itemid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`items`, `itemid`) VALUES
('Laptop', 1),
('Laptop HP', 2),
('sfsfsffsf', 3);

-- --------------------------------------------------------

--
-- Table structure for table `manager`
--

CREATE TABLE `manager` (
  `StockID` int(11) NOT NULL,
  `ItemName` varchar(200) NOT NULL,
  `ItemCategory` varchar(200) NOT NULL,
  `ReportingManagerName` text NOT NULL,
  `Discrepancies` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `manager`
--

INSERT INTO `manager` (`StockID`, `ItemName`, `ItemCategory`, `ReportingManagerName`, `Discrepancies`) VALUES
(1, 'Item A', 'Category A', 'Manager Name', 'No discrepancies');

-- --------------------------------------------------------

--
-- Table structure for table `notify_customer`
--

CREATE TABLE `notify_customer` (
  `orderID` int(11) NOT NULL,
  `shipmentID` int(11) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `customerAddress` varchar(100) NOT NULL,
  `customerContactNo` int(11) NOT NULL,
  `itemName` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `itemDispatchDate` date NOT NULL,
  `carrierCompanyName` varchar(100) NOT NULL,
  `carrierCompanyContactInfo` varchar(100) NOT NULL,
  `message` varchar(200) NOT NULL,
  `receivingDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notify_customer`
--

INSERT INTO `notify_customer` (`orderID`, `shipmentID`, `customerName`, `customerAddress`, `customerContactNo`, `itemName`, `quantity`, `itemDispatchDate`, `carrierCompanyName`, `carrierCompanyContactInfo`, `message`, `receivingDate`) VALUES
(123, 456, 'John Doe', '1234 Elm St, Springfield, IL', 2147483647, 'Smartphone', 2, '2024-12-10', 'DHL', '1-800-555-DHL', 'Your order is on the way.', '2024-12-12');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `Orderid` int(11) NOT NULL,
  `customerName` varchar(100) NOT NULL,
  `Items` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `dispatchDate` date NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`Orderid`, `customerName`, `Items`, `quantity`, `dispatchDate`, `status`) VALUES
(1, 'John Doe', 'Laptop', 2, '2024-12-10', 'Pending'),
(2, 'John Doe', 'Laptop', 2, '2024-12-10', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `outgoing_record`
--

CREATE TABLE `outgoing_record` (
  `shipmentID` int(11) NOT NULL,
  `itemName` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `dispatchDate` date NOT NULL,
  `trackingNumber` bigint(20) NOT NULL,
  `carrierName` varchar(100) NOT NULL,
  `destination` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `outgoing_record`
--

INSERT INTO `outgoing_record` (`shipmentID`, `itemName`, `quantity`, `dispatchDate`, `trackingNumber`, `carrierName`, `destination`) VALUES
(1, 'Laptop', 50, '2024-12-15', 123456789012345, 'FedEx', 'New York, USA');

-- --------------------------------------------------------

--
-- Table structure for table `schedule_shipments`
--

CREATE TABLE `schedule_shipments` (
  `shipmentID` int(11) NOT NULL,
  `recipientsName` text NOT NULL,
  `dateofshipment` date NOT NULL,
  `senderName` text NOT NULL,
  `senderAddress` varchar(200) NOT NULL,
  `recipientsAddress` varchar(200) NOT NULL,
  `dispatchDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `schedule_shipments`
--

INSERT INTO `schedule_shipments` (`shipmentID`, `recipientsName`, `dateofshipment`, `senderName`, `senderAddress`, `recipientsAddress`, `dispatchDate`) VALUES
(1, 'John Doe', '2024-12-10', 'Jane Smith', '123 Sender St, City, Country', '456 Recipient St, City, Country', '2024-12-09');

-- --------------------------------------------------------

--
-- Table structure for table `slips`
--

CREATE TABLE `slips` (
  `orderID` int(11) NOT NULL,
  `shipmentID` int(11) NOT NULL,
  `dateofShipment` date NOT NULL,
  `sendersName` varchar(100) NOT NULL,
  `sendersAddress` varchar(100) NOT NULL,
  `weight` varchar(100) NOT NULL,
  `packageType` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `itemNames` varchar(100) NOT NULL,
  `recipientsAddress` varchar(100) NOT NULL,
  `recipientsName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slips`
--

INSERT INTO `slips` (`orderID`, `shipmentID`, `dateofShipment`, `sendersName`, `sendersAddress`, `weight`, `packageType`, `quantity`, `itemNames`, `recipientsAddress`, `recipientsName`) VALUES
(123, 1, '2024-12-10', 'Jane Smith', '4321 Maple St, Springfield, IL', '5kg', 'Box', 3, 'Laptop, Mouse, Charger', '5678 Oak St, Springfield, IL', 'John Doe');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `stockID` int(11) NOT NULL,
  `itemName` varchar(100) NOT NULL,
  `itemCategory` varchar(100) NOT NULL,
  `quantity` int(11) NOT NULL,
  `inventoryLevel` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `barCode` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stock`
--

INSERT INTO `stock` (`stockID`, `itemName`, `itemCategory`, `quantity`, `inventoryLevel`, `description`, `barCode`) VALUES
(1, 'Widget A', 'Electronics', 75, 400, 'Updated inventory level', 'ABC12345');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `SupplierID` int(11) NOT NULL,
  `ItemCategory` varchar(100) NOT NULL,
  `SupplierName` varchar(100) NOT NULL,
  `QuantitySupplied` int(11) NOT NULL,
  `SupplierAddress` varchar(200) NOT NULL,
  `ItemsSupplied` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`SupplierID`, `ItemCategory`, `SupplierName`, `QuantitySupplied`, `SupplierAddress`, `ItemsSupplied`) VALUES
(1, 'Electronics', 'ABC Electronics', 500, '123 Main St, New York', 'Laptops, Phones, Accessories');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemid`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`stockID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `itemid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `stockID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
