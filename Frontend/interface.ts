export interface Reservation {
  _id: string;
  reserveDate: Date;
  user: string;
  workingSpace: RefWorkingSpace;
  createdAt: Date;
  __v: number;
}
export interface RefWorkingSpace {
  _id: string;
  name: string;
  address: string;
  tel: string;
  id: string;
}

export interface SpaceItem {
  _id?: string;
  name: string;
  address: string;
  tel?: string;
  openTime: string;
  closeTime: string;
  remaining: number | null;
  __v?: number;
  reservation?: Reservation[];
  id?: string;
  image: string;
}

export interface SpaceJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: SpaceItem[];
}

export interface Time {
  start: string;
  end: string;
}

export interface SetPreviewCard {
  img: any;
  name: string;
  open: string;
  close: string;
  desc: string;
  seat: number;
}
export interface User {
  _id: string;
  name: string;
  role: string;
  email: string;
  password: string;
  createdAt: string;
  __v: number;
}
