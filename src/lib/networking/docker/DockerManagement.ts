import { DockerControl } from './DockerControl';

export class DockerManagement {
	public readonly control = new DockerControl();

	public fetchContainers() {
		return this.control.get('/containers/json');
	}
}

export interface Container {
	Image: string;
	ImageID: string;
	Command: string;
	Created: number;
	State: string;
	Status: string;
	Ports: Port[];
	Labels: Labels;
	SizeRw: number;
	SizeRootFs: number;
	HostConfig: HostConfig;
	NetworkSettings: NetworkSettings;
	Mounts: Mount[];
}

export interface HostConfig {
	NetworkMode: string;
}

export interface Labels {
	'com.example.vendor'?: string;
	'com.example.license'?: string;
	'com.example.version'?: string;
}

export interface Mount {
	Name: string;
	Source: string;
	Destination: string;
	Driver: string;
	Mode: string;
	RW: boolean;
	Propagation: string;
}

export interface NetworkSettings {
	Networks: Networks;
}

export interface Networks {
	bridge: Bridge;
}

export interface Bridge {
	NetworkID: string;
	EndpointID: string;
	Gateway: string;
	IPAddress: string;
	IPPrefixLen: number;
	IPv6Gateway: string;
	GlobalIPv6Address: string;
	GlobalIPv6PrefixLen: number;
	MacAddress: string;
}

export interface Port {
	PrivatePort: number;
	PublicPort: number;
	Type: string;
}
