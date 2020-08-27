import { BasePiece } from '@sapphire/framework';
import i18n, { TFunction, TFunctionResult, TFunctionKeys, StringMap, TOptions } from 'i18next';

export class Language extends BasePiece {
	// basic usage
	// eslint-disable-next-line @typescript-eslint/ban-types
	public get<TResult extends TFunctionResult = string, TKeys extends TFunctionKeys = string, TInterpolationMap extends object = StringMap>(
		key: TKeys | TKeys[],
		options?: TOptions<TInterpolationMap> | string
	): TResult;

	// overloaded usage
	// eslint-disable-next-line @typescript-eslint/ban-types
	public get<TResult extends TFunctionResult = string, TKeys extends TFunctionKeys = string, TInterpolationMap extends object = StringMap>(
		key: TKeys | TKeys[],
		defaultValue?: string,
		options?: TOptions<TInterpolationMap> | string
	): TResult;

	public get(...args: Parameters<TFunction>) {
		return this.t(...args);
	}

	public onLoad() {
		this.t = i18n.getFixedT(this.name);
		super.onLoad();
	}

	private t: TFunction = () => 'Loading...';
}
