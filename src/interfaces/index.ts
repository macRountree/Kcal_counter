export interface Category {
  id: number;
  name: string;
}

export interface Activity {
  category: number;
  name: string;
  calories: number;
}
