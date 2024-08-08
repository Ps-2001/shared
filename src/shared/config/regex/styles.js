const units = {
    layout: ['px', 'em', 'rem', '%', 'vw', 'vh']
}

const inlineTags = ['span', 'a', 'strong', 'em', 'i', 'b']

export const layoutSpacingRegex = new RegExp(
    // Начало строки, допускаем значение 'auto'
    `^(auto|` +

    // Одно число с необязательной единицей измерения
    `(\\d+(${units.layout.join('|')})?)` +

    // От 0 до 3 дополнительных чисел с необязательными единицами измерения, разделенных пробелами
    `(\\s+\\d+(${units.layout.join('|')})?){0,3})$`
)

export const inlineTagsRegex = new RegExp(
    // Формируем строку для регулярного выражения
    `^(${inlineTags.join('|')})$`,
    'i' // Флаг 'i' делает регулярное выражение регистро-независимым
)
