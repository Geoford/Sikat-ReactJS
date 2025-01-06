-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 06, 2025 at 04:13 PM
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
-- Database: `sikat-ediary`
--

-- --------------------------------------------------------

--
-- Table structure for table `alarming_words`
--

CREATE TABLE `alarming_words` (
  `wordID` int(11) NOT NULL,
  `alarmingWord` varchar(255) NOT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alarming_words`
--

INSERT INTO `alarming_words` (`wordID`, `alarmingWord`, `count`) VALUES
(1, 'murdered', 0),
(2, 'suicide', 0),
(3, 'murder', 0),
(4, 'death', 0),
(5, 'violence', 0),
(6, 'threat', 0),
(7, 'danger', 0),
(8, 'bullying', 0),
(9, 'assault', 0),
(10, 'self-harm', 0),
(11, 'exploitation', 0),
(12, 'kidnapping', 0),
(13, 'terrorism', 0),
(14, 'corruption', 0),
(15, 'abduction', 0),
(16, 'stalking', 0),
(17, 'drugs', 0),
(18, 'addiction', 0),
(19, 'mental illness', 0),
(20, 'torture', 0),
(21, 'rape culture', 0),
(22, 'cyberbullying', 0),
(23, 'bully', 0),
(24, 'sinasaktan', 0);

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `commentID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `text` text NOT NULL,
  `replyCommentID` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`commentID`, `userID`, `entryID`, `text`, `replyCommentID`, `created_at`) VALUES
(25, 32, 110, 'popi', NULL, '2024-11-08 15:39:52'),
(26, 32, 57, 'commenta', NULL, '2024-11-08 15:57:49'),
(27, 31, 57, 'asdasd', NULL, '2024-11-09 12:44:08'),
(30, 32, 159, 'a', NULL, '2024-11-14 14:53:47'),
(32, 32, 159, 'a', NULL, '2024-11-14 15:59:32'),
(33, 31, 55, 'a', NULL, '2024-11-25 17:37:12'),
(34, 29, 57, 'a', NULL, '2024-11-25 17:37:21'),
(37, 29, 57, 'asd', NULL, '2024-12-02 13:33:26'),
(39, 29, 55, 'a', NULL, '2024-12-02 13:56:26'),
(40, 32, 213, 'a', NULL, '2024-12-08 14:38:14'),
(41, 54, 213, 'b', NULL, '2024-12-26 14:31:24'),
(42, 32, 120, 'a', NULL, '2024-12-28 15:32:21'),
(43, 32, 119, 'a', NULL, '2024-12-28 15:32:25'),
(44, 29, 212, 'a', NULL, '2024-12-28 15:46:03'),
(45, 29, 213, 'asd', NULL, '2024-12-28 16:30:28'),
(46, 29, 213, 'asd', NULL, '2024-12-28 16:30:29'),
(47, 29, 213, 'asd', NULL, '2024-12-28 16:30:39'),
(48, 29, 213, 'asd', NULL, '2024-12-28 16:32:59'),
(49, 29, 212, 'a', NULL, '2025-01-02 05:44:38'),
(50, 29, 212, 'try', NULL, '2025-01-02 05:46:07'),
(51, 29, 120, 'Hello, I sent a message to you', 42, '2025-01-05 14:40:25'),
(52, 32, 300, 'Hello', NULL, '2025-01-05 14:40:51'),
(53, 32, 300, 'asasd', NULL, '2025-01-05 14:45:13'),
(54, 32, 300, 'asdasdasd', NULL, '2025-01-05 14:47:30'),
(55, 29, 300, 'sadsad', NULL, '2025-01-05 15:05:03'),
(56, 53, 212, '5656', NULL, '2025-01-05 15:12:08'),
(57, 29, 212, 'asdasdasd', NULL, '2025-01-05 15:13:52'),
(58, 29, 212, 'asasd', NULL, '2025-01-05 15:37:09'),
(59, 32, 120, 'hapy', NULL, '2025-01-05 16:57:13'),
(60, 32, 120, 'dfd', NULL, '2025-01-05 16:57:25'),
(61, 32, 120, 'sfsdf', NULL, '2025-01-05 16:57:26'),
(62, 32, 120, 'dffds', NULL, '2025-01-05 16:57:27'),
(63, 32, 120, 'efsds', NULL, '2025-01-05 16:57:28'),
(64, 32, 120, 'sdsv', NULL, '2025-01-05 16:57:28'),
(65, 32, 120, 'dfs4', NULL, '2025-01-05 16:57:51'),
(66, 32, 120, 'aaedsf', NULL, '2025-01-05 16:58:28'),
(67, 29, 55, 'ewrwer', NULL, '2025-01-05 17:40:14'),
(68, 29, 55, 'fdsfsd', NULL, '2025-01-05 17:40:15'),
(69, 29, 55, 'df', NULL, '2025-01-05 17:40:16'),
(70, 32, 57, 'sdfdsf', NULL, '2025-01-05 19:54:21'),
(71, 29, 120, 'asdsadsad', NULL, '2025-01-06 03:28:41'),
(73, 32, 55, 'asdasdasdsd', NULL, '2025-01-06 07:47:57'),
(74, 29, 306, 'bbb', NULL, '2025-01-06 10:32:57');

-- --------------------------------------------------------

--
-- Table structure for table `comment_reports`
--

CREATE TABLE `comment_reports` (
  `reportcommentID` int(11) NOT NULL,
  `commentID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `otherText` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAddress` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_reports`
--

INSERT INTO `comment_reports` (`reportcommentID`, `commentID`, `userID`, `entryID`, `reason`, `otherText`, `created_at`, `isAddress`) VALUES
(5, 26, 32, 57, 'Bullying', NULL, '2024-11-20 15:51:40', 0),
(6, 34, 29, 57, 'Bullying', NULL, '2024-11-25 17:40:07', 1),
(9, 34, 29, 57, 'Harmful', NULL, '2024-11-25 18:00:46', 1),
(10, 41, 54, 213, 'Violent', NULL, '2024-12-26 14:32:26', 0);

-- --------------------------------------------------------

--
-- Table structure for table `diary_entries`
--

CREATE TABLE `diary_entries` (
  `entryID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `visibility` enum('public','private') NOT NULL,
  `anonimity` enum('private','public') NOT NULL,
  `diary_image` varchar(255) DEFAULT NULL,
  `gadifyCount` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `subjects` text DEFAULT NULL,
  `containsAlarmingWords` tinyint(1) DEFAULT 0,
  `engagementCount` int(11) DEFAULT 0,
  `scheduledDate` datetime DEFAULT NULL,
  `isScheduled` tinyint(1) DEFAULT 0,
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diary_entries`
--

INSERT INTO `diary_entries` (`entryID`, `userID`, `title`, `description`, `visibility`, `anonimity`, `diary_image`, `gadifyCount`, `created_at`, `subjects`, `containsAlarmingWords`, `engagementCount`, `scheduledDate`, `isScheduled`, `updated_at`) VALUES
(55, 30, 'Domestic', 'Abuse', 'public', 'public', '/uploads/1729670985596.png', 2, '2024-10-23 08:09:45', 'Abuse', 0, 10, NULL, 0, '2025-01-06 15:47:57'),
(57, 31, 'Sexual', 'Harassment', 'public', 'public', '/uploads/1729671217900.gif', 3, '2024-10-23 08:13:38', 'Harrassment', 0, 4, NULL, 0, '2025-01-06 03:54:21'),
(118, 29, '54 Years of Cavite State University - CCAT!', '54 Years of Cavite State University - CCAT!\r\nCelebrate the CvSU Values Center - Truth, Excellence, and Service - as we mark our 54th anniversary! With a theme of \"Pagkakaisa Para sa Patuloy na Pag-Angat ng Sistema ng Kalidad sa Pamamahala ng Edukasyon!\"\r\nJoin us for a special celebration on August 7th and 8th, 2024, with all teachers and staff! Two days of joyful service!\r\nBe part of our first Medical Mission, starting at 8 am on August 7th, 2024, at CvSU-CCAT Covered Court 2. Doctors, nurses, and medical staff from Municipality of Rosario, Rotary Club of CEP, Integrated Philippine Association of Optometrists-Cavite Chapter, JNRAL Family Corporation Hospital, and the CvSU-CCAT Medical Unit will offer free medical and dental services, along with medicines and vitamins.\r\nThis event is open to all teachers, employees, their families, retired staff, concessionaires, midyear students, and registered residents of CvSU-CCAT Road.\r\nCome and take care of your health for a great and brilliant life and service!', 'public', 'public', '/uploads/1731247093740.jpg', 2, '2024-11-10 13:58:13', NULL, 0, 2, NULL, 0, '2025-01-06 11:28:34'),
(119, 29, '𝐀𝐓𝐓𝐄𝐍𝐓𝐈𝐎𝐍 𝐓𝐎 𝐎𝐔𝐑 𝐒𝐓𝐔𝐃𝐄𝐍𝐓 𝐑𝐄𝐒𝐄𝐀𝐑𝐂𝐇𝐄𝐑𝐒!', '𝐀𝐓𝐓𝐄𝐍𝐓𝐈𝐎𝐍 𝐓𝐎 𝐎𝐔𝐑 𝐒𝐓𝐔𝐃𝐄𝐍𝐓 𝐑𝐄𝐒𝐄𝐀𝐑𝐂𝐇𝐄𝐑𝐒!\r\nWe would like to announce this collaborative project of CvSU CCAT - Research and Extension Unit and CvSU - CCAT Gender and Development as part of the celebration of Womens Month this coming March 2024.\r\n𝐆𝐀𝐃 - 𝐑𝐞𝐬𝐩𝐨𝐧𝐬𝐢𝐯𝐞 𝐑𝐞𝐬𝐞𝐚𝐫𝐜𝐡 𝐁𝐨𝐨𝐭𝐜𝐚𝐦𝐩 𝐨𝐧 𝐌𝐚𝐫𝐜𝐡 𝟏𝟐-𝟏𝟒, 𝟐𝟎𝟐𝟒.\r\nSee details below or you may contact your respective unit research coordinators for more information.\r\nPlease be guided accordingly. \r\nWe are looking forward to your participation, see you!', 'public', 'public', '/uploads/1731247143566.jpg', 2, '2024-11-10 13:59:03', NULL, 0, 1, NULL, 0, '2025-01-02 13:39:04'),
(120, 29, 'I AM A WOMAN, OF COURSE.... ', 'I AM A WOMAN, OF COURSE.... \r\nLet\'s talk what it means to be a woman as we begin National Women\'s Month. Let\'s honor Juanas\' amazing strength by breaking stereotypes.', 'public', 'public', '/uploads/1731247209009.jpg', 3, '2024-11-10 14:00:09', NULL, 0, 25, NULL, 0, '2025-01-06 18:22:30'),
(305, 32, 'Dreams Turned Nightmares', 'I used to enjoy dreaming about my future, but now it feels like a nightmare. Every day is a battle, and I don’t know how much longer I can fight.', 'public', 'private', '/uploads/user_diary_images/1736151382589.jpg', 0, '2025-01-06 08:16:22', 'Harassments', 0, 0, NULL, 0, '2025-01-06 16:16:22'),
(306, 32, 'Alone in the Crowd', 'Even when surrounded by people, I feel invisible. I tried to talk to someone today, but they just laughed at me. I feel so alone.', 'public', 'private', '/uploads/user_diary_images/1736151444201.png', 0, '2025-01-06 08:17:24', 'Domestic Violence', 0, 5, NULL, 0, '2025-01-06 18:32:57'),
(307, 32, 'The Fight in the Cafeteria', 'I can’t stop thinking about the mean comments people make about me online. They tell me to hurt myself, and sometimes I feel like they’re right.', 'public', 'public', '/uploads/user_diary_images/1736151507496.png', 0, '2025-01-06 08:18:27', 'Bullying', 0, 0, NULL, 0, '2025-01-06 16:18:27'),
(308, 30, 'The Pressure is Too Much', 'Everyone expects me to do so well in school, but I can’t keep up. Sometimes I feel like the only way out is to quit everything forever.', 'public', 'private', '/uploads/user_diary_images/1736151625077.png', 0, '2025-01-06 08:20:25', 'Domestic Violence', 0, 0, NULL, 0, '2025-01-06 16:20:25'),
(309, 30, 'A Secret I Can’t Share', 'Something bad happened with someone I trusted. I feel ashamed and don’t know who to tell. It’s eating me up inside.', 'public', 'public', '/uploads/user_diary_images/1736151691741.jpg', 0, '2025-01-06 08:21:31', 'Harassments', 0, 2, NULL, 0, '2025-01-06 16:48:09'),
(310, 30, 'The Unspoken Words', 'I heard some classmates talking about me again. They said horrible things. I feel so angry and sad. Sometimes I think of ways to make it all stop.', 'public', 'private', '/uploads/user_diary_images/1736151748348.png', 0, '2025-01-06 08:22:28', 'Harassments', 0, 0, NULL, 0, '2025-01-06 16:22:28'),
(311, 30, 'Feeling Helpless', 'No matter what I do, I can’t make my grades better. My teacher yelled at me in front of everyone today. I feel like a failure and don’t see the point of trying anymore', 'public', 'private', '', 0, '2025-01-06 08:23:00', 'Harassments', 0, 0, NULL, 0, '2025-01-06 16:23:00'),
(312, 53, 'The Incident After Class', 'After class, someone pushed me in the hallway. They said I should just leave the school. I feel so humiliated and scared to come back tomorrow.', 'public', 'private', '/uploads/user_diary_images/1736151925612.jpg', 0, '2025-01-06 08:25:25', 'Domestic Violence', 0, 0, NULL, 0, '2025-01-06 16:25:25'),
(313, 53, 'A Tough Day at School', 'Today felt unbearable. I was bullied again, and they wouldn’t stop calling me names. It makes me feel worthless. Sometimes I wonder if anyone would even notice if I disappeared.', 'public', 'private', '/uploads/user_diary_images/1736151965761.jpg', 0, '2025-01-06 08:26:05', NULL, 0, 0, NULL, 0, '2025-01-06 16:26:05'),
(314, 53, 'A Mistake I Learned From', ' Share a mistake you made and the lesson you learned from it. Reflect on how it changed your behavior or perspective.', 'public', 'private', '/uploads/user_diary_images/1736152016836.jpg', 0, '2025-01-06 08:26:56', NULL, 0, 0, NULL, 0, '2025-01-06 16:26:56'),
(315, 53, 'A School Event I Will Never Forget', 'Narrate an event at school that left a lasting memory, such as a sports day, cultural festival, or debate competition', 'public', 'public', '', 0, '2025-01-06 08:27:35', 'Harassments', 0, 0, NULL, 0, '2025-01-06 16:27:35'),
(318, 54, 'My Favorite Book', 'Write about a book that left a strong impression on you. Discuss the plot, characters, and why it resonated with you.', 'public', 'private', '/uploads/user_diary_images/1736152167335.jpg', 0, '2025-01-06 08:29:27', NULL, 0, 0, NULL, 0, '2025-01-06 16:29:27'),
(319, 54, 'The Day I Helped Someone', 'Reflect on a time you helped someone in need. Write about the situation, how you felt, and how it impacted the other person.', 'public', 'public', '', 0, '2025-01-06 08:29:45', NULL, 0, 0, NULL, 0, '2025-01-06 16:29:45'),
(320, 54, 'My Future Dreams', 'Write about your ambitions and what you aspire to achieve in the future. Discuss your motivation and plans to reach your goals.', 'public', 'private', '/uploads/user_diary_images/1736152222842.jpg', 1, '2025-01-06 08:30:22', NULL, 0, 0, NULL, 0, '2025-01-06 18:33:32'),
(321, 29, 'Legitimo', 'Alla', 'public', 'public', '', 0, '2025-01-06 08:46:46', NULL, 0, 0, '2025-01-07 01:00:00', 1, '2025-01-06 16:46:46'),
(323, 29, 'Legit Check try', 'try test \r\n', 'public', 'public', '', 0, '2025-01-06 10:21:31', NULL, 0, 0, '2025-01-07 02:30:00', 1, '2025-01-06 18:21:31'),
(324, 29, 'try try', 'legit check', 'public', 'public', '', 0, '2025-01-06 10:28:42', NULL, 0, 0, '2025-01-07 02:30:00', 1, '2025-01-06 18:28:42');

-- --------------------------------------------------------

--
-- Table structure for table `engagement`
--

CREATE TABLE `engagement` (
  `engagementID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `type` enum('view','like','comment','flag') NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `faqID` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`faqID`, `question`, `answer`, `count`) VALUES
(1, 'What causes gender-based crimes?', 'Gender-based crimes are often caused by:  Deeply rooted gender inequalities Societal norms that normalize violence or discrimination Power imbalances in relationships and institutions Lack of education or awareness about gender rights Weak enforcement of laws protecting victims', 0),
(2, ' Who are the most common victims of gender-based crimes?', 'While anyone can be a victim of gender-based crimes, the majority of victims are women, girls, and members of the LGBTQ+ community. Men can also be victims, particularly in cases of domestic violence or sexual assault, though these cases are often underreported.', 0),
(3, 'What are gender-based crimes?', 'Gender-based crimes are crimes committed against individuals based on their gender or gender identity. These crimes are often rooted in systemic inequalities, discrimination, and gender stereotypes. Examples include domestic violence, sexual harassment, rape, human trafficking, honor killings, and female genital mutilation (FGM).', 0);

-- --------------------------------------------------------

--
-- Table structure for table `filter_subjects`
--

CREATE TABLE `filter_subjects` (
  `subjectID` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `count` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `filter_subjects`
--

INSERT INTO `filter_subjects` (`subjectID`, `subject`, `count`) VALUES
(7, 'Harassments', 8),
(8, 'Abuse', 4),
(9, 'Bullying', 1),
(13, 'Domestic Violence', 3);

-- --------------------------------------------------------

--
-- Table structure for table `flagged_reports`
--

CREATE TABLE `flagged_reports` (
  `report_id` int(20) NOT NULL,
  `reasons` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `other_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `userID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `isAddress` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flagged_reports`
--

INSERT INTO `flagged_reports` (`report_id`, `reasons`, `other_text`, `created_at`, `userID`, `entryID`, `isAddress`) VALUES
(5, 'Harassment', NULL, '2024-11-19 15:50:15', 30, 55, 1),
(6, 'Abuse', NULL, '2024-11-25 10:43:49', 31, 57, 1),
(11, 'Harmful', NULL, '2024-11-28 11:50:33', 30, 55, 0),
(12, 'Harassment', NULL, '2024-12-04 16:22:22', 54, 213, 0),
(13, 'Inappropriate', NULL, '2024-12-08 14:40:06', 54, 213, 0),
(14, 'Inappropriate, Harmful', NULL, '2024-12-08 14:40:12', 54, 213, 0),
(15, 'Bullying', NULL, '2024-12-26 14:25:38', 54, 213, 0),
(16, 'Harassment', NULL, '2024-12-28 15:46:24', 53, 212, 0),
(17, 'Inappropriate', NULL, '2025-01-02 05:57:27', 54, 213, 0);

-- --------------------------------------------------------

--
-- Table structure for table `flagging_options`
--

CREATE TABLE `flagging_options` (
  `flagID` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `flagging_options`
--

INSERT INTO `flagging_options` (`flagID`, `reason`, `count`) VALUES
(3, 'Harassment', 4),
(9, 'Bullying', 2),
(10, 'Abuse', 1),
(11, 'Harmful', 2),
(12, 'Inappropriate Content', 3);

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userID` int(11) NOT NULL,
  `followedUserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userID`, `followedUserID`) VALUES
(30, 31),
(30, 32),
(30, 53),
(30, 54),
(32, 30),
(32, 53),
(32, 54),
(53, 30),
(56, 29),
(56, 32);

-- --------------------------------------------------------

--
-- Table structure for table `gadify_actions`
--

CREATE TABLE `gadify_actions` (
  `gadifyID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `entryID` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `action_taken` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gadify_actions`
--

INSERT INTO `gadify_actions` (`gadifyID`, `userID`, `entryID`, `created_at`, `action_taken`) VALUES
(58, 32, 55, '2024-10-23 08:09:59', NULL),
(77, 31, 57, '2024-10-31 08:54:52', NULL),
(114, 53, 120, '2024-11-28 16:20:58', NULL),
(115, 32, 57, '2024-12-04 15:48:10', NULL),
(119, 32, 118, '2024-12-12 16:57:51', NULL),
(121, 32, 119, '2024-12-28 15:32:23', NULL),
(127, 29, 119, '2024-12-28 16:26:42', NULL),
(144, 29, 57, '2025-01-02 06:06:23', NULL),
(146, 29, 120, '2025-01-05 09:23:58', NULL),
(155, 29, 118, '2025-01-05 19:16:16', NULL),
(156, 30, 55, '2025-01-06 07:36:12', NULL),
(157, 32, 120, '2025-01-06 10:22:30', NULL),
(158, 29, 320, '2025-01-06 10:33:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `gender_based_crime_reports`
--

CREATE TABLE `gender_based_crime_reports` (
  `reportID` int(11) NOT NULL,
  `victimName` varchar(255) NOT NULL,
  `perpetratorName` varchar(255) NOT NULL,
  `contactInfo` varchar(255) NOT NULL,
  `gender` enum('male','female','non-binary','prefer-not-to-say') NOT NULL,
  `incidentDescription` text NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `supportingDocuments` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `subjects` varchar(255) DEFAULT NULL,
  `isAddress` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gender_based_crime_reports`
--

INSERT INTO `gender_based_crime_reports` (`reportID`, `victimName`, `perpetratorName`, `contactInfo`, `gender`, `incidentDescription`, `location`, `date`, `supportingDocuments`, `created_at`, `subjects`, `isAddress`) VALUES
(30, 'er', 'rerer', 'rr', 'male', 'rer', 'errere', '2024-12-03', '[\"/uploads/1733926308716.png\"]', '2024-12-11 14:11:48', 'Harassments', 1),
(32, 'asd', 'idk', '1342', 'male', 'asdasd', 'asdasdqw', '2019-03-14', '[\"/uploads/gender_based_incidents/1736098450769.png\",\"/uploads/gender_based_incidents/1736098450772.png\",\"/uploads/gender_based_incidents/1736098450773.png\"]', '2025-01-05 17:34:10', 'Harassments, Abuse, Bullying', 0);

-- --------------------------------------------------------

--
-- Table structure for table `index_images`
--

CREATE TABLE `index_images` (
  `index_imagesID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `index_images`
--

INSERT INTO `index_images` (`index_imagesID`, `title`, `description`, `image_path`, `created_at`) VALUES
(7, 'GENDER AND DEVELOPMENT', 'CvSU - CCAT Gender and Development', '/uploads/1735041914933.jpg', '2024-12-24 12:05:14'),
(8, 'Medical Mission', 'CvSU Medical Mission', '/uploads/1736151260224.jpg', '2025-01-06 08:14:20'),
(9, 'Kimi no Nawa', 'What\'s your name?', '/uploads/1736151289588.jpg', '2025-01-06 08:14:49');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `messageID` int(11) NOT NULL,
  `senderID` int(11) NOT NULL,
  `recipientID` int(11) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAdmin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`messageID`, `senderID`, `recipientID`, `message`, `created_at`, `isAdmin`) VALUES
(120, 29, 30, 'asd', '2024-11-17 16:33:46', 1),
(121, 29, 30, 'a', '2024-11-17 16:34:32', 1),
(122, 31, 29, 'Bat nawala', '2024-11-25 10:46:13', 1),
(123, 29, 30, 'a', '2024-11-25 10:47:54', 1),
(124, 29, 30, 'a', '2025-01-02 06:12:11', 1),
(125, 29, 30, 'a', '2025-01-02 06:14:39', 1),
(126, 29, 30, 'a', '2025-01-02 06:14:46', 1),
(127, 29, 30, 'a', '2025-01-02 06:16:53', 1),
(128, 29, 30, 'a', '2025-01-02 06:17:18', 1),
(129, 29, 30, 'a', '2025-01-02 06:18:12', 1),
(130, 29, 30, 'a', '2025-01-02 06:19:00', 1),
(131, 29, 30, 'asdasd', '2025-01-05 05:17:30', 1),
(132, 29, 53, 'sadsadsad', '2025-01-05 10:10:54', 1),
(133, 29, 53, 'asdasdasd', '2025-01-05 10:47:17', 1),
(134, 32, 29, 'Hello po', '2025-01-05 14:36:56', 1),
(135, 32, 29, 'sadasd', '2025-01-06 03:28:11', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notificationID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `actorID` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `entryID` int(11) DEFAULT NULL,
  `type` enum('gadify','follow','unfollow','comment') NOT NULL,
  `timestamp` datetime DEFAULT current_timestamp(),
  `profile_image` varchar(255) NOT NULL,
  `read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notificationID`, `userID`, `actorID`, `message`, `entryID`, `type`, `timestamp`, `profile_image`, `read`) VALUES
(138, 29, 53, 'A diary entry containing alarming words has been posted by user John Mark', 228, '', '2024-11-30 01:03:54', '/uploads/1732808670909.png', 1),
(139, 29, 53, 'A diary entry containing alarming words has been posted by user John Mark', 241, '', '2024-11-30 01:15:04', '/uploads/1732808670909.png', 1),
(140, 31, 29, 'Jambik commented on your diary entry.', 57, 'comment', '2024-12-02 21:33:26', '/uploads/1731247253324.jpg', 1),
(141, 31, 32, 'Jem gadified your diary entry.', 57, 'gadify', '2024-12-04 23:48:10', '/uploads/1732703754020.jpg', 1),
(142, 54, 32, 'Jem gadified your diary entry.', 213, 'gadify', '2024-12-08 22:31:01', '/uploads/1732703754020.jpg', 0),
(143, 54, 32, 'Jem gadified your diary entry.', 213, 'gadify', '2024-12-08 22:31:15', '/uploads/1732703754020.jpg', 0),
(144, 54, 32, 'Jem gadified your diary entry.', 213, 'gadify', '2024-12-08 22:32:02', '/uploads/1732703754020.jpg', 0),
(145, 54, 32, 'Jem commented on your diary entry.', 213, 'comment', '2024-12-08 22:38:14', '/uploads/1732703754020.jpg', 0),
(146, 54, 54, 'Erik has followed you.', NULL, 'follow', '2024-12-11 22:36:20', '/uploads/1732723623376.jpg', 0),
(147, 54, 31, 'Vic has followed you.', NULL, 'follow', '2024-12-11 22:45:51', '/uploads/1729678765054.jpg', 0),
(158, 54, 32, 'Jem has followed you.', NULL, 'follow', '2024-12-12 23:11:55', '/uploads/1732723623376.jpg', 0),
(159, 54, 32, 'Jem has followed you.', NULL, 'follow', '2024-12-13 00:48:31', '/uploads/1732723623376.jpg', 0),
(160, 54, 32, 'Jem has followed you.', NULL, 'follow', '2024-12-13 00:48:43', '/uploads/1732703754020.jpg', 0),
(161, 54, 32, 'Jem has followed you.', NULL, 'follow', '2024-12-13 00:52:02', '/uploads/1732703754020.jpg', 0),
(162, 54, 32, 'Jem has followed you.', NULL, 'follow', '2024-12-13 00:54:30', '/uploads/1732703754020.jpg', 0),
(163, 29, 32, 'Jem gadified your diary entry.', 118, 'gadify', '2024-12-13 00:57:51', '/uploads/1732703754020.jpg', 1),
(164, 54, 29, 'Jambik has followed you.', NULL, 'follow', '2024-12-17 21:48:55', '/uploads/1731247253324.jpg', 1),
(165, 29, 32, 'Jem gadified your diary entry.', 120, 'gadify', '2024-12-28 23:32:19', '/uploads/1732703754020.jpg', 1),
(166, 29, 32, 'Jem commented on your diary entry.', 120, 'comment', '2024-12-28 23:32:21', '/uploads/1732703754020.jpg', 1),
(167, 29, 32, 'Jem gadified your diary entry.', 119, 'gadify', '2024-12-28 23:32:23', '/uploads/1732703754020.jpg', 1),
(168, 29, 32, 'Jem commented on your diary entry.', 119, 'comment', '2024-12-28 23:32:25', '/uploads/1732703754020.jpg', 1),
(169, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2024-12-28 23:45:40', '/uploads/1731247253324.jpg', 1),
(170, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2024-12-28 23:45:55', '/uploads/1731247253324.jpg', 1),
(171, 53, 29, 'Jambik commented on your diary entry.', 212, 'comment', '2024-12-28 23:46:04', '/uploads/1731247253324.jpg', 1),
(172, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2024-12-29 00:25:07', '/uploads/1731247253324.jpg', 1),
(173, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2024-12-29 00:26:29', '/uploads/1731247253324.jpg', 1),
(174, 54, 29, 'Jambik gadified your diary entry.', 213, 'gadify', '2024-12-29 00:29:26', '/uploads/1731247253324.jpg', 0),
(175, 30, 29, 'Jambik gadified your diary entry.', 55, 'gadify', '2024-12-29 00:29:52', '/uploads/1731247253324.jpg', 0),
(176, 54, 29, 'Jambik commented on your diary entry.', 213, 'comment', '2024-12-29 00:30:28', '/uploads/1731247253324.jpg', 0),
(177, 54, 29, 'Jambik commented on your diary entry.', 213, 'comment', '2024-12-29 00:30:30', '/uploads/1731247253324.jpg', 0),
(178, 54, 29, 'Jambik commented on your diary entry.', 213, 'comment', '2024-12-29 00:30:39', '/uploads/1731247253324.jpg', 0),
(179, 54, 29, 'Jambik commented on your diary entry.', 213, 'comment', '2024-12-29 00:32:59', '/uploads/1731247253324.jpg', 0),
(180, 31, 29, 'Jambik gadified your diary entry.', 57, 'gadify', '2024-12-30 19:53:26', '/uploads/1731247253324.jpg', 1),
(181, 54, 32, 'Jem gadified your diary entry.', 213, 'gadify', '2024-12-30 22:13:08', '/uploads/1732703754020.jpg', 0),
(182, 54, 31, 'Vic gadified your diary entry.', 213, 'gadify', '2024-12-30 22:15:33', '/uploads/profile_pictures/1735564058601.png', 0),
(183, 54, 32, 'Jem gadified your diary entry.', 213, 'gadify', '2024-12-30 22:16:55', '/uploads/1732703754020.jpg', 0),
(184, 53, 32, 'Jem gadified your diary entry.', 212, 'gadify', '2024-12-30 22:17:03', '/uploads/1732703754020.jpg', 0),
(185, 32, 53, 'jm gadified your diary entry.', 299, 'gadify', '2024-12-30 22:18:18', '/uploads/profile_pictures/1735564103823.jpg', 1),
(186, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2025-01-02 13:42:32', '/uploads/1731247253324.jpg', 0),
(187, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2025-01-02 13:43:08', '/uploads/1731247253324.jpg', 0),
(188, 53, 29, 'Jambik commented on your diary entry.', 212, 'comment', '2025-01-02 13:44:39', '/uploads/1731247253324.jpg', 0),
(189, 53, 29, 'Jambik commented on your diary entry.', 212, 'comment', '2025-01-02 13:46:07', '/uploads/1731247253324.jpg', 0),
(190, 54, 29, 'Jambik gadified your diary entry.', 213, 'gadify', '2025-01-02 13:58:19', '/uploads/1731247253324.jpg', 0),
(191, 54, 29, 'Jambik gadified your diary entry.', 213, 'gadify', '2025-01-02 13:59:13', '/uploads/1731247253324.jpg', 0),
(192, 54, 29, 'Jambik gadified your diary entry.', 213, 'gadify', '2025-01-02 13:59:25', '/uploads/1731247253324.jpg', 0),
(193, 53, 29, 'Jambik gadified your diary entry.', 212, 'gadify', '2025-01-02 14:03:38', '/uploads/1731247253324.jpg', 0),
(194, 31, 29, 'Jambik gadified your diary entry.', 57, 'gadify', '2025-01-02 14:06:23', '/uploads/1731247253324.jpg', 0),
(195, 31, 32, 'Jem has followed you.', NULL, 'follow', '2025-01-05 12:49:17', '/uploads/1732703754020.jpg', 0),
(196, 32, 29, 'Jambik gadified your diary entry.', 300, 'gadify', '2025-01-05 17:23:55', '/uploads/1731247253324.jpg', 1),
(197, 53, 32, 'Hatdog has followed you.', NULL, 'follow', '2025-01-05 22:49:13', '/uploads/1732703754020.jpg', 0),
(198, 32, 29, 'Jambik commented on your diary entry.', 300, 'comment', '2025-01-05 23:05:03', '/uploads/1731247253324.jpg', 1),
(199, 53, 29, 'Jambik commented on your diary entry.', 212, 'comment', '2025-01-05 23:13:52', '/uploads/1731247253324.jpg', 0),
(200, 29, 32, 'A diary entry containing alarming words has been posted by user Jem', 303, '', '2025-01-05 23:20:05', '/uploads/1732703754020.jpg', 1),
(201, 53, 29, 'Jambik commented on your diary entry.', 212, 'comment', '2025-01-05 23:37:09', '/uploads/1731247253324.jpg', 0),
(202, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:14', '/uploads/1732703754020.jpg', 1),
(203, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:25', '/uploads/1732703754020.jpg', 1),
(204, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:26', '/uploads/1732703754020.jpg', 1),
(205, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:27', '/uploads/1732703754020.jpg', 1),
(206, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:28', '/uploads/1732703754020.jpg', 1),
(207, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:28', '/uploads/1732703754020.jpg', 1),
(208, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:57:52', '/uploads/1732703754020.jpg', 1),
(209, 29, 32, 'Hatdog commented on your diary entry.', 120, 'comment', '2025-01-06 00:58:28', '/uploads/1732703754020.jpg', 1),
(210, 30, 29, 'Jambik commented on your diary entry.', 55, 'comment', '2025-01-06 01:40:14', '/uploads/1731247253324.jpg', 0),
(211, 30, 29, 'Jambik commented on your diary entry.', 55, 'comment', '2025-01-06 01:40:15', '/uploads/1731247253324.jpg', 0),
(212, 30, 29, 'Jambik commented on your diary entry.', 55, 'comment', '2025-01-06 01:40:16', '/uploads/1731247253324.jpg', 0),
(213, 31, 32, 'Hatdog commented on your diary entry.', 57, 'comment', '2025-01-06 03:54:21', '/uploads/1732703754020.jpg', 0),
(214, 30, 32, 'Hatdog commented on your diary entry.', 55, 'comment', '2025-01-06 15:45:50', '/uploads/1732703754020.jpg', 0),
(215, 30, 32, 'Hatdog commented on your diary entry.', 55, 'comment', '2025-01-06 15:47:57', '/uploads/1732703754020.jpg', 0),
(216, 53, 30, 'Dave has followed you.', NULL, 'follow', '2025-01-06 16:19:23', '/uploads/1727718033919.png', 0),
(217, 54, 30, 'Dave has followed you.', NULL, 'follow', '2025-01-06 16:19:30', '/uploads/1727718033919.png', 0),
(218, 30, 53, 'jm has followed you.', NULL, 'follow', '2025-01-06 16:25:29', '/uploads/profile_pictures/1735564103823.jpg', 0),
(219, 30, 32, 'Hatdog has followed you.', NULL, 'follow', '2025-01-06 16:35:57', '/uploads/1732703754020.jpg', 0),
(220, 29, 32, 'Hatdog gadified your diary entry.', 120, 'gadify', '2025-01-06 18:22:30', '/uploads/1732703754020.jpg', 0),
(221, 32, 29, 'Jambik commented on your diary entry.', 306, 'comment', '2025-01-06 18:32:57', '/uploads/1731247253324.jpg', 0),
(222, 54, 29, 'Jambik gadified your diary entry.', 320, 'gadify', '2025-01-06 18:33:32', '/uploads/1731247253324.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reported_users`
--

CREATE TABLE `reported_users` (
  `reportedUsersID` int(11) NOT NULL,
  `userID` int(11) DEFAULT NULL,
  `reportedUserID` int(11) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAddress` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reported_users`
--

INSERT INTO `reported_users` (`reportedUsersID`, `userID`, `reportedUserID`, `reason`, `created_at`, `isAddress`) VALUES
(1, 32, 54, 'Harmful', '2024-12-12 15:37:47', 1),
(2, 32, 53, 'Try', '2024-12-12 17:13:09', 0),
(3, 32, 53, 'Harmful', '2024-12-12 17:26:09', 0),
(4, 54, 54, 'Try', '2024-12-26 12:52:19', 0),
(5, 54, 54, 'Harmful', '2024-12-26 12:52:32', 0);

-- --------------------------------------------------------

--
-- Table structure for table `reporting_users`
--

CREATE TABLE `reporting_users` (
  `reportingUserID` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reporting_users`
--

INSERT INTO `reporting_users` (`reportingUserID`, `reason`, `count`) VALUES
(3, 'Harmful Comment', 3),
(4, 'Bullying', 2),
(5, 'Hate Speech', 0),
(6, 'Inappropriate Remarks', 0);

-- --------------------------------------------------------

--
-- Table structure for table `report_comments`
--

CREATE TABLE `report_comments` (
  `reportCommentID` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `count` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `report_comments`
--

INSERT INTO `report_comments` (`reportCommentID`, `reason`, `count`) VALUES
(4, 'Bullying', 0),
(5, 'Violent', 2),
(6, 'Insensitive Comment', 1),
(10, 'Hate Speech', 0);

-- --------------------------------------------------------

--
-- Table structure for table `suspensions`
--

CREATE TABLE `suspensions` (
  `suspensionID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `suspendUntil` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `suspensions`
--

INSERT INTO `suspensions` (`suspensionID`, `userID`, `reason`, `suspendUntil`, `created_at`) VALUES
(1, 54, 'Harmful', '2024-12-31 23:42:25', '2024-12-28 15:42:25'),
(2, 54, 'Harmful', '2025-01-05 13:50:57', '2025-01-02 05:50:58'),
(3, 29, '', '2025-01-08 15:01:24', '2025-01-05 07:01:24'),
(4, 31, 'Try', '2025-01-08 15:03:22', '2025-01-05 07:03:22'),
(5, 31, '', '2025-01-08 15:27:29', '2025-01-05 07:27:29'),
(6, 53, 'Harmful', '2025-01-09 00:19:42', '2025-01-05 16:19:42'),
(7, 53, '', '2025-01-09 00:56:14', '2025-01-05 16:56:14'),
(8, 30, '', '2025-01-09 18:11:08', '2025-01-06 10:11:08');

-- --------------------------------------------------------

--
-- Table structure for table `user_profiles`
--

CREATE TABLE `user_profiles` (
  `profileID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `bio` text DEFAULT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `followersCount` int(11) DEFAULT 0,
  `followingCount` int(11) DEFAULT 0,
  `profile_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_profiles`
--

INSERT INTO `user_profiles` (`profileID`, `userID`, `bio`, `alias`, `followersCount`, `followingCount`, `profile_image`) VALUES
(15, 29, 'Don\'t be afraid we  are here to HELP YOU! ', 'Admin', 2, 0, '/uploads/1731247253324.jpg'),
(16, 30, 'Alla', 'Kenken', 2, 5, '/uploads/1727718033919.png'),
(17, 31, 'Helloa', 'Pogi', 1, 0, '/uploads/profile_pictures/1735564058601.png'),
(18, 32, 'bat ka andito?', 'Medge', 3, 4, '/uploads/1732703754020.jpg'),
(32, 53, NULL, 'Waldo', 2, 1, '/uploads/profile_pictures/1735564103823.jpg'),
(33, 54, NULL, 'Jekjek', 10, 8, '/uploads/1732723623376.jpg'),
(35, 56, NULL, 'MEJ', 0, 0, '');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `userID` int(11) NOT NULL,
  `isAdmin` int(10) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `cvsuEmail` varchar(100) NOT NULL,
  `studentNumber` int(9) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `verificationToken` varchar(255) DEFAULT NULL,
  `isVerified` tinyint(1) DEFAULT 0,
  `sex` varchar(10) NOT NULL,
  `course` varchar(50) NOT NULL,
  `year` varchar(10) NOT NULL,
  `isActive` tinyint(1) DEFAULT 0,
  `suspendReason` varchar(255) DEFAULT NULL,
  `suspendUntil` datetime DEFAULT NULL,
  `isSuspended` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`userID`, `isAdmin`, `firstName`, `lastName`, `cvsuEmail`, `studentNumber`, `username`, `password`, `created_at`, `verificationToken`, `isVerified`, `sex`, `course`, `year`, `isActive`, `suspendReason`, `suspendUntil`, `isSuspended`) VALUES
(29, 1, 'Gender and Development', '- GAD', 'johnvictor.silva@cvsu', 202110583, 'Jambik', '$2a$10$.Cf86hRiwOuYBJTPGctI1uGc/ScKj0ipLvOa5eTm5cB79BxSp6ugG', '2024-09-30 17:14:36', NULL, 0, '', '', '', 1, '', NULL, 0),
(30, 0, 'John Kenneth', 'Tan', 'johnkenneth.tan@yahoo.com', 1234567890, 'Dave', '$2a$10$YhIZgS.KpDiNV14dF0sPwuynVu/U/ob.jpbQvZMMU.5Ay3mIo6472', '2024-09-30 17:15:28', NULL, 0, 'Female', 'BS Information Technology', '3rd', 0, '', '2025-01-09 18:11:08', 1),
(31, 0, 'John Victor', 'Silva', 'johnvictor.silva@cvsu.edu', 2147483647, 'Vic', '$2a$10$UCP2K1MtvYhAiHE3qXiNaueL5PCE3IUZjLqwTLVOR/6K5YUH5qoHq', '2024-09-30 17:16:16', NULL, 0, 'Male', 'BS Industrial Technology', '4th', 0, '', NULL, 0),
(32, 0, 'Jem', 'Llanto', 'jemmari.llanto@cvsu.edu.ph', 2147483647, 'Hatdog', '$2a$10$fdCT1Z93eqfF3gbPtLXHGee1S18E7FeyIpTqPmrQRoUR1u9Pdfxoi', '2024-10-03 14:03:06', NULL, 0, 'Male', 'BS Information Technology', '2nd', 1, NULL, NULL, 0),
(53, 0, 'John Mark', 'Sallao', 'johnmark.sallao@cvsu.edu.ph', 202110575, 'jm', '$2a$10$3QYSYAQQ3QH1MYNk9G2N7umDkN7tQRPV5RUUd7Jnxzzks.kJkBklq', '2024-11-27 15:49:11', '4ee84fc0e5903eb7a239ef23b806f77123835527', 1, 'Prefer not', 'BS Computer Engineering', '1st', 0, '', NULL, 0),
(54, 0, 'Erik Carl', 'Rosete', 'erikcarl.rosete@cvsu.edu.ph', 202110573, 'Erik', '$2a$10$pgg2hiAM/DxUkP9IIR2nVeXnwCjTZs3v2T3717YcXhkKz9QJtcecC', '2024-11-27 16:06:04', '358eaee229fde2f99334b75d190909e5dc9b88dd', 1, 'Female', 'BS Computer Science', '2nd', 0, NULL, NULL, 0),
(56, 0, 'Jan Eraseo Mari', 'Llanto', 'janeraseomari.llanto@cvsu.edu.ph', 202010933, 'JemLlanto', '$2a$10$Ub1eqdmjf3WyDTHZkq4qLOJrZX31.a9or4NvmhZuwbv1SasSZ/402', '2025-01-05 06:04:35', '2bb693de9c44748a37f140662a6885813d301d8c', 1, 'Male', 'BS Information Technology', '4th', 0, NULL, NULL, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alarming_words`
--
ALTER TABLE `alarming_words`
  ADD PRIMARY KEY (`wordID`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`);

--
-- Indexes for table `comment_reports`
--
ALTER TABLE `comment_reports`
  ADD PRIMARY KEY (`reportcommentID`),
  ADD KEY `commentID` (`commentID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `diary_entries`
--
ALTER TABLE `diary_entries`
  ADD PRIMARY KEY (`entryID`);

--
-- Indexes for table `engagement`
--
ALTER TABLE `engagement`
  ADD PRIMARY KEY (`engagementID`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`faqID`);

--
-- Indexes for table `filter_subjects`
--
ALTER TABLE `filter_subjects`
  ADD PRIMARY KEY (`subjectID`);

--
-- Indexes for table `flagged_reports`
--
ALTER TABLE `flagged_reports`
  ADD PRIMARY KEY (`report_id`);

--
-- Indexes for table `flagging_options`
--
ALTER TABLE `flagging_options`
  ADD PRIMARY KEY (`flagID`);

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`userID`,`followedUserID`),
  ADD KEY `followedUserID` (`followedUserID`);

--
-- Indexes for table `gadify_actions`
--
ALTER TABLE `gadify_actions`
  ADD PRIMARY KEY (`gadifyID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `entryID` (`entryID`);

--
-- Indexes for table `gender_based_crime_reports`
--
ALTER TABLE `gender_based_crime_reports`
  ADD PRIMARY KEY (`reportID`);

--
-- Indexes for table `index_images`
--
ALTER TABLE `index_images`
  ADD PRIMARY KEY (`index_imagesID`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`messageID`),
  ADD KEY `senderID` (`senderID`),
  ADD KEY `recipientID` (`recipientID`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notificationID`),
  ADD KEY `userID` (`userID`),
  ADD KEY `actorID` (`actorID`);

--
-- Indexes for table `reported_users`
--
ALTER TABLE `reported_users`
  ADD PRIMARY KEY (`reportedUsersID`);

--
-- Indexes for table `reporting_users`
--
ALTER TABLE `reporting_users`
  ADD PRIMARY KEY (`reportingUserID`);

--
-- Indexes for table `report_comments`
--
ALTER TABLE `report_comments`
  ADD PRIMARY KEY (`reportCommentID`);

--
-- Indexes for table `suspensions`
--
ALTER TABLE `suspensions`
  ADD PRIMARY KEY (`suspensionID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD PRIMARY KEY (`profileID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alarming_words`
--
ALTER TABLE `alarming_words`
  MODIFY `wordID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `comment_reports`
--
ALTER TABLE `comment_reports`
  MODIFY `reportcommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `diary_entries`
--
ALTER TABLE `diary_entries`
  MODIFY `entryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=325;

--
-- AUTO_INCREMENT for table `engagement`
--
ALTER TABLE `engagement`
  MODIFY `engagementID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `faqID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `filter_subjects`
--
ALTER TABLE `filter_subjects`
  MODIFY `subjectID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `flagged_reports`
--
ALTER TABLE `flagged_reports`
  MODIFY `report_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `flagging_options`
--
ALTER TABLE `flagging_options`
  MODIFY `flagID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `gadify_actions`
--
ALTER TABLE `gadify_actions`
  MODIFY `gadifyID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `gender_based_crime_reports`
--
ALTER TABLE `gender_based_crime_reports`
  MODIFY `reportID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `index_images`
--
ALTER TABLE `index_images`
  MODIFY `index_imagesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `messageID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notificationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=223;

--
-- AUTO_INCREMENT for table `reported_users`
--
ALTER TABLE `reported_users`
  MODIFY `reportedUsersID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `reporting_users`
--
ALTER TABLE `reporting_users`
  MODIFY `reportingUserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `report_comments`
--
ALTER TABLE `report_comments`
  MODIFY `reportCommentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `suspensions`
--
ALTER TABLE `suspensions`
  MODIFY `suspensionID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_profiles`
--
ALTER TABLE `user_profiles`
  MODIFY `profileID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment_reports`
--
ALTER TABLE `comment_reports`
  ADD CONSTRAINT `comment_reports_ibfk_1` FOREIGN KEY (`commentID`) REFERENCES `comments` (`commentID`),
  ADD CONSTRAINT `comment_reports_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`);

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`),
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`followedUserID`) REFERENCES `user_table` (`userID`);

--
-- Constraints for table `gadify_actions`
--
ALTER TABLE `gadify_actions`
  ADD CONSTRAINT `gadify_actions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`) ON DELETE CASCADE,
  ADD CONSTRAINT `gadify_actions_ibfk_2` FOREIGN KEY (`entryID`) REFERENCES `diary_entries` (`entryID`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`senderID`) REFERENCES `user_table` (`userID`),
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`recipientID`) REFERENCES `user_table` (`userID`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`actorID`) REFERENCES `user_table` (`userID`);

--
-- Constraints for table `suspensions`
--
ALTER TABLE `suspensions`
  ADD CONSTRAINT `suspensions_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`);

--
-- Constraints for table `user_profiles`
--
ALTER TABLE `user_profiles`
  ADD CONSTRAINT `user_profiles_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user_table` (`userID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
