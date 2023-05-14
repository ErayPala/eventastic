-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: database
-- Erstellungszeit: 14. Mai 2023 um 19:52
-- Server-Version: 10.11.2-MariaDB-1:10.11.2+maria~ubu2204
-- PHP-Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `eventastic`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `eventmanagement`
--

CREATE TABLE `eventmanagement` (
  `teilnehmer_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `events`
--

CREATE TABLE `events` (
  `event_id` int(11) NOT NULL,
  `event_titel` varchar(255) NOT NULL,
  `event_veranstalter` varchar(255) NOT NULL,
  `event_typ` varchar(255) NOT NULL,
  `event_kategorie` varchar(255) NOT NULL,
  `event_adresse` varchar(255) NOT NULL,
  `event_stadt` varchar(255) NOT NULL,
  `event_bundesland` varchar(255) NOT NULL,
  `event_plz` varchar(255) NOT NULL,
  `event_land` varchar(255) NOT NULL,
  `event_startdatum` date NOT NULL,
  `event_enddatum` date NOT NULL,
  `event_startzeit` time NOT NULL,
  `event_endzeit` time NOT NULL,
  `event_erstellt` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `events`
--

INSERT INTO `events` (`event_id`, `event_titel`, `event_veranstalter`, `event_typ`, `event_kategorie`, `event_adresse`, `event_stadt`, `event_bundesland`, `event_plz`, `event_land`, `event_startdatum`, `event_enddatum`, `event_startzeit`, `event_endzeit`, `event_erstellt`) VALUES
(1, 'Privatkonzert', 'Elias Hoh', 'Konzert oder Aufführung', 'Musik', 'Rotebühlplatz 41/1', 'Stuttgart', 'BW', '70178', 'Deutschland', '2023-05-10', '2023-05-10', '19:00:00', '23:00:00', '2023-04-06 08:27:10'),
(7, 'Programmieren lernen', 'Marco Kröker', 'seminar', 'geschäftlich', 'Theodor-Heuss-Straße 2', 'Stuttgart', 'Baden-Württemberg', '70174', 'Deutschland', '2023-05-15', '2023-05-15', '09:00:00', '16:00:00', '2023-05-14 19:10:02'),
(8, 'Weiterbildung Politik', 'Eray Pala', 'konferenz', 'regierung', 'Paulinenstraße 50', 'Stuttgart', 'Baden-Württemberg', '70174', 'Deutschland', '2023-05-16', '2023-05-16', '09:00:00', '16:00:00', '2023-05-14 19:11:05');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_vorname` varchar(255) NOT NULL,
  `user_nachname` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `user_passwort` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Daten für Tabelle `user`
--

INSERT INTO `user` (`user_id`, `user_vorname`, `user_nachname`, `user_email`, `user_passwort`) VALUES
(1, 'Elias', 'Hoh', 'eliastest@gmail.com', 'eliaspasswort'),
(8, 'Marco', 'Kröker', 'marcotest@gmail.com', 'marcopasswort'),
(9, 'Eray', 'Pala', 'eraytest@gmail.com', 'eraypasswort');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `eventmanagement`
--
ALTER TABLE `eventmanagement`
  ADD PRIMARY KEY (`teilnehmer_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indizes für die Tabelle `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indizes für die Tabelle `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `eventmanagement`
--
ALTER TABLE `eventmanagement`
  MODIFY `teilnehmer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT für Tabelle `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `eventmanagement`
--
ALTER TABLE `eventmanagement`
  ADD CONSTRAINT `eventmanagement_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `eventmanagement_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
