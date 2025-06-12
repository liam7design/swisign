export const formatTimestamp = (timestamp, formatOption = '12h') => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  
  if (formatOption === '12h') {
    return date.toLocaleTimeString('ko-KR', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } else {
    return date.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  }
};