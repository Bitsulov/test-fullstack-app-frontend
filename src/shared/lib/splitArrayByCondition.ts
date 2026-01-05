interface IReturn<T>{
    before: T[],
    separator: T | null,
    after: T[]
}

/**
 * Разделяет массив `array` на три части по элементу, удовлетворяющему условию
 *
 * Функция проходит по массиву и разделяет его на:
 * - элементы ДО первого элемента, удовлетворяющего условию
 * - сам элемент-разделитель (если найден)
 * - элементы ПОСЛЕ элемента-разделителя
 *
 * Если элемент не найден, возвращает пустой массив `before`,
 * `null` в качестве разделителя и исходный массив в `after`.
 *
 * @template T - тип элементов массива
 * @param {T[]} array - исходный массив для разделения
 * @param {(item: T) => boolean} condition - функция-предикат для поиска разделителя
 * @returns {IReturn<T>} Объект с тремя полями:
 * - `before`: массив элементов до разделителя
 * - `separator`: найденный элемент или `null`
 * - `after`: массив элементов после разделителя
 *
 * @example
 * // Разделение массива чисел
 * const numbers = [1, 2, 3, 4, 5];
 * const result = splitArrayByCondition(numbers, n => n === 3);
 * // result = {
 * //   before: [1, 2],
 * //   separator: 3,
 * //   after: [4, 5]
 * // }
 *
 * @example
 * // Элемент не найден
 * const result2 = splitArrayByCondition(numbers, n => n === 10);
 * // result2 = {
 * //   before: [],
 * //   separator: null,
 * //   after: [1, 2, 3, 4, 5]
 * // }
 *
 */
export function splitArrayByCondition<T>(array: T[], condition: (i: T) => boolean): IReturn<T> {
    const splitIndex = array.findIndex(condition);

    if (splitIndex === -1) {
        return {
            before: [],
            separator: null,
            after: [...array]
        };
    }

    return {
        before: array.slice(0, splitIndex),
        separator: array[splitIndex],
        after: array.slice(splitIndex + 1)
    };
}
