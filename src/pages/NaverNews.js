import React, { useEffect, useState } from 'react';
import { fetchNaverEstateNews } from '../services/naverNewsService';
import { CircularProgress, List, ListItem, ListItemText, Typography, Link, Box } from '@mui/material';

const NaverNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      try {
        const data = await fetchNaverEstateNews();
        setNews(data);
      } catch (err) {
        setError('뉴스를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };
    getNews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">{error}</Typography>
    );
  }

  return (
    <Box maxWidth="md" mx="auto" mt={4}>
      <Typography variant="h5" gutterBottom>
        네이버 부동산 뉴스
      </Typography>
      <List>
        {news.map(item => (
          <ListItem key={item.id} alignItems="flex-start" divider>
            <ListItemText
              primary={
                <Link href={item.link} target="_blank" rel="noopener noreferrer" underline="hover">
                  {item.title}
                </Link>
              }
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary" display="block">
                    {item.pubDate} {item.publisher && `| ${item.publisher}`}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default NaverNews;