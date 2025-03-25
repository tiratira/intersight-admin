import { requestClient } from '#/api/request';

export interface Page<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface Device {
  id: null | number;
  create_time: null | string;
  update_time: null | string;
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

export async function addDeviceApi(device: Device) {
  return requestClient.post<Device>('/device/add', device);
}

export async function deleteDeviceApi(id: number) {
  return requestClient.post<boolean>('/device/delete', { id });
}
