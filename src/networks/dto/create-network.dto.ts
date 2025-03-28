import { CreateDeviceDto } from "src/devices/dto/create-device.dto"; // Adjust the path as needed

export class CreateNetworkDto {
    name: string;
    type: string;
    devices?: CreateDeviceDto[]; // Optional field for creating devices along with the network
}
