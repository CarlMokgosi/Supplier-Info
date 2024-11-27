-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 13, 2024 at 06:16 AM
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
-- Database: `supplier_info`
--

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`name`, `surname`, `email`, `password`) VALUES
('Carl', 'Mokgosi', 'carlmokgosi@gmail.com', '$2a$08$pULJLuDUG.qeU4RbWHj/fuOTkoFAz2c/dhhXuTKg.tE7DXP1JAIDq');

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `company_name` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `cellphone` varchar(255) NOT NULL,
  `fax` varchar(255) NOT NULL,
  `postal_address` varchar(255) NOT NULL,
  `physical_address` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `supporting_documents` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`company_name`, `telephone`, `cellphone`, `fax`, `postal_address`, `physical_address`, `description`, `supporting_documents`) VALUES
('Acme Corporation', '(555) 123-4567', ' (555) 987-6543', ' (555) 123-4568', 'P.O. Box 123, Toon Town, CA 90001', '456 Cartoon Lane, Toon Town, CA 90001', 'Acme Corporation is known for its wide range of products, often used by cartoon characters. From anvils to rocket-powered roller skates, Acme has it all!', 'null'),
('Wayne Enterprises', '(555) 765-4321', '(555) 876-5432', '(555) 765-4322', ' P.O. Box 456, Gotham City, NY 10001', '100 Wayne Tower, Gotham City, NY 10001', ' Wayne Enterprises is a multinational conglomerate owned by Bruce Wayne. It operates in various sectors including technology, defense, and healthcare.', 'Null'),
('Dunder Mifflin', '(555) 234-5678', '(555) 876-5433', '(555) 234-5679', 'P.O. Box 789, Scranton, PA 18503', '1725 Slough Avenue, Scranton, PA 18503', 'Dunder Mifflin is a paper supply company featured in the TV show “The Office.” Known for its quirky employees and unique office culture.', 'Null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
