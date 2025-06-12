import React, { useState } from 'react';
import { Card, CardContent, Checkbox, Button, FormControlLabel } from '@mui/material';

const AddressCard = ({ node, onNext }) => {
  const [selectedAddress, setSelectedAddress] = useState('');
  const [useSearch, setUseSearch] = useState(false);

  const handleNext = () => {
    if (useSearch) {
      onNext(node.nextId, '주소검색을 통해 입력할게요.');
    } else if (selectedAddress) {
      onNext('DETAIL_ADDRESS_INPUT', `${selectedAddress}을 선택할게요.`);
    }
  };

  return (
    <Card elevation={0} sx={{ backgroundColor: '#EFEFEF', borderRadius: '20px 20px 20px 5px', maxWidth: '280px', mb: 2 }}>
      <CardContent>
        {node.addresses?.map((address, index) => (
          <FormControlLabel
            key={index}
            control={
              <Checkbox
                checked={selectedAddress === address}
                onChange={(e) => e.target.checked && setSelectedAddress(address)}
              />
            }
            label={address}
            sx={{ display: 'block', mb: 1 }}
          />
        ))}
        {node.hasSearch && (
          <FormControlLabel
            control={
              <Checkbox
                checked={useSearch}
                onChange={(e) => setUseSearch(e.target.checked)}
              />
            }
            label="주소검색"
            sx={{ display: 'block', mb: 2 }}
          />
        )}
        <Button
          variant="contained"
          fullWidth
          onClick={handleNext}
          disabled={!selectedAddress && !useSearch}
          sx={{ backgroundColor: '#0A84FF', '&:hover': { backgroundColor: '#0070e0' } }}
        >
          다음
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddressCard;