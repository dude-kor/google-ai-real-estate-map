import { Complex } from '../types/realEstate';

export const INITIAL_COMPLEXES: Complex[] = [
  {
    id: 'complex-seongeun',
    name: '성은하우징',
    propertyType: '오피스텔',
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '양평동1가',
    address: '서울특별시 영등포구 영등포로 25-1 (양평동1가)',
    lat: 37.5248,
    lng: 126.8912,
    households: 14,
    builtYearMonth: '2020. 4.',
    ageYears: 7,
    floorAreaRatio: 249,
    buildingCoverage: 59,
    totalBuildings: 1,
    minFloor: 2,
    maxFloor: 8,
    parkingPerHousehold: 1.07,
    heatingType: '개별난방, 도시가스',
    builder: '성은종합건설',
    subwayStations: [
      { line: '5호선', name: '양평역', distanceMinutes: 4 },
      { line: '2·5호선', name: '영등포구청역', distanceMinutes: 9 },
      { line: '5호선', name: '오목교역', distanceMinutes: 12 }
    ],
    schoolInfo: {
      name: '서울영도초등학교',
      type: '공립',
      walkMinutes: 7
    },
    featuredBroker: {
      name: '타워(단지내)공인중개사사무소',
      agencyName: '타워(단지내)공인중개사사무소',
      repName: '김대표 & 이소장',
      phone: '02-2633-8949',
      address: '서울시 영등포구 양평동1가 245',
      listingCount: 1,
      badge: '광고',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&q=80',
      description: '공인중개사 부부가 운영합니다. 단지 보유 매물 1'
    },
    units: [
      {
        id: 'unit-32d',
        name: '32.37m² (18.6D)',
        supplyAreaM2: 61.5,
        exclusiveAreaM2: 32.37,
        supplyPyeong: 18.6,
        exclusivePyeong: 9.8,
        roomCount: 2,
        bathCount: 1,
        householdCount: 14,
        entranceType: '복도식'
      }
    ],
    counts: {
      sale: 2,
      jeonse: 1,
      monthly: 0,
      short: 0
    },
    representativePrice: {
      type: '전세',
      text: '전세 2.3억',
      amountWon: 230000000
    },
    historicalTransactions: [
      {
        id: 'tx-1',
        contractDate: '01.28.',
        contractYear: 2021,
        registrationDate: '-',
        floor: 2,
        priceWon: 233000000,
        tradeType: '매매',
        exclusiveAreaM2: 32.37,
        isHighest: true,
        isLowest: true
      },
      {
        id: 'tx-2',
        contractDate: '01.28.',
        contractYear: 2021,
        registrationDate: '-',
        floor: 3,
        priceWon: 233000000,
        tradeType: '매매',
        exclusiveAreaM2: 32.37,
        isHighest: true,
        isLowest: true
      },
      {
        id: 'tx-3',
        contractDate: '01.18.',
        contractYear: 2021,
        registrationDate: '-',
        floor: 2,
        priceWon: 233000000,
        tradeType: '매매',
        exclusiveAreaM2: 32.37
      },
      {
        id: 'tx-4',
        contractDate: '05.12.',
        contractYear: 2023,
        registrationDate: '23.06.01',
        floor: 4,
        priceWon: 240000000,
        tradeType: '매매',
        exclusiveAreaM2: 32.37,
        isHighest: true
      },
      {
        id: 'tx-5',
        contractDate: '03.15.',
        contractYear: 2024,
        registrationDate: '-',
        floor: 3,
        priceWon: 230000000,
        tradeType: '전세',
        exclusiveAreaM2: 32.37
      }
    ],
    listings: [
      {
        id: 'list-1',
        complexId: 'complex-seongeun',
        title: '양평역 초역세권 신축급 깔끔한 투룸 오피스텔',
        tradeType: '전세',
        priceWon: 230000000,
        supplyAreaM2: 61.5,
        exclusiveAreaM2: 32.37,
        floor: 3,
        totalFloors: 8,
        direction: '남동향',
        maintenanceFee: 12,
        features: ['올수리', '융자금적음', '전세대출가능', '주차가능', '풀옵션'],
        description: '양평역 4분 거리, 조용하고 채광 우수한 고층 로얄 호실입니다. 시스템에어컨, 세탁기, 냉장고 풀옵션 완비되어 1인 및 신혼부부에게 강력 추천드립니다.',
        brokerAgency: '타워(단지내)공인중개사사무소',
        brokerName: '김대표 공인중개사',
        brokerPhone: '02-2633-8949',
        updatedAt: '2026.10.25'
      },
      {
        id: 'list-2',
        complexId: 'complex-seongeun',
        title: '실거주 및 임대수익형 갭투자 추천 급매물',
        tradeType: '매매',
        priceWon: 245000000,
        supplyAreaM2: 61.5,
        exclusiveAreaM2: 32.37,
        floor: 5,
        totalFloors: 8,
        direction: '남향',
        maintenanceFee: 12,
        features: ['즉시입주', '안양천조망', '주차편리', '초역세권'],
        description: '현재 공실 상태로 즉시 입주 가능하며, 전세 2.3억 세팅 시 실투자금 1,500만원으로 소액 투자 가능한 알짜 매물입니다.',
        brokerAgency: '양평에이스공인중개사',
        brokerName: '이소장 공인중개사',
        brokerPhone: '02-2678-4500',
        updatedAt: '2026.10.26'
      },
      {
        id: 'list-3',
        complexId: 'complex-seongeun',
        title: '중층 깔끔한 인테리어 컨디션 최상',
        tradeType: '매매',
        priceWon: 240000000,
        supplyAreaM2: 61.5,
        exclusiveAreaM2: 32.37,
        floor: 4,
        totalFloors: 8,
        direction: '남동향',
        maintenanceFee: 12,
        features: ['남동향', '탁트인전망', '엘리베이터'],
        description: '첫 입주 후 집주인이 직접 거주하여 내부 상태가 매우 깨끗합니다. 입주 시기 협의 가능합니다.',
        brokerAgency: '행복부동산',
        brokerName: '박중개',
        brokerPhone: '02-2631-7788',
        updatedAt: '2026.10.22'
      }
    ],
    stories: [
      {
        id: 'story-1',
        author: '양평주민3년차',
        date: '2026.08.14',
        rating: 4.8,
        category: '거주후기',
        content: '양평역 5호선까지 신호등 없이 도보 4분이라 여의도나 광화문 출퇴근이 정말 편합니다. 안양천 산책로도 가까워 저녁마다 러닝하기 좋습니다.',
        likes: 24
      },
      {
        id: 'story-2',
        author: '초보직장인',
        date: '2026.06.02',
        rating: 4.5,
        category: '주변환경',
        content: '인근에 코스트코 양평점, 영등포 롯데마트, 타임스퀘어가 가까워서 장보기가 매우 편리합니다. 소음도 거의 없고 조용합니다.',
        likes: 18
      }
    ],
    marketPriceTrends: [
      { year: 2021, quarter: '1Q', avgSalePrice: 233000000, avgJeonsePrice: 210000000, volume: 5 },
      { year: 2021, quarter: '3Q', avgSalePrice: 238000000, avgJeonsePrice: 215000000, volume: 3 },
      { year: 2022, quarter: '2Q', avgSalePrice: 240000000, avgJeonsePrice: 220000000, volume: 2 },
      { year: 2023, quarter: '2Q', avgSalePrice: 240000000, avgJeonsePrice: 225000000, volume: 4 },
      { year: 2024, quarter: '1Q', avgSalePrice: 242000000, avgJeonsePrice: 230000000, volume: 3 },
      { year: 2025, quarter: '4Q', avgSalePrice: 245000000, avgJeonsePrice: 230000000, volume: 4 },
      { year: 2026, quarter: '3Q', avgSalePrice: 245000000, avgJeonsePrice: 230000000, volume: 2 }
    ]
  },
  {
    id: 'complex-samho',
    name: '양평삼호',
    propertyType: '아파트',
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '양평동1가',
    address: '서울특별시 영등포구 선유로 87 (양평동1가)',
    lat: 37.5278,
    lng: 126.8945,
    households: 915,
    builtYearMonth: '1996. 10.',
    ageYears: 31,
    floorAreaRatio: 268,
    buildingCoverage: 19,
    totalBuildings: 8,
    minFloor: 12,
    maxFloor: 22,
    parkingPerHousehold: 1.15,
    heatingType: '개별난방, 도시가스',
    builder: '삼호물산',
    subwayStations: [
      { line: '5호선', name: '양평역', distanceMinutes: 3 },
      { line: '2·5호선', name: '영등포구청역', distanceMinutes: 7 }
    ],
    schoolInfo: {
      name: '서울당중초등학교',
      type: '공립',
      walkMinutes: 5
    },
    featuredBroker: {
      name: '삼호공인중개사사무소',
      agencyName: '삼호단지내공인중개사',
      repName: '최진우 대표',
      phone: '02-2679-1122',
      address: '서울시 영등포구 양평동1가 삼호상가 102호',
      listingCount: 6,
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
      description: '양평삼호 전문 15년 단지내 터줏대감 공인중개사'
    },
    units: [
      {
        id: 'samho-84',
        name: '84.92m² (32평형)',
        supplyAreaM2: 106.2,
        exclusiveAreaM2: 84.92,
        supplyPyeong: 32.1,
        exclusivePyeong: 25.7,
        roomCount: 3,
        bathCount: 2,
        householdCount: 520,
        entranceType: '계단식'
      },
      {
        id: 'samho-59',
        name: '59.85m² (24평형)',
        supplyAreaM2: 79.5,
        exclusiveAreaM2: 59.85,
        supplyPyeong: 24.0,
        exclusivePyeong: 18.1,
        roomCount: 3,
        bathCount: 1,
        householdCount: 395,
        entranceType: '복도식'
      }
    ],
    counts: {
      sale: 8,
      jeonse: 4,
      monthly: 2,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 9.8억~10.5억',
      amountWon: 1020000000
    },
    historicalTransactions: [
      {
        id: 'samho-tx-1',
        contractDate: '09.18.',
        contractYear: 2026,
        registrationDate: '26.10.02',
        floor: 14,
        priceWon: 1040000000,
        tradeType: '매매',
        exclusiveAreaM2: 84.92,
        isHighest: true
      },
      {
        id: 'samho-tx-2',
        contractDate: '07.05.',
        contractYear: 2026,
        registrationDate: '-',
        floor: 8,
        priceWon: 530000000,
        tradeType: '전세',
        exclusiveAreaM2: 84.92
      },
      {
        id: 'samho-tx-3',
        contractDate: '03.20.',
        contractYear: 2026,
        registrationDate: '26.04.10',
        floor: 6,
        priceWon: 810000000,
        tradeType: '매매',
        exclusiveAreaM2: 59.85
      }
    ],
    listings: [
      {
        id: 'samho-list-1',
        complexId: 'complex-samho',
        title: '양평삼호 103동 로얄층 남향 특올수리 확트인 뷰',
        tradeType: '매매',
        priceWon: 1050000000,
        supplyAreaM2: 106.2,
        exclusiveAreaM2: 84.92,
        floor: 15,
        totalFloors: 20,
        direction: '남향',
        maintenanceFee: 24,
        features: ['특올수리', '로얄층', '남향', '학군우수'],
        description: '올확장 샷시교체 완료, 주인 거주로 관리 상태 최상입니다. 영등포구청역 더블역세권 도보권.',
        brokerAgency: '삼호단지내공인중개사',
        brokerName: '최진우 공인중개사',
        brokerPhone: '02-2679-1122',
        updatedAt: '2026.10.26'
      },
      {
        id: 'samho-list-2',
        complexId: 'complex-samho',
        title: '판상형 채광 좋은 24평 전세 안심대출 가능',
        tradeType: '전세',
        priceWon: 480000000,
        supplyAreaM2: 79.5,
        exclusiveAreaM2: 59.85,
        floor: 9,
        totalFloors: 18,
        direction: '남동향',
        maintenanceFee: 18,
        features: ['전세대출가능', '융자무', '중층', '즉시입주'],
        description: '융자 전혀 없는 깨끗한 집입니다. HUG 버팀목 전세대출 100% 가능.',
        brokerAgency: '삼호단지내공인중개사',
        brokerName: '최진우 공인중개사',
        brokerPhone: '02-2679-1122',
        updatedAt: '2026.10.24'
      }
    ],
    stories: [
      {
        id: 'samho-st-1',
        author: '삼호러버',
        date: '2026.09.11',
        rating: 4.7,
        category: '거주후기',
        content: '양평역 5호선 바로 앞이고 2호선 영등포구청역도 걸어서 7분이라 서울 어디든 30분대 이동 가능합니다.',
        likes: 31
      }
    ],
    marketPriceTrends: [
      { year: 2023, quarter: '1Q', avgSalePrice: 910000000, avgJeonsePrice: 470000000, volume: 8 },
      { year: 2024, quarter: '2Q', avgSalePrice: 950000000, avgJeonsePrice: 490000000, volume: 11 },
      { year: 2025, quarter: '3Q', avgSalePrice: 990000000, avgJeonsePrice: 510000000, volume: 9 },
      { year: 2026, quarter: '2Q', avgSalePrice: 1030000000, avgJeonsePrice: 530000000, volume: 14 }
    ]
  },
  {
    id: 'complex-hyundai6',
    name: '양평현대6차',
    propertyType: '아파트',
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '양평동2가',
    address: '서울특별시 영등포구 선유서로25길 12 (양평동2가)',
    lat: 37.5289,
    lng: 126.8885,
    households: 382,
    builtYearMonth: '2000. 11.',
    ageYears: 27,
    floorAreaRatio: 285,
    buildingCoverage: 22,
    totalBuildings: 4,
    minFloor: 15,
    maxFloor: 24,
    parkingPerHousehold: 1.2,
    heatingType: '개별난방, 도시가스',
    builder: '현대산업개발',
    subwayStations: [
      { line: '5호선', name: '양평역', distanceMinutes: 5 },
      { line: '9호선', name: '선유도역', distanceMinutes: 14 }
    ],
    schoolInfo: {
      name: '서울양평초등학교',
      type: '공립',
      walkMinutes: 4
    },
    featuredBroker: {
      name: '현대베스트공인중개사',
      agencyName: '현대베스트공인중개사',
      repName: '정성희 대표',
      phone: '02-2637-3300',
      address: '서울시 영등포구 양평동2가 37-1',
      listingCount: 4,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      description: '양평현대 시리즈 전문 상담 및 중개'
    },
    units: [
      {
        id: 'hyundai-84',
        name: '84.88m² (32평)',
        supplyAreaM2: 107.0,
        exclusiveAreaM2: 84.88,
        supplyPyeong: 32.4,
        exclusivePyeong: 25.7,
        roomCount: 3,
        bathCount: 2,
        householdCount: 220,
        entranceType: '계단식'
      }
    ],
    counts: {
      sale: 5,
      jeonse: 2,
      monthly: 1,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 9.2억~9.9억',
      amountWon: 950000000
    },
    historicalTransactions: [
      {
        id: 'h6-tx-1',
        contractDate: '08.10.',
        contractYear: 2026,
        registrationDate: '26.09.01',
        floor: 12,
        priceWon: 975000000,
        tradeType: '매매',
        exclusiveAreaM2: 84.88
      },
      {
        id: 'h6-tx-2',
        contractDate: '06.22.',
        contractYear: 2026,
        registrationDate: '-',
        floor: 15,
        priceWon: 510000000,
        tradeType: '전세',
        exclusiveAreaM2: 84.88
      }
    ],
    listings: [
      {
        id: 'h6-l-1',
        complexId: 'complex-hyundai6',
        title: '안양천 영구조망 고층 올수리 판상형',
        tradeType: '매매',
        priceWon: 980000000,
        supplyAreaM2: 107.0,
        exclusiveAreaM2: 84.88,
        floor: 18,
        totalFloors: 24,
        direction: '남서향',
        maintenanceFee: 23,
        features: ['안양천조망', '고층', '올확장', '초품아'],
        description: '거실에서 안양천 수변공원이 시원하게 내려다보이는 특급 로얄동입니다.',
        brokerAgency: '현대베스트공인중개사',
        brokerName: '정성희 대표',
        brokerPhone: '02-2637-3300',
        updatedAt: '2026.10.25'
      }
    ],
    stories: [],
    marketPriceTrends: [
      { year: 2024, quarter: '1Q', avgSalePrice: 890000000, avgJeonsePrice: 480000000, volume: 6 },
      { year: 2025, quarter: '2Q', avgSalePrice: 940000000, avgJeonsePrice: 500000000, volume: 8 },
      { year: 2026, quarter: '3Q', avgSalePrice: 975000000, avgJeonsePrice: 510000000, volume: 5 }
    ]
  },
  {
    id: 'complex-dangsan-raemian',
    name: '당산삼성래미안4차',
    propertyType: '아파트',
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '당산동5가',
    address: '서울특별시 영등포구 당산로 214 (당산동5가)',
    lat: 37.5342,
    lng: 126.9015,
    households: 1391,
    builtYearMonth: '2003. 12.',
    ageYears: 24,
    floorAreaRatio: 298,
    buildingCoverage: 18,
    totalBuildings: 25,
    minFloor: 16,
    maxFloor: 25,
    parkingPerHousehold: 1.45,
    heatingType: '개별난방, 도시가스',
    builder: '삼성물산',
    subwayStations: [
      { line: '2·9호선', name: '당산역', distanceMinutes: 2 }
    ],
    schoolInfo: {
      name: '서울당서초등학교',
      type: '공립',
      walkMinutes: 3
    },
    featuredBroker: {
      name: '래미안스타공인중개사',
      agencyName: '래미안스타공인중개사',
      repName: '한유진 대표',
      phone: '02-2635-4989',
      address: '서울시 영등포구 당산로 214 상가',
      listingCount: 15,
      avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
      description: '당산역 초역세권 대단지 아파트 전문'
    },
    units: [
      {
        id: 'raemian-84',
        name: '84.97m² (33평)',
        supplyAreaM2: 109.8,
        exclusiveAreaM2: 84.97,
        supplyPyeong: 33.2,
        exclusivePyeong: 25.7,
        roomCount: 3,
        bathCount: 2,
        householdCount: 780,
        entranceType: '계단식'
      }
    ],
    counts: {
      sale: 14,
      jeonse: 6,
      monthly: 3,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 15.2억~16.5억',
      amountWon: 1550000000
    },
    historicalTransactions: [
      {
        id: 'ds-tx-1',
        contractDate: '09.28.',
        contractYear: 2026,
        registrationDate: '26.10.12',
        floor: 19,
        priceWon: 1620000000,
        tradeType: '매매',
        exclusiveAreaM2: 84.97,
        isHighest: true
      },
      {
        id: 'ds-tx-2',
        contractDate: '08.15.',
        contractYear: 2026,
        registrationDate: '-',
        floor: 11,
        priceWon: 780000000,
        tradeType: '전세',
        exclusiveAreaM2: 84.97
      }
    ],
    listings: [
      {
        id: 'ds-l-1',
        complexId: 'complex-dangsan-raemian',
        title: '당산역 2/9호선 급행 2분 초역세권 올리모델링',
        tradeType: '매매',
        priceWon: 1580000000,
        supplyAreaM2: 109.8,
        exclusiveAreaM2: 84.97,
        floor: 16,
        totalFloors: 25,
        direction: '남향',
        maintenanceFee: 26,
        features: ['더블역세권', '대단지', '올리모델링', '초품아'],
        description: '강남 여의도 마곡 직주근접 끝판왕. 단지 조경 및 커뮤니티 우수.',
        brokerAgency: '래미안스타공인중개사',
        brokerName: '한유진 대표',
        brokerPhone: '02-2635-4989',
        updatedAt: '2026.10.27'
      }
    ],
    stories: [],
    marketPriceTrends: [
      { year: 2024, quarter: '1Q', avgSalePrice: 1420000000, avgJeonsePrice: 720000000, volume: 15 },
      { year: 2025, quarter: '2Q', avgSalePrice: 1500000000, avgJeonsePrice: 750000000, volume: 18 },
      { year: 2026, quarter: '3Q', avgSalePrice: 1580000000, avgJeonsePrice: 780000000, volume: 12 }
    ]
  },
  {
    id: 'complex-mullae-hillstate',
    name: '문래힐스테이트',
    propertyType: '아파트',
    sido: '서울특별시',
    sigungu: '영등포구',
    dong: '문래동3가',
    address: '서울특별시 영등포구 문래로 83 (문래동3가)',
    lat: 37.5192,
    lng: 126.8965,
    households: 776,
    builtYearMonth: '2003. 6.',
    ageYears: 24,
    floorAreaRatio: 248,
    buildingCoverage: 19,
    totalBuildings: 14,
    minFloor: 14,
    maxFloor: 24,
    parkingPerHousehold: 1.6,
    heatingType: '개별난방, 도시가스',
    builder: '현대건설',
    subwayStations: [
      { line: '2호선', name: '문래역', distanceMinutes: 4 }
    ],
    schoolInfo: {
      name: '서울문래초등학교',
      type: '공립',
      walkMinutes: 5
    },
    featuredBroker: {
      name: '문래골드공인중개사',
      agencyName: '문래골드공인중개사',
      repName: '김민석 대표',
      phone: '02-2675-9988',
      address: '서울시 영등포구 문래로 83',
      listingCount: 9,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
      description: '문래역 초역세권 및 문래창작촌 라이프 전문'
    },
    units: [
      {
        id: 'mullae-84',
        name: '84.95m² (33평)',
        supplyAreaM2: 110.2,
        exclusiveAreaM2: 84.95,
        supplyPyeong: 33.3,
        exclusivePyeong: 25.7,
        roomCount: 3,
        bathCount: 2,
        householdCount: 450,
        entranceType: '계단식'
      }
    ],
    counts: {
      sale: 7,
      jeonse: 3,
      monthly: 1,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 13.5억~14.2억',
      amountWon: 1380000000
    },
    historicalTransactions: [
      {
        id: 'ml-tx-1',
        contractDate: '09.12.',
        contractYear: 2026,
        floor: 16,
        priceWon: 1390000000,
        tradeType: '매매',
        exclusiveAreaM2: 84.95
      }
    ],
    listings: [
      {
        id: 'ml-l-1',
        complexId: 'complex-mullae-hillstate',
        title: '문래역 도보 4분 문래공원 인접 쾌적한 로얄동',
        tradeType: '매매',
        priceWon: 1380000000,
        supplyAreaM2: 110.2,
        exclusiveAreaM2: 84.95,
        floor: 12,
        totalFloors: 22,
        direction: '남향',
        maintenanceFee: 25,
        features: ['역세권', '공원인접', '로얄동', '올확장'],
        description: '홈플러스 및 문래공원이 바로 앞이라 생활 인프라 최상.',
        brokerAgency: '문래골드공인중개사',
        brokerName: '김민석 대표',
        brokerPhone: '02-2675-9988',
        updatedAt: '2026.10.26'
      }
    ],
    stories: [],
    marketPriceTrends: [
      { year: 2025, quarter: '1Q', avgSalePrice: 1310000000, avgJeonsePrice: 680000000, volume: 7 },
      { year: 2026, quarter: '2Q', avgSalePrice: 1380000000, avgJeonsePrice: 720000000, volume: 9 }
    ]
  },
  {
    id: 'complex-mokdong-hyperion',
    name: '목동현대하이페리온',
    propertyType: '오피스텔',
    sido: '서울특별시',
    sigungu: '양천구',
    dong: '목동',
    address: '서울특별시 양천구 목동동로 257 (목동)',
    lat: 37.5262,
    lng: 126.8748,
    households: 466,
    builtYearMonth: '2003. 7.',
    ageYears: 24,
    floorAreaRatio: 798,
    buildingCoverage: 48,
    totalBuildings: 2,
    minFloor: 42,
    maxFloor: 69,
    parkingPerHousehold: 2.8,
    heatingType: '지역난방, 열병합',
    builder: '현대건설',
    subwayStations: [
      { line: '5호선', name: '오목교역', distanceMinutes: 1 }
    ],
    schoolInfo: {
      name: '서울목운초등학교',
      type: '공립',
      walkMinutes: 3
    },
    featuredBroker: {
      name: '하이페리온에이스공인중개사',
      agencyName: '하이페리온에이스공인',
      repName: '송경호 대표',
      phone: '02-2646-8800',
      address: '서울시 양천구 목동동로 257 상가',
      listingCount: 11,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80',
      description: '목동 현대백화점 직결 최고급 랜드마크'
    },
    units: [
      {
        id: 'hyperion-150',
        name: '150.12m² (58평)',
        supplyAreaM2: 215.0,
        exclusiveAreaM2: 150.12,
        supplyPyeong: 65.0,
        exclusivePyeong: 45.4,
        roomCount: 4,
        bathCount: 2,
        householdCount: 240,
        entranceType: '계단식'
      }
    ],
    counts: {
      sale: 6,
      jeonse: 3,
      monthly: 2,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 21.5억~24억',
      amountWon: 2250000000
    },
    historicalTransactions: [
      {
        id: 'hyp-tx-1',
        contractDate: '09.05.',
        contractYear: 2026,
        floor: 45,
        priceWon: 2350000000,
        tradeType: '매매',
        exclusiveAreaM2: 150.12,
        isHighest: true
      }
    ],
    listings: [
      {
        id: 'hyp-l-1',
        complexId: 'complex-mokdong-hyperion',
        title: '목동 최고층 랜드마크 안양천 및 여의도 스카이라인 뷰',
        tradeType: '매매',
        priceWon: 2350000000,
        supplyAreaM2: 215.0,
        exclusiveAreaM2: 150.12,
        floor: 48,
        totalFloors: 69,
        direction: '동향',
        maintenanceFee: 65,
        features: ['스카이뷰', '현대백화점연결', '오목교역직통', '호텔식로비'],
        description: '현대백화점 지하 연결 및 오목교역 직결. 목동 최고 학군(목운초, 목운중) 배정 단지.',
        brokerAgency: '하이페리온에이스공인',
        brokerName: '송경호 대표',
        brokerPhone: '02-2646-8800',
        updatedAt: '2026.10.25'
      }
    ],
    stories: [],
    marketPriceTrends: [
      { year: 2025, quarter: '2Q', avgSalePrice: 2150000000, avgJeonsePrice: 1100000000, volume: 4 },
      { year: 2026, quarter: '3Q', avgSalePrice: 2350000000, avgJeonsePrice: 1200000000, volume: 5 }
    ]
  },
  {
    id: 'complex-mokdong-7',
    name: '목동신시가지7단지',
    propertyType: '재건축',
    sido: '서울특별시',
    sigungu: '양천구',
    dong: '목동',
    address: '서울특별시 양천구 목동서로 100 (목동)',
    lat: 37.5284,
    lng: 126.8672,
    households: 2550,
    builtYearMonth: '1986. 11.',
    ageYears: 41,
    floorAreaRatio: 125,
    buildingCoverage: 12,
    totalBuildings: 34,
    minFloor: 5,
    maxFloor: 15,
    parkingPerHousehold: 0.9,
    heatingType: '지역난방, 열병합',
    builder: '대한주택공사',
    subwayStations: [
      { line: '5호선', name: '목동역', distanceMinutes: 1 }
    ],
    schoolInfo: {
      name: '서울목운초등학교',
      type: '공립',
      walkMinutes: 4
    },
    featuredBroker: {
      name: '목동7단지제일공인중개사',
      agencyName: '목동7단지제일공인',
      repName: '박은희 대표',
      phone: '02-2645-7700',
      address: '서울시 양천구 목동 7단지 상가 101호',
      listingCount: 22,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&q=80',
      description: '목동 재건축 대장 7단지 전문 20년 경력'
    },
    units: [
      {
        id: 'mokdong7-66',
        name: '66.6m² (27평)',
        supplyAreaM2: 89.2,
        exclusiveAreaM2: 66.6,
        supplyPyeong: 27.0,
        exclusivePyeong: 20.1,
        roomCount: 3,
        bathCount: 1,
        householdCount: 980,
        entranceType: '계단식'
      }
    ],
    counts: {
      sale: 18,
      jeonse: 8,
      monthly: 4,
      short: 0
    },
    representativePrice: {
      type: '매매',
      text: '매매 21.8억~23억',
      amountWon: 2200000000
    },
    historicalTransactions: [
      {
        id: 'md7-tx-1',
        contractDate: '09.25.',
        contractYear: 2026,
        floor: 9,
        priceWon: 2230000000,
        tradeType: '매매',
        exclusiveAreaM2: 66.6,
        isHighest: true
      }
    ],
    listings: [
      {
        id: 'md7-l-1',
        complexId: 'complex-mokdong-7',
        title: '목동역 초역세권 대지지분 최고 재건축 신속통합기획',
        tradeType: '매매',
        priceWon: 2250000000,
        supplyAreaM2: 89.2,
        exclusiveAreaM2: 66.6,
        floor: 10,
        totalFloors: 15,
        direction: '남향',
        maintenanceFee: 22,
        features: ['재건축', '대지지분최고', '초역세권', '목운학군'],
        description: '목동 재건축 중 사업성 최고 7단지. 5호선 목동역 초근접 및 목운초 배정.',
        brokerAgency: '목동7단지제일공인',
        brokerName: '박은희 대표',
        brokerPhone: '02-2645-7700',
        updatedAt: '2026.10.27'
      }
    ],
    stories: [],
    marketPriceTrends: [
      { year: 2024, quarter: '1Q', avgSalePrice: 1950000000, avgJeonsePrice: 580000000, volume: 14 },
      { year: 2025, quarter: '2Q', avgSalePrice: 2080000000, avgJeonsePrice: 620000000, volume: 19 },
      { year: 2026, quarter: '3Q', avgSalePrice: 2230000000, avgJeonsePrice: 650000000, volume: 16 }
    ]
  }
];

export const SUBWAY_STATIONS = [
  { name: '양평역', line: '5호선', lat: 37.5258, lng: 126.8860, color: '#8936E0' },
  { name: '오목교역', line: '5호선', lat: 37.5244, lng: 126.8752, color: '#8936E0' },
  { name: '영등포구청역', line: '2·5호선', lat: 37.5259, lng: 126.8966, color: '#3CB44A' },
  { name: '문래역', line: '2호선', lat: 37.5179, lng: 126.8948, color: '#3CB44A' },
  { name: '당산역', line: '2·9호선', lat: 37.5348, lng: 126.9025, color: '#BDB092' },
  { name: '도림천역', line: '2호선 지선', lat: 37.5145, lng: 126.8827, color: '#3CB44A' },
  { name: '신정네거리역', line: '2호선 지선', lat: 37.5201, lng: 126.8529, color: '#3CB44A' },
  { name: '목동역', line: '5호선', lat: 37.5284, lng: 126.8647, color: '#8936E0' }
];

export const SEOUL_REGIONS = [
  {
    sido: '서울특별시',
    sigungu: '영등포구',
    dongs: ['양평동1가', '양평동2가', '양평동3가', '당산동', '당산동5가', '문래동3가', '여의도동', '신길동', '영등포동'],
    center: { lat: 37.5255, lng: 126.8920, zoom: 15 }
  },
  {
    sido: '서울특별시',
    sigungu: '양천구',
    dongs: ['목동', '신정동', '신월동'],
    center: { lat: 37.5270, lng: 126.8700, zoom: 15 }
  },
  {
    sido: '서울특별시',
    sigungu: '마포구',
    dongs: ['상암동', '공덕동', '아현동', '합정동', '망원동'],
    center: { lat: 37.5500, lng: 126.9400, zoom: 14 }
  },
  {
    sido: '서울특별시',
    sigungu: '강남구',
    dongs: ['역삼동', '대치동', '도곡동', '개포동', '압구정동', '청담동'],
    center: { lat: 37.4980, lng: 127.0450, zoom: 14 }
  }
];
