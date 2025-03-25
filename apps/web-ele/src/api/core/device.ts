import { requestClient } from '#/api/request';

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Device {
  id: number;
  create_time: string;
  update_time: string;
  mac: string;
  voice: string;
  role: string;
  memory: string;
}

export async function getAllDevicesApi(page: number, size: number) {
  return requestClient.get<Page<Device>>('/device/all', {
    params: {
      page,
      size,
    },
  });
}

export async function updateDeviceApi(device: Device) {
  return requestClient.post<boolean>('/device/update', device);
}
