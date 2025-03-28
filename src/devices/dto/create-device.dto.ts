export class CreateDeviceDto {
    name: string;
    ipAddress: string;
    type: string;
    isActive: boolean;
    networkId?: number; // Optional field for associating a device with a network
  }