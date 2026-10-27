export type TradeType = '매매' | '전세' | '월세' | '단기';
export type PropertyType = '아파트' | '오피스텔' | '재건축' | '분양권' | '빌라/연립' | '원룸/투룸';

export interface UnitType {
  id: string;
  name: string; // e.g. "32.37m² (18.6D)"
  supplyAreaM2: number;
  exclusiveAreaM2: number;
  supplyPyeong: number;
  exclusivePyeong: number;
  roomCount: number;
  bathCount: number;
  householdCount: number;
  entranceType: '계단식' | '복도식';
}

export interface RealTransaction {
  id: string;
  contractDate: string; // e.g. "2021.01.28" or "01.28."
  contractYear: number;
  registrationDate?: string; // "-" or "21.02.15"
  floor: number;
  priceWon: number; // in Won, e.g. 233000000 (2억 3,300)
  monthlyRentWon?: number;
  tradeType: TradeType;
  exclusiveAreaM2: number;
  isHighest?: boolean;
  isLowest?: boolean;
  cancelDate?: string;
}

export interface ListingItem {
  id: string;
  complexId: string;
  title: string;
  tradeType: TradeType;
  priceWon: number;
  monthlyRentWon?: number;
  supplyAreaM2: number;
  exclusiveAreaM2: number;
  floor: number;
  totalFloors: number;
  direction: string; // "남동향", "남향"
  maintenanceFee: number; // in 10,000 Won, e.g. 12 (12만원)
  features: string[];
  description: string;
  brokerAgency: string;
  brokerName: string;
  brokerPhone: string;
  updatedAt: string;
}

export interface BrokerInfo {
  name: string;
  agencyName: string;
  repName: string;
  phone: string;
  address: string;
  listingCount: number;
  badge?: string;
  avatarUrl: string;
  description: string;
}

export interface CommunityStory {
  id: string;
  author: string;
  date: string;
  rating: number;
  category: '교통' | '주변환경' | '단지관리' | '거주후기';
  content: string;
  likes: number;
}

export interface Complex {
  id: string;
  name: string; // "성은하우징"
  propertyType: PropertyType;
  sido: string; // "서울특별시"
  sigungu: string; // "영등포구"
  dong: string; // "양평동1가"
  address: string; // "서울시 영등포구 양평동1가 247"
  lat: number;
  lng: number;
  households: number; // 14
  builtYearMonth: string; // "2020. 4."
  ageYears: number; // 7
  floorAreaRatio: number; // 249 (용적률 %)
  buildingCoverage: number; // 59 (건폐율 %)
  totalBuildings: number; // 1
  minFloor: number;
  maxFloor: number;
  parkingPerHousehold: number; // 1.07
  heatingType: string; // "개별난방, 도시가스"
  builder: string; // "성은종합건설"
  subwayStations: {
    line: string;
    name: string;
    distanceMinutes: number;
  }[];
  schoolInfo: {
    name: string;
    type: string;
    walkMinutes: number;
  };
  featuredBroker: BrokerInfo;
  units: UnitType[];
  counts: {
    sale: number; // 매매
    jeonse: number; // 전세
    monthly: number; // 월세
    short: number; // 단기
  };
  representativePrice: {
    type: TradeType;
    text: string; // "전세 2.3억"
    amountWon: number;
  };
  historicalTransactions: RealTransaction[];
  listings: ListingItem[];
  stories: CommunityStory[];
  marketPriceTrends: {
    year: number;
    quarter: string;
    avgSalePrice: number;
    avgJeonsePrice: number;
    volume: number;
  }[];
}

export interface FilterState {
  sido: string;
  sigungu: string;
  dong: string;
  onlyThisDong: boolean;
  selectedTradeType: TradeType | '전체';
  selectedPropertyTypes: PropertyType[];
  maxPriceWon: number; // 0 = unlimited, otherwise in Won
  minPriceWon: number;
  minExclusiveAreaM2: number;
  maxExclusiveAreaM2: number;
  minHouseholds: number;
  maxBuiltYears: number; // 0 = unlimited
  maxSubwayWalkMinutes: number; // 0 = unlimited
  nearSubwayOnly: boolean;
  isPyeongUnit: boolean;
  viewMode: 'complex' | 'listing';
  showRealTransactionOverlay: boolean;
}
