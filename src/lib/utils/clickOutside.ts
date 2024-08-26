export function clickoutside(
	node: Element,
	param: ClickOutsideParameter = { enabled: true }
): ClickOutsideActionReturn {
	let { enabled, eventType, nodeForEvent, options, capture } = resolveConfig(param);

	/**
	 * @param {Event} event
	 */
	function handle(event: Event) {
		if (!event.target) return;
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent("clickoutside", { detail: event }));
		}
	}

	if (param.enabled !== false) {
		nodeForEvent.addEventListener(eventType, handle, options);
	}

	return {
		update(update: ClickOutsideParameter) {
			nodeForEvent.removeEventListener(eventType, handle, capture);
			({ enabled, eventType, nodeForEvent, options, capture } = resolveConfig(update));
			if (enabled) nodeForEvent.addEventListener(eventType, handle, options);
		},
		destroy() {
			nodeForEvent.removeEventListener(eventType, handle, capture);
		}
	};
}

/**
 * @package
 * @param {ClickOutsideParameter} param
 * @returns { {
 * 	enabled: boolean;
 * 	nodeForEvent: Element | Document;
 * 	eventType: string;
 * 	options: boolean | AddEventListenerOptions | undefined;
 * 	capture: boolean | undefined;
 * } }
 */
export function resolveConfig(param: ClickOutsideParameter = {}) {
	return {
		enabled: param.enabled ?? true,
		nodeForEvent: param.limit?.parent ?? document,
		eventType: param.event ?? "click",
		options: param.options,
		capture: typeof param.options === "object" ? param.options?.capture : param.options
	};
}

/**
 * Deprecated, use `ClickOutsideParameter` and `ClickOutsideConfig` instead
 * @typedef {import('./public').ClickOutsideConfig} ClickOutsideParameters
 */

/**
 * Deprecated, use `ClickOutsideParameter` and `ClickOutsideConfig` instead
 * @typedef {import('./public').ClickOutsideConfig} ClickOutsideParameters
 */
import type { ActionReturn, Action } from "svelte/action";

/**
 * Additional attributes extended from `svelte-put/clickoutside`
 *
 *
 * The ambient types for these extended attributes should be available automatically
 * whenever `svelte-put/clickoutside` is imported.
 *
 * ```html
 * <script lang="ts">
 *   import { clickoutside } from '@svelte-put/clickoutside';
 * </script>
 *
 * <!-- on:clickoutside should be typed -->
 * <div
 *   use:clickoutside
 *   on:clickoutside
 * />
 * ```
 */
export interface ClickOutsideAttributes {
	"on:clickoutside"?: (event: CustomEvent<MouseEvent>) => void;
}

/**
 * Limit to which the click event will trigger `clickoutside`
 *
 *
 * Currently only the parent option is supported
 */
export interface ClickOutsideLimit {
	/** Click event beyond the `boundingRect` of this parent node will not trigger `clickoutside` */
	parent: Element;
}

/**
 * svelte action parameters to config behavior of `clickoutside`
 *
 */
export interface ClickOutsideConfig {
	/** whether to activate the action. Default to `true` */
	enabled: boolean;
	/** limit to which the click event will trigger `clickoutside` */
	limit?: ClickOutsideLimit;
	/** event to register callback. Default to `click` */
	event?: string;
	/** options to add to `addEventListener` */
	options?: AddEventListenerOptions | boolean;
}

/**
 * parameter received from action input
 *
 */
export type ClickOutsideParameter = Partial<ClickOutsideConfig> | undefined;

/**  */
export type ClickOutsideAction = Action<Element, ClickOutsideParameter, ClickOutsideAttributes>;

/**  */
export type ClickOutsideActionReturn = ActionReturn<ClickOutsideParameter, ClickOutsideAttributes>;
