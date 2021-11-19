import axios from 'axios';
import { loadItems } from '@/services/data-provider';
import { Status, FilterCondition } from '@typings/shipments.enum';
import { ShipmentData } from '@typings/shipments';
import * as actions from '@/store/actions';

jest.mock('axios');

jest.mock('@/services/config.ts', () => ({
  getApiBaseUrl() {
    return 'http://example.com';
  },
}));

describe(`Data provider`, () => {
  describe(`loadItems`, () => {
    let shipmentData: ShipmentData;
    let axiosGetSpy: jest.SpyInstance;

    beforeEach(() => {
      shipmentData = {
        data: [
          {
            id: '123',
            createdAt: 34251421213,
            name: 'Instrybutor',
            contractor: { id: '456', name: 'Kazio' },
            status: Status.PROCESSING,
          },
        ],
        total: 12,
      };

      axiosGetSpy = jest
        .spyOn(axios, 'get')
        .mockImplementationOnce(() => Promise.resolve({ data: shipmentData }));
    });

    it(`should call the API with correct params`, async () => {
      await loadItems(Status.SUSPENDED, 17, 99);

      expect(axios.get).toHaveBeenCalledWith('http://example.com/api/cargo', {
        params: new URLSearchParams([
          ['skip', '17'],
          ['take', '99'],
          [
            'filter',
            JSON.stringify([
              {
                k: 'status',
                c: FilterCondition.EQ,
                v: Status.SUSPENDED,
              },
            ]),
          ],
        ]),
      });

      expect(axios.get).toHaveBeenCalledTimes(1);
    });

    it(`should use default parameters for "skip" and "take"`, async () => {
      await loadItems(Status.SUSPENDED);

      expect(axios.get).toHaveBeenCalledWith('http://example.com/api/cargo', {
        params: new URLSearchParams([
          ['skip', '0'],
          ['take', '20'],
          [
            'filter',
            JSON.stringify([
              {
                k: 'status',
                c: FilterCondition.EQ,
                v: Status.SUSPENDED,
              },
            ]),
          ],
        ]),
      });
    });

    it(`should replace current suspended shipments in the store`, async () => {
      jest.spyOn(actions, 'replaceShipments');

      await loadItems(Status.SUSPENDED);

      expect(actions.replaceShipments).toHaveBeenCalledWith(
        Status.SUSPENDED,
        shipmentData
      );
    });

    it(`should replace current suspended shipments in the store with empty data in case of an error`, async () => {
      jest.spyOn(actions, 'replaceShipments');

      axiosGetSpy.mockReset();

      axiosGetSpy
        .mockImplementationOnce(() => Promise.reject(new Error('An error')));

      await loadItems(Status.SUSPENDED);

      expect(actions.replaceShipments).toHaveBeenCalledWith(Status.SUSPENDED, {
        data: [],
        total: 0,
      });
    });
  });
});
