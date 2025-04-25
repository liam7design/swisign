import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ClampBox = styled(Box)(({ padding, backgroundcolor }) => ({
  overflow: 'hidden',
  padding: padding || '16px',
  fontSize: '0.875rem',
  lineHeight: 1.4,
  backgroundColor: backgroundcolor || 'rgba(16, 16, 16, 0.04)',
}));

const ExpandableBox = ({ 
  children, 
  height = 100,
  buttonText = { more: '더보기', less: '접기' },
  showIcons = true,
  padding,
  backgroundColor,
}) => {
  const boxRef = useRef(null);
  const [showButton, setShowButton] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      if (boxRef.current) {
        const currentHeight = boxRef.current.clientHeight;
        setShowButton(currentHeight >= height);
      }
    };
    checkHeight();
    window.addEventListener('resize', checkHeight);
    return () => window.removeEventListener('resize', checkHeight);
  }, [children, expanded, height]);

  return (
    <Box sx={{ position: 'relative' }}>
      <ClampBox
        ref={boxRef}
        sx={{ maxHeight: expanded ? 'none' : `${height}px`}}
        padding={padding}
        backgroundcolor={backgroundColor}
      >
        {children}
      </ClampBox>
      {showButton && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Button
            variant="text"
            color="primary"
            onClick={() => setExpanded(!expanded)}
            startIcon={showIcons && (expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
            fullWidth
            disableRipple
            sx={{ fontWeight: 500  }}
          >
            {expanded ? buttonText.less : buttonText.more}
          </Button>
        </Box>
      )}
    </Box>
  );
};

ExpandableBox.propTypes = {
  height: PropTypes.number,
  buttonText: PropTypes.shape({
    more: PropTypes.string,
    less: PropTypes.string
  }),
  animationDuration: PropTypes.number,
  showIcons: PropTypes.bool,
  padding: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default ExpandableBox;