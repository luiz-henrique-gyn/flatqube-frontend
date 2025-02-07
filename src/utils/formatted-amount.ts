import BigNumber from 'bignumber.js'

import { formatDigits } from './format-digits'
import { splitAmount } from './split-amount'

export type FormattedAmountOptions = {
    /** Truncate fractional part to this value */
    truncate?: number;
    /**
     *  Precision of the values below than `1e-3` (currency) or `1e-8` (token)
     */
    precision?: number;
    /** Preserve all decimals after point */
    preserve?: boolean;
    /**
     * Round the amount if the value is greater than or equal
     * to the value passed in this option (`1e3`, `1e6`, `1e9` etc.).
     *
     * If enable - the `preserve` option is ignored.
     *
     * If passed `true` default round value will be `1e3`.
     * Otherwise, if pass `false` - the amount will not be rounded.
     *
     * Default: true
     */
    roundOn?: number | boolean;
    /**
     * Which symbol should be placed between digits. By default, is space.
     */
    digitsSeparator?: string;
}

export function formattedAmount(
    value?: string | number,
    decimals?: number,
    options: FormattedAmountOptions = { roundOn: true },
): string {
    const parts = splitAmount(value, decimals)
    const digits = [formatDigits(parts[0], options.digitsSeparator)]
    const integerNumber = new BigNumber(parts[0] || 0)

    let fractionalPartNumber = new BigNumber(`0.${parts[1] || 0}`)
    const roundOn = typeof options?.roundOn === 'boolean' ? (options.roundOn && 1e3) : (options?.roundOn ?? 1e3)

    if (options?.preserve) {
        if (roundOn && integerNumber.gte(roundOn)) {
            return formatDigits(integerNumber.toFixed(), options.digitsSeparator) ?? ''
        }
        digits.push(fractionalPartNumber.toFixed().split('.')[1])
        return digits.filter(Boolean).join('.')
    }

    if (options?.truncate !== undefined) {
        if (roundOn && integerNumber.gte(roundOn)) {
            return formatDigits(integerNumber.toFixed(), options.digitsSeparator) ?? ''
        }
        fractionalPartNumber = fractionalPartNumber.dp(options?.truncate, BigNumber.ROUND_DOWN)
        digits.push(fractionalPartNumber.toFixed().split('.')[1])
        return digits.filter(Boolean).join('.')
    }

    if (roundOn && integerNumber.gte(roundOn)) {
        return formatDigits(integerNumber.toFixed(), options.digitsSeparator) ?? ''
    }

    switch (true) {
        case roundOn && integerNumber.gte(roundOn):
            fractionalPartNumber = fractionalPartNumber.dp(0, BigNumber.ROUND_DOWN)
            break

        case integerNumber.isZero() && fractionalPartNumber.lte(1e-3):
            fractionalPartNumber = fractionalPartNumber.precision(options.precision ?? 4, BigNumber.ROUND_DOWN)
            break

        case integerNumber.gt(0) && roundOn && integerNumber.lt(roundOn):
            fractionalPartNumber = fractionalPartNumber.dp(2, BigNumber.ROUND_DOWN)
            break

        case integerNumber.isZero() && fractionalPartNumber.lte(1e-2):
            fractionalPartNumber = fractionalPartNumber.dp(3, BigNumber.ROUND_DOWN)
            break

        default:
            fractionalPartNumber = fractionalPartNumber.dp(4, BigNumber.ROUND_DOWN)
    }

    digits.push(fractionalPartNumber.toFixed().split('.')[1] ?? '')

    return digits.filter(Boolean).join('.')
}
