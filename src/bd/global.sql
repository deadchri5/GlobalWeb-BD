-- phpMyAdmin SQL Dump
-- version 5.1.1-1.fc34
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 01, 2021 at 10:56 PM
-- Server version: 10.5.11-MariaDB
-- PHP Version: 7.4.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `global`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoria`
--

CREATE TABLE `categoria` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `categoria`
--

INSERT INTO `categoria` (`ID`, `nombre`) VALUES
(1, 'equipos'),
(2, 'graficas'),
(3, 'procesadores'),
(4, 'disipadores'),
(5, 'RAM'),
(6, 'motherboards'),
(7, 'fuentes');

-- --------------------------------------------------------

--
-- Table structure for table `compra`
--

CREATE TABLE `compra` (
  `FK_usuario` int(11) NOT NULL,
  `FK_producto` int(11) NOT NULL,
  `cantidad` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `compra`
--

INSERT INTO `compra` (`FK_usuario`, `FK_producto`, `cantidad`) VALUES
(8, 11, 2),
(12, 26, 1),
(12, 8, 1),
(8, 6, 1),
(7, 4, 1),
(7, 9, 1),
(9, 7, 1),
(9, 9, 1),
(11, 6, 2);

-- --------------------------------------------------------

--
-- Table structure for table `direcciones`
--

CREATE TABLE `direcciones` (
  `ID` int(11) NOT NULL,
  `calle` varchar(40) NOT NULL,
  `cp` mediumint(9) UNSIGNED NOT NULL,
  `colonia` varchar(30) NOT NULL,
  `numero` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `direcciones`
--

INSERT INTO `direcciones` (`ID`, `calle`, `cp`, `colonia`, `numero`) VALUES
(1, 'Av. Topacio', 44350, 'Verde Valle', 2357);

-- --------------------------------------------------------

--
-- Table structure for table `foro`
--

CREATE TABLE `foro` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellido` varchar(30) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `comentario` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `foro`
--

INSERT INTO `foro` (`ID`, `nombre`, `apellido`, `correo`, `comentario`) VALUES
(1, 'Armando', 'Casas', 'armandoc23@gmail.com', 'Está pagina es una excelente opción para comprar componentes eléctronicos ya que los dan al precio y siempre es muy bueno el servicio, doy mis felicitaciones al servicio al cliente capacitado con el que cuentan.'),
(2, 'Ricardo', 'Altamirano', 'relg99@gmail.com', 'En lo personal me gusto la página y los productos que venden en ella, sólo que la tarjeta grafica RX 570 está más economica en otra página que vi.'),
(3, 'Christian', 'Ochoa', 'christianhdez022@gmail.com', 'wdadasd'),
(4, 'Troll', 'Anonimo', 'alguien@example.com', 'WHEN HACES TUS MOMOS EN EL FORO. BUT EL PROFE TE TERMMINA BANEANDO, \"OH MI LENTE DE CONTACTO\".'),
(5, 'Paul', 'Knox', 'allisdarkness@hotmail.com', 'This web is amazing, the only problem is, there is no English version, but my Spanish skills are enough :p.'),
(6, 'Wayne', 'Jonhson', 'sqlazo@outlook.com', 'Web rifada 100/100 la neta, me gusto mucho el diseño de la misma. Sin mencionar que es SPA ya que en ningun momento se recarga la web.'),
(9, 'Christian', 'Ochoa', 'ejemlplo@gmail.com', 'hola esto es una prueba');

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `marca` varchar(30) NOT NULL,
  `precio` mediumint(8) UNSIGNED NOT NULL,
  `descripcion` tinytext DEFAULT NULL,
  `imagen` varchar(100) DEFAULT NULL,
  `FK_categoria` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`ID`, `nombre`, `marca`, `precio`, `descripcion`, `imagen`, `FK_categoria`) VALUES
(1, 'RTX 3060', 'ZOTAC', 14750, 'Tarjeta de video NVIDIA con tecnología Ray Tracing', '7156DLyUsYL._AC_SL1500_.jpg', 2),
(2, 'GTX 1650 Mini ITX OC', 'Gigabyte', 8500, 'Integrated with 4GB GDDR5 128bit memory interface 80mm unique blade fan 170 mm compact card size', 'LD0005294692_2.jpg', 2),
(3, 'RX 570 Pulse ITX 4GD5', 'Sapphire', 7000, 'Engine Clock: Up to 1244 MHz (Boost)\r\nMemory: 4GB GDDR5 6000 MHz Effective\r\nQuick Connect\r\nITX Form Factor', 's-l225.jpg', 2),
(4, 'Radeon RX 6600 XT Fighter', 'PowerColor', 28500, 'La nueva serie Radeon RX 5700 XT con tecnología RDNA para un rendimiento excepcional y juegos de alta fidelidad. ', 'small_fighter-rx-6600xt-style.jpg', 2),
(5, 'MSI GF63 Thin 10SCSR-1436MX', 'MSI', 25600, 'Laptop gamer de alto rendimiento con procesador Intel core i7 de decima generación y tarjeta de video NVIDIA® GeForce® GTX 1650, SSD, 8GB RAM.', '719QyW89YDL._AC_SL1500_.jpg', 1),
(6, 'RYZEN 7 5800X', 'AMD', 8100, 'Procesador AMD con velocidad máxima de memoria Hasta 3200MHz, Reloj de aumento máx. Hasta 4.7GHz, # de núcleos de CPU 8 a 16 hilos.', 'ryzen7.jpg', 3),
(7, 'Intel Core i9-9900K', 'Intel', 7050, 'Procesador Intel core i9 de novena generación.', 'corei9.jpg', 3),
(8, 'Corsair Vengeance LPX 16GB (2x8GB)', 'Corsair', 2150, 'Módulo de memoria diseñado para overclocking de alto rendimiento en placas base Intel X99/100 Series. La memoria Vengeance LPX se ha diseñado para overclocking de alto rendimiento.', NULL, 5),
(9, 'Gigabyte X570 AORUS Master', 'Gigabyte', 8884, 'Supports AMD 3rd Gen Ryzen/ 2nd Gen Ryzen/ 2nd Gen Ryzen with Radeon Vega Graphics/ Ryzen with Radeon Vega Graphics processors.\r\nDual Channel ECC/ Non-ECC Unbuffered DDR4, 4 DIMMs.\r\nDirect 14 phases Infineon digital VRM solution with 50a powirstage.', '81f8nbIA-kL._AC_SL1500_.jpg', 6),
(10, 'Asus AM4 TUF Gaming X570-Plus ', 'Asus', 4399, 'AMD AM4 socket: Ready for 2nd and 3rd Gen AMD Ryzen processors to maximize connectivity and speed with up to two M. 2 Drives, USB 3. 2 Gen2 and AMD StoreMI', NULL, 6),
(11, 'Asus Prime Z390-P LGA1151', 'Asus', 2800, 'Designed for 9th and 8th Generation Intel Core processors to maximize connectivity and speed with M.2, USB 3.1 Gen2 and Asus optimum II for better DRAM overclocking stability', NULL, 6),
(12, 'AORUS Micro ATX B460M Elite', 'Gigabyte', 2356, 'Circuito integrado de tarjeta madre: Intel B460\r\nSocket de procesador: LGA 1200\r\nCircuito integrado: Intel B460\r\nMemoria interna, máxima: 128 GB', NULL, 6),
(13, 'Corsair RM850 80 PLUS Gold', 'Corsair', 2098, 'Potencia nominal: 850 W\r\nDiámetro de ventilador: 13.5 cm\r\nFactor de forma: ATX\r\nAlimentador de energía: 24-pin ATX', NULL, 7),
(14, 'Corsair H100X', 'Corsair', 1780, 'Enfriamiento líquido para Procesador, 2 Ventiladores, 600-1700 RPM, LGA 15XX/2011/2066, Socket AM2, AM3, AM4, Interno', NULL, 4),
(19, 'OMEN 15 2020', 'HP', 23600, 'AMD® Ryzen™ 7 processor4 and up to NVIDIA® GeForce® RTX 3070', 'TnHJEjWsw-BAYwH97lVZNBgq.png', 1),
(20, 'Kingston HyperX Impact DDR4 SO-DIMM', 'Kingston', 746, 'Tipo de memoria interna: DDR4\nMemoria interna: 8 GB\nDiseño de memoria: 1 x 8 GB\nVelocidad de memoria del reloj: 2666 MHz', 'O54pl4sZTHg56ADwbyIXShzd.jpg', 5),
(24, 'Laptop HP.ENVY, 13\"', 'HP', 27860, 'Laptop HP 13-AY0001LA color negro con resolución FHD, pantalla táctil de 13\", procesador AMD Ryzen 7, sistema operativo Windows 10, memoria RAM de 8 GB y SSD de 512 GB.', '_XB2V5I_ktFDPNlbnl4qllTu.jpg', 1),
(25, 'EVGA 850 Bq, 80', 'EVGA', 1790, 'Bronze 850W, Semi Modular, 5 Year, Includes Free Power On Self Tester, Power Supply 110-BQ-0850-V1', 'DdnH1muMijtm2-L5Z9M2heOd.jpg', 7),
(26, 'HUAWEI MateBook D 16', 'Huawei', 20699, 'Pantalla de 16.1\" FullView Display.\nProcesador de 7nm AMD Ryzen 4000H-Series.\nMemoria RAM de 16GB.\nBotón de encendido con sensor de huella dactilar.\nRápida navegación con Wi-Fi 6.', 'fcPLNlYSty0bV0LTlmeg5Fik.jpg', 1),
(27, 'prueba', 'lo que sea', 1000, 'asdasdasda', '0sWzkRNq78HkK1UzSzb9hyTg.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `ID` int(11) NOT NULL,
  `tipo` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`ID`, `tipo`) VALUES
(1, 'usuario'),
(2, 'administrador');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('Oigh4b-yiwjY1D1KcF3y0NkEvePRnYa2', 1630158153, '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2021-08-28T13:42:33.143Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"usuario\":{\"usuario\":\"chris\",\"correo\":\"c@gmail.com\",\"nombre\":\"Yesael\",\"apellido\":\"Hernandez\",\"permiso\":1}}');

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `ID` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `email` varchar(70) NOT NULL,
  `nick` varchar(20) NOT NULL,
  `FK_rol` int(11) NOT NULL,
  `FK_direccion` int(11) DEFAULT NULL,
  `clave` varchar(100) NOT NULL,
  `apellido` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usuarios`
--

INSERT INTO `usuarios` (`ID`, `nombre`, `email`, `nick`, `FK_rol`, `FK_direccion`, `clave`, `apellido`) VALUES
(4, 'Adriana', 'liloth00814@gmail.com', 'ad', 1, NULL, '$2a$10$m3RekRxrdLF5Y6dxgUP4R.x4TkiHa7D1WShMvv9wvr9BUgEJPW.si', 'Espinosa'),
(5, 'Luis', 'feivian21@gmail.com', 'feivian', 1, NULL, '$2a$10$OY9HFboEuv4M8t7RvGJE9OkJtRgznXF9jAD3n0r.L2IPvEW9gWGgy', 'Rangel'),
(7, 'Bruno', 'bruno@gmail.com', 'deutschland', 1, 1, '$2a$10$Aavc29USU81lICd8A9RV.uUT0E9rd89HXIizps/4YD5ET7o9IqkAi', 'Ochoa'),
(8, 'Adriana', 'ad@gmail.com', 'cherry', 2, NULL, '$2a$10$Qdx0fdyMBfiOgkduTjDsv.C398rbm1bEeyf.WSNz69h5b.jZPgSeq', 'Espinosa'),
(9, 'Yesael', 'c@gmail.com', 'chris', 1, NULL, '$2a$10$/zClS.3mJ/sN23QOQ6azzeOlqSo3AmzPHOikPCRM2wZcGgJd7ztWK', 'Hernandez'),
(11, 'Christian', 'a@gmail.com', 'christian', 2, NULL, '$2a$10$r7HkRHJbCkk9unt.wBUOp.UnWlroELNp3ZWi.oqYXmDDMVL5EO7uy', 'Ochoa'),
(12, 'Brendon', 'panic@gmail.com', 'panic! at the disco', 1, NULL, '$2a$10$1a4PUR5bRPufWYHMuTJSF.Myg8c.mT2UjeWO.WLLPYVvEYyL0nIw.', 'Urie'),
(13, 'Joel', 'mouse@gmail.com', 'mau5', 1, NULL, '$2a$10$D2ZBeg0edcJLOQrT/wW/luzTSZ6b/qIag9.ZImSYagY1svTCd3lGe', 'Zimmerman'),
(14, 'Max', 'micro@gmail.com', 'micro', 1, NULL, '$2a$10$k7azMhtiYAYHtAQC.b1VP.dGlAwwFehjna7kSekrBIihnuIreFNae', 'Stanford'),
(15, 'German', 'germany@gmail.com.de', 'steppenwolf', 1, NULL, '$2a$10$3SrVSEcbqMF7ERIKmwxNteVCuYeM85h6oZtVMBQW6J.hbg/aX/Kp.', 'Hesse');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `compra`
--
ALTER TABLE `compra`
  ADD KEY `FK_usuario` (`FK_usuario`),
  ADD KEY `FK_producto` (`FK_producto`);

--
-- Indexes for table `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_categoria` (`FK_categoria`);

--
-- Indexes for table `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_rol` (`FK_rol`),
  ADD KEY `FK_direccion` (`FK_direccion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoria`
--
ALTER TABLE `categoria`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `foro`
--
ALTER TABLE `foro`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `rol`
--
ALTER TABLE `rol`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `compra`
--
ALTER TABLE `compra`
  ADD CONSTRAINT `compra_ibfk_1` FOREIGN KEY (`FK_usuario`) REFERENCES `usuarios` (`ID`),
  ADD CONSTRAINT `compra_ibfk_2` FOREIGN KEY (`FK_producto`) REFERENCES `productos` (`ID`);

--
-- Constraints for table `productos`
--
ALTER TABLE `productos`
  ADD CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`FK_categoria`) REFERENCES `categoria` (`ID`);

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`FK_rol`) REFERENCES `rol` (`ID`),
  ADD CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`FK_direccion`) REFERENCES `direcciones` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
