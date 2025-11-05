
import type { ManholeData, SensorReading } from '../types';

const MANHOLE_IDS = ['MH-NYC-101', 'MH-SF-204', 'MH-CHI-308'];
const MAX_HISTORY = 30;

// In-memory "database"
const mockDatabase: Map<string, ManholeData> = new Map(
  MANHOLE_IDS.map(id => [
    id,
    {
      id,
      gasLevel: 50,
      blockageDistance: 200, // 200cm deep, no blockage
      isLocked: true,
      history: {
        gas: [],
        blockage: [],
      },
    },
  ])
);

// --- Public API ---

export const getManholeIds = async (): Promise<string[]> => {
  await new Promise(res => setTimeout(res, 300)); // Simulate network delay
  return MANHOLE_IDS;
};

export const setLockState = async (id: string, isLocked: boolean): Promise<boolean> => {
  await new Promise(res => setTimeout(res, 700)); // Simulate network delay
  const manhole = mockDatabase.get(id);
  if (manhole) {
    manhole.isLocked = isLocked;
    mockDatabase.set(id, manhole);
    return true;
  }
  return false;
};

export const subscribeToManholeUpdates = (id: string, callback: (data: ManholeData) => void): (() => void) => {
  const update = () => {
    const manhole = mockDatabase.get(id);
    if (!manhole) return;

    // Simulate sensor data fluctuations
    const newGasLevel = manhole.gasLevel + (Math.random() - 0.5) * 10;
    manhole.gasLevel = Math.max(20, Math.min(600, newGasLevel)); // Clamp values

    const newBlockageDistance = manhole.blockageDistance + (Math.random() - 0.45) * 5;
    manhole.blockageDistance = Math.max(10, Math.min(200, newBlockageDistance)); // Clamp values

    const now = Date.now();
    
    manhole.history.gas.push({ timestamp: now, value: manhole.gasLevel });
    if (manhole.history.gas.length > MAX_HISTORY) {
      manhole.history.gas.shift();
    }

    manhole.history.blockage.push({ timestamp: now, value: manhole.blockageDistance });
     if (manhole.history.blockage.length > MAX_HISTORY) {
      manhole.history.blockage.shift();
    }

    mockDatabase.set(id, manhole);

    // Create a deep copy to avoid state mutation issues in React
    const dataCopy = JSON.parse(JSON.stringify(manhole));
    callback(dataCopy);
  };

  // Initial call
  setTimeout(() => update(), 100);

  const intervalId = setInterval(update, 2000);

  // Return unsubscribe function
  return () => {
    clearInterval(intervalId);
  };
};
