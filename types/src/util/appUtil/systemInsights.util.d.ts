declare class SystemInsights {
  static getSystemHealth(): {
    cpuUsage: number[];
    totalMemory: string;
    freeMemory: string;
    timeStamp: string;
  };
  static getApplicationHealth(): {
    environment: string;
    uptime: string;
    memoryUsage: {
      heapTotal: string;
      heapUsed: string;
    };
    cpuUsage: {
      user: number;
      system: number;
    };
    timeStamp: string;
  };
}
export default SystemInsights;
