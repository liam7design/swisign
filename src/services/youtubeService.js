import axios from 'axios';

const PLAYLIST_ID = 'PLVI3CAcQB7GM7pBqn8WYVkSKn2QfUbS2E';
const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const API_URL = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${PLAYLIST_ID}&maxResults=50&key=${API_KEY}`;

export const fetchYoutubeVideos = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.items.map((item, index) => ({
      id: index + 1,
      title: item.snippet.title,
      date: item.snippet.publishedAt.split('T')[0],
      views: 0,
      videoId: item.snippet.resourceId.videoId,
      content: item.snippet.title
    }));
  } catch (error) {
    console.error('YouTube API 호출 중 오류 발생:', error);
    throw error;
  }
}; 