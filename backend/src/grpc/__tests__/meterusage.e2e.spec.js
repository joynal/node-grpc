const grpcServer = require('../server');
const grpcClient = require('../client');

describe('E2E Tests (MeterUsage Module)', () => {
  afterAll(() => grpcServer.forceShutdown());

  test('should return total number of meter usage', async () => {
    grpcClient.usageList({}, (err, data) => {
      expect(data.total).toBe(2975);
      expect(data.usage[0].meterusage).toBe(54.36);
      expect(data.usage[0].time).toBe('2019-01-31 23:45:00');
    });
  });

  test('should return 20 meter usage record by default', async () => {
    grpcClient.usageList({}, (err, data) => {
      expect(data.usage.length).toBe(20);
    });
  });

  test('should return 10 meter usage based on pagination data', async () => {
    grpcClient.usageList({ limit: 10, offset: 0 }, (err, data) => {
      expect(data.usage.length).toBe(10);
    });
  });

  test('should return second 10 meter usage', async () => {
    grpcClient.usageList({ limit: 10, offset: 1000 }, (err, data) => {
      expect(data.usage.length).toBe(10);
      expect(data.usage[0].meterusage).toBe(272.92);
      expect(data.usage[0].time).toBe('2019-01-21 13:45:00');
    });
  });
});
