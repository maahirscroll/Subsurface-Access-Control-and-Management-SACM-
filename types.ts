
export interface User {
  email: string;
}

export interface SensorReading {
  timestamp: number;
  value: number;
}

export interface ManholeData {
  id: string;
  gasLevel: number;
  blockageDistance: number; // in cm, from ultrasonic sensor
  isLocked: boolean;
  history: {
    gas: SensorReading[];
    blockage: SensorReading[];
  };
}
