import { IncomingMessage, request, RequestOptions } from 'http';
import { once } from 'stream';
import { URL } from 'url';

export class DockerControl {
	private defaultOptions: RequestOptions;

	public constructor(defaultOptions?: RequestOptions) {
		this.defaultOptions = {
			socketPath: DockerControl.dockerSocketPath,
			...defaultOptions
		};
	}

	public get(options: RequestOptions): Promise<Buffer>;
	public get(url: string | URL, options?: RequestOptions): Promise<Buffer>;
	public get(url: string | RequestOptions | URL, options?: RequestOptions) {
		return this.do({ ...this.defaultOptions, ...DockerControl.resolve(url), ...options, method: 'GET' });
	}

	public post(options: RequestOptions): Promise<Buffer>;
	public post(url: string | URL, options?: RequestOptions): Promise<Buffer>;
	public post(url: string | RequestOptions | URL, options?: RequestOptions) {
		return this.do({ ...this.defaultOptions, ...DockerControl.resolve(url), ...options, method: 'POST' });
	}

	public put(options: RequestOptions): Promise<Buffer>;
	public put(url: string | URL, options?: RequestOptions): Promise<Buffer>;
	public put(url: string | RequestOptions | URL, options?: RequestOptions) {
		return this.do({ ...this.defaultOptions, ...DockerControl.resolve(url), ...options, method: 'PUT' });
	}

	public delete(options: RequestOptions): Promise<Buffer>;
	public delete(url: string | URL, options?: RequestOptions): Promise<Buffer>;
	public delete(url: string | RequestOptions | URL, options?: RequestOptions) {
		return this.do({ ...this.defaultOptions, ...DockerControl.resolve(url), ...options, method: 'DELETE' });
	}

	private async do(options: RequestOptions) {
		const response = request(options);
		const [res] = (await once(response, 'response')) as [IncomingMessage];

		const chunks: Buffer[] = [];
		for await (const chunk of res) {
			chunks.push(chunk);
		}

		return Buffer.concat(chunks);
	}

	public static readonly dockerSocketPath = '/var/run/docker.sock';

	private static resolve(url: string | RequestOptions | URL): RequestOptions {
		return typeof url === 'string' ? this.resolveHref(url) : url instanceof URL ? this.resolveUrl(url) : url;
	}

	private static resolveHref(href: string): RequestOptions {
		return this.resolveUrl(new URL(href));
	}

	private static resolveUrl(url: URL): RequestOptions {
		const auth = url.username && url.password ? Buffer.from(`${url.username}:${url.password}`).toString('base64') : undefined;
		return { protocol: url.protocol, host: url.host, port: url.port, path: url.pathname, auth };
	}
}
