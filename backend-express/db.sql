/*
SQLyog Community v13.1.2 (64 bit)
MySQL - 10.4.11-MariaDB : Database - btechnology
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`btechnology` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `btechnology`;

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `ID` bigint(20) NOT NULL,
  `NAME` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `category` */

insert  into `category`(`ID`,`NAME`) values 
(1,'Mobilni Telefoni'),
(2,'Računari'),
(3,'Laptopovi'),
(4,'Televizori');

/*Table structure for table `order_item` */

DROP TABLE IF EXISTS `order_item`;

CREATE TABLE `order_item` (
  `ORDER_ID` bigint(20) NOT NULL,
  `ID` bigint(20) NOT NULL,
  `PRODUCT_ID` bigint(20) NOT NULL,
  `QUANTITY` int(11) NOT NULL,
  `AMOUNT` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID`,`ORDER_ID`),
  KEY `ORDER_ID` (`ORDER_ID`),
  KEY `PRODUCT_ID` (`PRODUCT_ID`),
  CONSTRAINT `order_item_ibfk_2` FOREIGN KEY (`PRODUCT_ID`) REFERENCES `product` (`ID`),
  CONSTRAINT `order_item_ibfk_3` FOREIGN KEY (`ORDER_ID`) REFERENCES `orders` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `order_item` */

/*Table structure for table `orders` */

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `ID` bigint(20) NOT NULL AUTO_INCREMENT,
  `CONTACT_NAME` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `CITY` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `ADDRESS` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `PHONE` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `TOTAL` decimal(10,2) NOT NULL,
  `CREATED_AT` datetime(6) NOT NULL,
  `USER_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `orders` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `ID` bigint(20) NOT NULL,
  `FEATURED` int(11) NOT NULL,
  `IMAGE` varchar(255) NOT NULL,
  `DESCRIPTION` text NOT NULL,
  `NAME` varchar(255) NOT NULL,
  `UNIT_PRICE` decimal(10,2) NOT NULL,
  `UNITS_IN_STOCK` int(11) NOT NULL,
  `CATEGORY_ID` bigint(20) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `FK_PRODUCT_CATEGORY_ID` (`CATEGORY_ID`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `product` */

insert  into `product`(`ID`,`FEATURED`,`IMAGE`,`DESCRIPTION`,`NAME`,`UNIT_PRICE`,`UNITS_IN_STOCK`,`CATEGORY_ID`) values 
(1,1,'1.png','-Proizvodjac: Apple<br>\r\n-Baterija: Li-Ion 3190mAh<br>\r\n-Operativi sistem: iOS 13<br>\r\n-Velicina ekrana: 5.8\"<br>\r\n-Rezolucija: 2436x1125px<br>\r\n-Procesor: Apple A A13 Bionic<br>\r\n-Radna memorija: 64GB RAM<br>\r\n-Interna memorija: 512GB<br>\r\n-Prednja kamera: 12 mpx<br>\r\n-Glavna kamera: 12mpx<br>\r\n-Garancija: 2godine<br>','Iphone 11 pro',181999.00,38,1),
(2,1,'2.png','-Proizvodjac: Samsung<br>\r\n-Baterija: Li-Ion 3100mAh<br>\r\n-Operativi sistem: Android 9.0 Pie<br>\r\n-Velicina ekrana: 5.8\"<br>\r\n-Rezolucija: 2280x1080px<br>\r\n-Procesor: Samsung Exynos 9820 Octa<br>\r\n-Radna memorija: 64GB RAM<br>\r\n-Interna memorija: 128GB<br>\r\n-Prednja kamera: 10 mpx<br>\r\n-Glavna kamera: 6mpx<br>\r\n-Garancija: 2godine<br>','Samsung S10e',69999.00,60,1),
(3,1,'3.png','-Proizvodjac: Huawei<br>\r\n-Baterija: Li-Po 4200mAh<br>\r\n-Operativi sistem: Android 9.0 Pie<br>\r\n-Velicina ekrana: 6.47\"<br>\r\n-Rezolucija: 2340x1080px<br>\r\n-Procesor: HiSilicon Kirin 980<br>\r\n-Radna memorija: 8GB RAM<br>\r\n-Interna memorija: 256GB<br>\r\n-Prednja kamera: 32 mpx<br>\r\n-Glavna kamera: 40mpx<br>\r\n-Garancija: 2godine<br>','HuaweiP30 Pro',109999.00,92,1),
(4,0,'4.png','-Proizvodjac: LG<br>\r\n-Baterija: Li-Po 3000mAh<br>\r\n-Operativi sistem: Android 8.0 Oreo<br>\r\n-Velicina ekrana: 6.1\"<br>\r\n-Rezolucija:1440x3120px<br>\r\n-Procesor:Qualcomm SDM845 Snapdragon 845<br>\r\n-Radna memorija: 4GB RAM<br>\r\n-Interna memorija:64GB<br>\r\n-Prednja kamera: 8 mpx<br>\r\n-Glavna kamera: 16mpx<br>\r\n-Garancija: 2godine<br>','LG G7 ThinQ',57699.00,24,1),
(5,0,'5.png','-Procesor: Intel® Core™ i5-9400F 2.9 GHz (do 4.1 GHz)<br>\r\n-Čip: Intel H370<br>\r\n-Grafička karta: NVIDIA GeForce GTX 1060 3GB GDDR5 192bit<br>\r\n-Radna memorija: 8GB<br>\r\n-Hard Disk: 256GB PCIe NVMe TLC M.2 Solid State<br>\r\n-Napajanje: 300W<br>\r\n-Dimenzije: 43.31 x 16.51 x 35.71cm (VxŠxD)<br>\r\n-Garancija: 3godine<br>','OMEN by HP Obelisk Desktop PC',99999.00,52,2),
(6,1,'6.png','-Procesor: Intel® Core™ i3-8130U 2.20 GHz (do 3.40 GHz)<br>\r\n-Grafička karta: Intel® UHD Graphics 620<br>\r\n-Radna memorija: 2 SO-DIMM memorijska ležišta, maksimalno podržano 32GB (2400MHz)<br>\r\n-Hard Disk: 256 M.2 (NGFF) SSD <br>\r\n-Napajanje: 65W <br>\r\n-Dimenzije: 115 x 115 x 49 mm (ŠxDxV)<br>\r\n-Masa: 0.7 kg<br>\r\n-Garancija: 3godine<br>','ASUS Mini PC PN60-BB3003MC',45999.00,21,2),
(7,1,'7.png','-Procesor: Intel® Pentium® Processor G4560 (3M Cache, 3.50 GHz)<br>\r\n-Čip: Intel H110<br>\r\n-Grafička karta: Integrisana HD 610<br>\r\n-Radna memorija: 4GB DDR4 2133 MHz<br>\r\n-Hard Disk: 1TB HDD<br>\r\n-Napajanje: 500W<br>\r\n-Dimenzije: 43.31 x 16.51 x 35.71cm (VxŠxD)<br>\r\n-Garancija: 3godine<br>','BTechnology DESK LIDER',42999.00,25,2),
(8,0,'8.png','-Procesor: Intel® Core™ i5-9600K 3.70 GHz (do 4.60 GHz, 9MB keš memorije)<br>\r\n-Čip: Intel Z390<br>\r\n-Grafička karta: GeForce RTX 2060<br>\r\n-Radna memorija: 16GB DDR4 3200 MHz<br>\r\n-Hard Disk: 480GB SSD<br>\r\n-Napajanje: 650W<br>\r\n-Dimenzije: 43.31 x 16.51 x 35.71cm (VxŠxD)<br>\r\n-Garancija: 3godine<br>','BTechnology GAMESTAR NINJA EDITION',159999.00,29,2),
(9,1,'9.png','-Radna memorija: 16GB (16GB x 1) LPDDR3 2400 MHz SDRAM<br>\r\n-Ekran: 15.4\" IPS Retina LED-backlit, True Tone<br>\r\n-Rezolucija: 2880 x 1800 piksela<br>\r\n-Procesor: Intel Core i7 Hexa Core Processor 9750H<br>\r\n-Grafička karta: AMD Radeon Pro 555X sa 4GB DDR5 sopstvene memorije<br>\r\n-HDD: 256GB<br>\r\n-Dimenzije (Š x D x V): 34.93 x 24.07 x 1.55 cm<br>\r\n-Masa (kg): 1.83<br>\r\n-Garancija: 2godina<br>','APPLE MacBook Pro 15',335999.00,25,3),
(10,0,'10.png','-Radna memorija: 4GB<br>\r\n-Ekran: 15.6\" FullHD LED Anti-glare<br>\r\n-Rezolucija: 1920 x 1080<br>\r\n-Procesor: Intel® Core™ i7 Hexa Core Processor 9750H<br>\r\n-Grafička karta: Integrisana Intel HD 620<br>\r\n-HDD: 128GB<br>\r\n-Dimenzije (Š x D x V): 38.00 x 25.80 x 1.98 cm<br>\r\n-Masa (kg): 2.0<br>\r\n-Garancija: 2godina<br>','DELL Inspiron 15 3584',43999.00,44,3),
(11,0,'11.png','-Radna memorija: 4GB<br>\r\n-Ekran: 15.6\" FullHD LED Anti-glare<br>\r\n-Rezolucija: 1920 x 1080<br>\r\n-Procesor: Intel® Core™ i3 Dual Core Processor 7020U<br>\r\n-Grafička karta: nVidia GeForce MX130<br>\r\n-HDD: 128GB<br>\r\n-Dimenzije (Š x D x V): 38.16 x 26.28 x 2.16 cm<br>\r\n-Masa (kg): 2.0<br>\r\n-Garancija: 2godine<br>','ACER Aspire 3 A315-53G',52999.00,125,3),
(12,0,'12.png','-Radna memorija: 8GB<br>\r\n-Ekran: Full HD 14\" IPS Anti-glare<br>\r\n-Rezolucija: 1920 x 1080<br>\r\n-Procesor: Intel® Core™ i7 Quad Core Processor 8565U<br>\r\n-Grafička karta: Integrisana Intel UHD 620<br>\r\n-HDD: 512GB<br>\r\n-Dimenzije (Š x D x V): 32.30 x 22.70 x 1.59 cm<br>\r\n-Masa (kg): 1.63<br>\r\n-Garancija: 2godine<br>','LENOVO IdeaPad S540-14IWL',94999.00,39,3),
(13,0,'13.png','-Ekran: 32\" 720p HD Ready<br>\r\n-Osvetljenje: 200cd<br>\r\n-Dinamički kontrast: 100000:1<br>\r\n-Vreme odziva: 5ms<br>\r\n-Osvežavanje: 60Hz<br>\r\n-Digitalni tjuner: DVB-T/C/T2<br>\r\n-Zvuk: 2 x 10W<br>\r\n-Garancija: 3godine<br>','FOX 32DLE172 LED',12999.00,100,4),
(14,0,'14.png','-Ekran: 43\" 1080p Full HD<br>\r\n-Osvetljenje: 250cd<br>\r\n-Dinamički kontrast: 100000:1<br>\r\n-Vreme odziva: 5ms<br>\r\n-Osvežavanje: 60Hz<br>\r\n-Digitalni tjuner: DVB-T/C/T2<br>\r\n-Zvuk: 2 x 8W<br>\r\n-Garancija: 3godine<br>','VOX 43ADS553B SMART',27999.00,58,4),
(15,0,'15.png','-Ekran: 43\" 4K Ultra HD<br>\r\n-Osvetljenje: 300cd<br>\r\n-Dinamički kontrast: 1000000:1<br>\r\n-Vreme odziva: 5ms<br>\r\n-Osvežavanje: 900 PPI<br>\r\n-Digitalni tjuner: DVB-T/C/T2<br>\r\n-Zvuk: 20W<br>\r\n-Garancija: 3godine<br>','PHILIPS 43PUS6503/12 SMART',41999.00,70,4),
(16,0,'16.png','-Ekran: 55\" 4K Ultra HD<br>\r\n-Osvetljenje: 500cd<br>\r\n-Dinamički kontrast: 1000000:1<br>\r\n-Vreme odziva: 5ms<br>\r\n-Osvežavanje: 100Hz<br>\r\n-Digitalni tjuner: DVB-T/C/T2<br>\r\n-Zvuk: 20W<br>\r\n-Garancija: 3godine<br>','LG 55UM7100PLB SMART',69999.00,92,4);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `ID` bigint(20) NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  `FIRSTNAME` varchar(255) NOT NULL,
  `LASTNAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
