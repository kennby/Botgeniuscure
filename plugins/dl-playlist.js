import { youtubeSearch } from '@bochilteam/scraper'; // Consider using a more reliable ytdl-core alternative like ytdl-music-downloader
import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
  if (!text) throw `⚠️ Please provide a search term: *${usedPrefix}${command} <search term>*`;

  // Show searching indicator
  m.react('');

  try {
    // Perform YouTube search
    const result = await yts.search(text);
    const videos = result.videos;

    // Check for results
    if (videos.length === 0) {
      throw ` No search results found for: *${text}*`;
    }

    // Create list sections with improved formatting and placeholders
    const listSections = videos.map((video, index) => {
      const formattedDuration = convertDuration(video.timestamp); // Implement a function for duration formatting
      const formattedViews = formatNumber(video.views); // Implement a function for number formatting (optional)

      return [
        `${index + 1}┃ ${video.title}`,
        [
          [' MP3', `${usedPrefix}fgmp3 ${video.url}`, `
            ⌚ Duration: ${formattedDuration}
             Views: ${formattedViews}
             Title: ${video.title}
             Uploaded: ${video.ago}
          `],
          [
            ' MP4',
            `${usedPrefix}fgmp4 ${video.url}`,
            `
            ⌚ Duration: ${formattedDuration}
             Views: ${formattedViews}
             Title: ${video.title}
             Uploaded: ${video.ago}
          `],
        ],
      ];
    });

    // Send the list with proper title and subtitle
    await conn.sendList(m.chat, '  ≡ *FG MUSIC*', `\n  Search results for: *${text}*`, '', 'Click Here', listSections, m);
  } catch (error) {
    console.error(error);
    // Handle errors gracefully (e.g., send an error message to the user)
    await conn.reply(m.chat, `❌ An error occurred: ${error.message}`, m);
  }
};

// Helper functions (implement these based on your needs)
function convertDuration(duration) {
  // Implement logic to convert duration string to a more readable format (e.g., HH:MM:SS)
  return duration; // Replace with your implementation
}

function formatNumber(number) {
  // Implement logic to format numbers with commas or other separators (optional)
  return number; // Replace with your implementation
}

handler.help = ['play2'];
handler.tags = ['dl'];
handler.command = ['play2', 'playvid2', 'playlist', 'playlista'];
handler.disabled = false; // Enable the command by default

export default handler;
