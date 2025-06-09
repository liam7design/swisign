import axios from 'axios';

const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;

export const fetchNaverEstateNews = async () => {
  try {
    const response = await axios.get(
      'https://openapi.naver.com/v1/search/news.json',
      {
        params: {
          query: '부동산',
          display: 20,
          start: 1,
          sort: 'date'
        },
        headers: {
          'X-Naver-Client-Id': NAVER_CLIENT_ID,
          'X-Naver-Client-Secret': NAVER_CLIENT_SECRET
        }
      }
    );

    return response.data.items.map((item, index) => ({
      id: index + 1,
      title: item.title.replace(/<[^>]+>/g, ''),
      link: item.link,
      originallink: item.originallink,
      pubDate: item.pubDate,
      description: item.description.replace(/<[^>]+>/g, ''),
      publisher: item.publisher || '',
    }));
  } catch (error) {
    console.error('네이버 뉴스 API 호출 중 오류 발생:', error);
    throw error;
  }
};