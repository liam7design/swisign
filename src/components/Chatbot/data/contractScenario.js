export const contractScenario = {
  START: {
    id: 'START',
    type: 'quick_reply',
    message: '안녕하세요 AI도미 입니다. 계약진행을 도와드릴까요?',
    replies: [
      { text: '아니오', nextId: 'END_DECLINE' },
      { text: '예', nextId: 'SELECT_CONTRACT_ROLE', autoText: '네, 계약 진행을 도와주세요.' }
    ]
  },

  SELECT_CONTRACT_ROLE: {
    id: 'SELECT_CONTRACT_ROLE',
    type: 'quick_reply',
    message: '계약서 작성에 필요한 정보입니다. 아래에서 선택해 주세요.',
    replies: [
      { text: '임차인', nextId: 'SELECT_CONTRACT_TYPE', autoText: '임차인으로 계약을 진행하고 싶어요.' },
      { text: '임대인', nextId: 'SELECT_CONTRACT_TYPE', autoText: '임대인으로 계약을 진행하고 싶어요.' },
      { text: '중개인', nextId: 'SELECT_CONTRACT_TYPE', autoText: '중개인으로 계약을 진행하고 싶어요.' }
    ]
  },

  SELECT_CONTRACT_TYPE: {
    id: 'SELECT_CONTRACT_TYPE',
    type: 'quick_reply',
    message: '계약서 종류를 선택해주세요.',
    replies: [
      { text: '매매', nextId: 'SELECT_ADDRESS_OPTION', autoText: '매매 계약으로 진행할게요.' },
      { text: '전세', nextId: 'SELECT_ADDRESS_OPTION', autoText: '전세 계약으로 진행할게요.' },
      { text: '월세', nextId: 'SELECT_ADDRESS_OPTION', autoText: '월세 계약으로 진행할게요.' }
    ]
  },

  SELECT_ADDRESS_OPTION: {
    id: 'SELECT_ADDRESS_OPTION',
    type: 'address_selection',
    message: '계약하실 주소를 선택해주세요.',
    addresses: ['(00000) 서울특별시 강남구 테헤란로 123'],
    hasSearch: true,
    nextId: 'SEARCH_ADDRESS_GUIDE'
  },

  SEARCH_ADDRESS_GUIDE: {
    id: 'SEARCH_ADDRESS_GUIDE',
    type: 'address_guide',
    message: '계약하실 주소를 아래 예시처럼 상세하게 입력해 주세요.',
    guide: {
      title: '주소 입력 안내',
      examples: [
        { label: '도로명+건물번호', example: '예시) 강남구 테헤란로 123' },
        { label: '건물명', example: '예시) 강남빌딩' },
        { label: '동/읍/리/번지', example: '예시) 강남동 123-45' }
      ]
    },
    nextId: 'ADDRESS_SEARCH_RESULTS'
  },

  ADDRESS_SEARCH_RESULTS: {
    id: 'ADDRESS_SEARCH_RESULTS',
    type: 'address_results',
    message: '입력하신 주소 목록이 검색되었어요. 계약하실 주소를 선택해 주세요.',
    searchResults: [
      '(00000) 서울특별시 강남구 테헤란로 123',
      '(00000) 서울특별시 강남구 테헤란로 456',
      '(00000) 서울특별시 강남구 테헤란로 789'
    ],
    nextId: 'DETAIL_ADDRESS_INPUT',
    reshearchId: 'SEARCH_ADDRESS_GUIDE'
  },

  DETAIL_ADDRESS_INPUT: {
    id: 'DETAIL_ADDRESS_INPUT',
    type: 'input_required',
    message: '상세 주소를 입력해 주세요.',
    placeholder: '예: 201호',
    nextId: 'CONFIRM_ADDRESS'
  },

  CONFIRM_ADDRESS: {
    id: 'CONFIRM_ADDRESS',
    type: 'address_confirm',
    message: '입력하신 주소를 확인해 주세요.',
    replies: [
      { text: '아니오', nextId: 'SEARCH_ADDRESS_GUIDE', autoText: '주소를 다시 입력하겠어요.' },
      { text: '예', nextId: 'SHOW_CONTRACT_FORM', autoText: '네, 맞아요.' }
    ]
  },

  SHOW_CONTRACT_FORM: {
    id: 'SHOW_CONTRACT_FORM',
    type: 'contract_form',
    message: '계약서 양식을 보여드릴께요. 확인해보시고 진행해 주세요.',
    formType: '주택임대차표준계약서',
    nextId: 'CONTRACT_INFO_INPUT'
  },

  CONTRACT_INFO_INPUT: {
    id: 'CONTRACT_INFO_INPUT',
    type: 'dialog_action',
    message: '계약서 내용을 확인하셨나요? 계약관련 기본정보를 입력해 주세요.',
    actionText: '정보입력',
    dialogType: 'contract_info',
    nextId: 'ASK_SPECIAL_TERMS',
    autoText: '계약정보 입력 완료'
  },

  ASK_SPECIAL_TERMS: {
    id: 'ASK_SPECIAL_TERMS',
    type: 'quick_reply',
    message: '계약서 기본작성이 완료되었습니다. 이제 특약사항을 작성할까요?',
    replies: [
      { text: '아니오', nextId: 'CONFIRMATION_DOCUMENT', autoText: '아니오, 특약사항은 작성하지 않을게요.' },
      { text: '예', nextId: 'SPECIAL_TERMS_INPUT', autoText: '네, 특약사항을 작성할게요.' }
    ]
  },

  SPECIAL_TERMS_INPUT: {
    id: 'SPECIAL_TERMS_INPUT',
    type: 'dialog_action',
    message: '특약사항을 보시고 선택해 주세요.',
    actionText: '특약사항',
    dialogType: 'special_terms',
    nextId: 'CONFIRMATION_DOCUMENT',
    autoText: '특약사항 선택 완료'
  },

  CONFIRMATION_DOCUMENT: {
    id: 'CONFIRMATION_DOCUMENT',
    type: 'dialog_action',
    message: '이제 중개대상물 확인서 작성만 남았습니다. 확인서를 작성해주세요.',
    actionText: '중개대상물 확인서 작성',
    dialogType: 'confirmation_document',
    nextId: 'ASK_PRINT_CONTRACT',
    autoText: '중개대상물 확인서 작성 완료',
    hasCancel: true
  },

  ASK_PRINT_CONTRACT: {
    id: 'ASK_PRINT_CONTRACT',
    type: 'quick_reply',
    message: '모든 계약 절차가 완료되었습니다. 계약서를 출력하시겠어요?',
    replies: [
      { text: '아니오', nextId: 'END_WITHOUT_PRINT', autoText: '아니오, 나중에 출력할게요.' },
      { text: '예', nextId: 'PRINT_COMPLETE', autoText: '네, 계약서를 출력할게요.' }
    ]
  },

  PRINT_COMPLETE: {
    id: 'PRINT_COMPLETE',
    type: 'final_step',
    message: '계약서 출력이 완료되었습니다. 감사합니다!',
    finalText: '계약 진행을 도와드려서 기쁩니다. 다음에 또 필요하시면 언제든지 말씀해 주세요. 안녕히 가세요!',
    actionText: '종료'
  },

  END_WITHOUT_PRINT: {
    id: 'END_WITHOUT_PRINT',
    type: 'final_step',
    message: '계약 절차가 완료되었습니다. 계약서는 언제든지 다시 출력하실 수 있습니다.',
    finalText: '계약 진행을 도와드려서 기쁩니다. 다음에 또 필요하시면 언제든지 말씀해 주세요. 안녕히 가세요!',
    actionText: '종료'
  },

  END_DECLINE: {
    id: 'END_DECLINE',
    type: 'final_step',
    message: '언제든지 계약 진행이 필요하시면 다시 말씀해 주세요.',
    finalText: '좋은 하루 되세요!',
    actionText: '종료'
  }
};

export const botProfile = {
  id: 'ai-domi',
  name: 'AI도미',
  profileImage: null
};

export const userProfile = {
  id: 'karina',
  name: '카리나',
  profileImage: null
};