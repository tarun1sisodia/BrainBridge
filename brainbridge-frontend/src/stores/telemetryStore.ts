import { create } from 'zustand';

export interface TelemetryData {
  game: string;
  session_id?: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface TelemetryState {
  data: TelemetryData[];
  addTelemetry: (data: TelemetryData) => void;
  clearTelemetry: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  data: [],
  addTelemetry: (newData) => set((state) => ({ data: [...state.data, newData] })),
  clearTelemetry: () => set({ data: [] })
}));
